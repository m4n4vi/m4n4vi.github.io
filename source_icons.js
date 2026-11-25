(function () {
    'use strict';

    if (window.source_icons_plugin) return;
    window.source_icons_plugin = true;

    var MANIFEST = {
        type: 'other',
        version: '1.0.0',
        author: '@manavich',
        name: 'Source Icons',
        description: 'Иконки доступных онлайн-источников внизу карточки',
        component: 'source_icons'
    };

    var CONFIG = {
        cache_ttl: 10 * 60 * 1000,   // кэш списка источников на карточку
        request_timeout: 12000,
        poll_deadline: 12000,        // сколько ждём проверку источников сервером
        poll_interval: 600,
        // Свои иконки: ключ = имя балансера, значение = SVG (с currentColor) или URL картинки.
        // Пример: icons: { collaps: '<svg viewBox="0 0 24 24" fill="currentColor">...</svg>', rezka: 'https://.../rezka.png' }
        icons: {}
    };

    var STYLE_ID = 'source-icons-style';
    var memory_cache = {};
    var good_host = '';

    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;
        var css = '' +
            '.source-icons{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-top:1em;}' +
            '.source-icons__item{position:relative;width:3.4em;height:3.4em;margin:0 .6em .6em 0;-webkit-border-radius:.7em;border-radius:.7em;background:#1d1d1d;color:#efefef;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;cursor:pointer;-webkit-transition:background .15s ease,color .15s ease;transition:background .15s ease,color .15s ease;}' +
            '.source-icons__item.focus,.source-icons__item.hover,.source-icons__item:hover{background:#ffffff;color:#111111;}' +
            '.source-icons__letter{font-size:1.3em;font-weight:700;line-height:1;text-transform:uppercase;pointer-events:none;}' +
            '.source-icons__item svg{width:62%;height:62%;pointer-events:none;}' +
            '.source-icons__item img{width:62%;height:62%;-o-object-fit:contain;object-fit:contain;pointer-events:none;-webkit-filter:brightness(0) invert(1);filter:brightness(0) invert(1);}' +
            '.source-icons__item.focus img,.source-icons__item.hover img,.source-icons__item:hover img{-webkit-filter:brightness(0);filter:brightness(0);}' +
            '@media screen and (max-width:585px){.source-icons__item{width:3em;height:3em;margin:0 .5em .5em 0;}}';
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    // render карточки: Lampa 3.x (e.body), 2.x (e.object.activity.render())
    function getRender(e) {
        if (e.body && e.body.length) return e.body;
        if (e.link && e.link.html) return e.link.html;
        if (e.object && e.object.activity && typeof e.object.activity.render == 'function') return e.object.activity.render();
        return null;
    }

    function isAnime(movie) {
        var lang = movie.original_language || '';
        if (lang.indexOf('ja') >= 0 || lang.indexOf('zh') >= 0) return true;
        var kw = movie.keywords && movie.keywords.results ? movie.keywords.results : [];
        for (var i = 0; i < kw.length; i++) {
            if (kw[i] && kw[i].name == 'anime') return true;
        }
        return false;
    }

    function hostKey(host) {
        return (host + '').replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    }

    // Адрес сервера Lampac: из URL установленного online.js, запасной вариант - window.rch_nws
    function hostCandidates() {
        var out = [], seen = {};
        function add(u) {
            if (u && !seen[u]) { seen[u] = 1; out.push(u); }
        }
        var plugs = [];
        try {
            plugs = (Lampa.Plugins && Lampa.Plugins.get) ? Lampa.Plugins.get() : Lampa.Storage.get('plugins', '[]');
        } catch (e) { plugs = []; }
        if (typeof plugs == 'string') plugs = Lampa.Arrays.decodeJson(plugs, []);
        (plugs || []).forEach(function (p) {
            var url = typeof p == 'string' ? p : (p && p.url);
            if (!url || (p && p.status === 0)) return;
            url = (url + '').split('?')[0];
            if (/\/online\/js\//i.test(url)) add(url.split('/online/js/')[0]);
            else if (/online\.js$/i.test(url)) add(url.replace(/\/[^\/]*$/, ''));
        });
        try {
            if (window.rch_nws) {
                var protos = location.protocol == 'https:' ? ['https://', 'http://'] : ['http://', 'https://'];
                for (var k in window.rch_nws) {
                    for (var i = 0; i < protos.length; i++) add(protos[i] + k);
                }
            }
        } catch (e) {}
        if (good_host) {
            out = [good_host].concat(out.filter(function (h) { return h != good_host; }));
        }
        return out;
    }

    function withAccount(url, host) {
        var email = Lampa.Storage.get('account_email', '');
        if (email && url.indexOf('account_email=') < 0) url = Lampa.Utils.addUrlComponent(url, 'account_email=' + encodeURIComponent(email));
        var uid = Lampa.Storage.get('lampac_unic_id', '');
        if (uid && url.indexOf('uid=') < 0) url = Lampa.Utils.addUrlComponent(url, 'uid=' + encodeURIComponent(uid));
        var hk = hostKey(host);
        var nws = (window.rch_nws && window.rch_nws[hk] && window.rch_nws[hk].connectionId) || Lampa.Storage.get('lampac_nws_id', '');
        if (nws && url.indexOf('nws_id=') < 0) url = Lampa.Utils.addUrlComponent(url, 'nws_id=' + encodeURIComponent(nws));
        return url;
    }

    function requestHeaders() {
        var key = Lampa.Storage.get('aesgcmkey', '');
        return key ? { 'X-Kit-AesGcm': key } : {};
    }

    function requestParams(movie, host) {
        var q = [];
        q.push('id=' + encodeURIComponent(movie.id || ''));
        if (movie.imdb_id) q.push('imdb_id=' + encodeURIComponent(movie.imdb_id));
        if (movie.kinopoisk_id) q.push('kinopoisk_id=' + encodeURIComponent(movie.kinopoisk_id));
        q.push('title=' + encodeURIComponent(movie.title || movie.name || ''));
        q.push('original_title=' + encodeURIComponent(movie.original_title || movie.original_name || ''));
        q.push('serial=' + (movie.name ? 1 : 0));
        q.push('original_language=' + (movie.original_language || ''));
        q.push('year=' + (((movie.release_date || movie.first_air_date || '0000') + '').slice(0, 4)));
        q.push('source=' + (movie.source || 'tmdb'));
        q.push('clarification=0');
        q.push('similar=false');
        if (isAnime(movie)) q.push('anime=1');
        var hk = hostKey(host);
        var rch = (window.rch_nws && window.rch_nws[hk] && window.rch_nws[hk].type) ||
                  (window.rch && window.rch[hk] && window.rch[hk].type) || '';
        q.push('rchtype=' + rch);
        var email = Lampa.Storage.get('account_email', '');
        if (email) q.push('cub_id=' + Lampa.Utils.hash(email));
        return q.join('&');
    }

    function normalize(list) {
        var out = [], seen = {};
        (list || []).forEach(function (j) {
            if (!j || j.show === false) return;
            var key = (j.balanser || (j.name || '').split(' ')[0]).toLowerCase();
            if (!key || seen[key]) return;
            seen[key] = 1;
            out.push({ key: key, title: j.name || key, url: j.url || '' });
        });
        return out;
    }

    function asJson(data) {
        if (typeof data == 'string') return Lampa.Arrays.decodeJson(data, null);
        return data;
    }

    function fetchList(host, movie, alive, done) {
        var net = new Lampa.Reguest();
        net.timeout(CONFIG.request_timeout);
        var url = withAccount(host + '/lite/events?' + requestParams(movie, host) + '&life=true', host);
        net.silent(url, function (data) {
            if (!alive()) return;
            var json = asJson(data);
            if (Array.isArray(json)) return done(normalize(json), true);
            if (json && json.life && json.memkey) return pollLife(host, movie, json.memkey, alive, done);
            if (json && json.accsdb) {
                console.log('SourceIcons', 'accsdb:', json.msg || '');
                return done([], true);
            }
            done(null, false);
        }, function () {
            if (alive()) done(null, false);
        }, false, { headers: requestHeaders() });
    }

    // Прогрессивный опрос: иконки появляются по мере проверки источников сервером
    function pollLife(host, movie, memkey, alive, done) {
        var net = new Lampa.Reguest();
        var deadline = Date.now() + CONFIG.poll_deadline;
        var seen = 0;
        var lastItems = [];
        var hadData = false;

        function step() {
            if (!alive()) return;
            net.timeout(4000);
            var url = host + '/lifeevents?memkey=' + encodeURIComponent(memkey) +
                '&id=' + encodeURIComponent(movie.id || '') +
                '&serial=' + (movie.name ? 1 : 0) + '&seen=' + seen;
            net.silent(withAccount(url, host), function (data) {
                if (!alive()) return;
                var json = asJson(data);
                if (json && json.accsdb) return done(lastItems, true);
                if (json && Array.isArray(json.online)) {
                    hadData = true;
                    if (json.online.length != seen) {
                        seen = json.online.length;
                        lastItems = normalize(json.online);
                        done(lastItems, !!json.ready);
                    }
                    if (json.ready) return done(lastItems, true);
                }
                if (Date.now() < deadline) setTimeout(step, CONFIG.poll_interval);
                else done(hadData ? lastItems : null, true);
            }, function () {
                if (!alive()) return;
                if (Date.now() < deadline) setTimeout(step, 1000);
                else done(hadData ? lastItems : null, true);
            }, false, { headers: requestHeaders() });
        }
        step();
    }

    function loadSources(movie, alive, cb) {
        var hosts = hostCandidates();
        if (!hosts.length) return;
        var ctx = (movie.id || '') + '|' + (movie.name ? 1 : 0) + '|' + (isAnime(movie) ? 1 : 0);
        var index = 0;

        function next() {
            if (!alive() || index >= hosts.length) return;
            var host = hosts[index++];
            var ck = host + '|' + ctx;
            var cached = memory_cache[ck];
            if (cached && Date.now() - cached.time < CONFIG.cache_ttl) {
                cb(cached.items, true);
                return;
            }
            fetchList(host, movie, alive, function (items, final) {
                if (items === null) { next(); return; }
                good_host = host;
                cb(items, final);
                if (final) memory_cache[ck] = { time: Date.now(), items: items };
            });
        }
        next();
    }

    // Монограмма: первая буква; при совпадении - две, три и т.д.
    function labelFor(item, used) {
        var base = (item.title || item.key).split(' - ')[0].split(' ~ ')[0].replace(/[^0-9A-Za-z\u0400-\u04FF]/g, '');
        if (!base) base = item.key;
        var n = 1;
        var label = base.slice(0, n).toUpperCase();
        while (used[label] && n < base.length) {
            n++;
            label = base.slice(0, n).toUpperCase();
        }
        used[label] = item.key;
        return label;
    }

    function makeItem(item, labels, movie) {
        var tile = $('<div class="source-icons__item selector"></div>');
        tile.attr('title', item.title);
        tile.attr('data-key', item.key);
        var custom = CONFIG.icons[item.key];
        if (custom) {
            if (/^\s*</.test(custom)) tile.append($(custom));
            else tile.append($('<img alt="">').attr('src', custom));
        } else {
            tile.append($('<div class="source-icons__letter"></div>').text(labelFor(item, labels)));
        }
        tile.on('hover:enter', function () {
            launch(item, movie);
        });
        return tile;
    }

    function appendItems(row, items, movie) {
        var keys = row.data('keys');
        var labels = row.data('labels');
        items.forEach(function (item) {
            if (keys[item.key]) return;
            keys[item.key] = true;
            row.append(makeItem(item, labels, movie));
        });
    }

    // Имя онлайн-компонента: из манифеста видео-плагина, затем известные имена
    function onlineComponent() {
        var cands = [];
        try {
            var p = Lampa.Manifest && Lampa.Manifest.plugins;
            if (Array.isArray(p)) {
                for (var i = p.length - 1; i >= 0; i--) {
                    if (p[i] && p[i].type == 'video' && p[i].component) cands.push(p[i].component);
                }
            } else if (p && p.type == 'video' && p.component) cands.push(p.component);
        } catch (e) {}
        cands = cands.concat(['lampac', 'online', 'lampac_z', 'lampac2026']);
        for (var j = 0; j < cands.length; j++) {
            try {
                if (Lampa.Component.get(cands[j])) return cands[j];
            } catch (e) {}
        }
        return '';
    }

    function launch(item, movie) {
        // Выбор источника для всех поколений online.js
        try {
            Lampa.Storage.set('online_balanser', item.key);
            var last = Lampa.Storage.get('online_last_balanser', {});
            if (!last || typeof last != 'object') last = {};
            last[movie.id] = item.key;
            Lampa.Storage.set('online_last_balanser', last);
        } catch (e) {}

        var comp = onlineComponent();
        if (comp) {
            Lampa.Activity.push({
                url: '',
                title: Lampa.Lang.translate('title_online'),
                component: comp,
                search: movie.title || movie.name,
                search_one: movie.title || movie.name,
                search_two: movie.original_title || movie.original_name,
                movie: movie,
                page: 1,
                clarification: false,
                lampac_custom_select: item.key   // Lampac NextGen: ручной выбор балансера
            });
        } else {
            // Запасной путь: эмулируем нажатие кнопки "Онлайн" на карточке
            var btn = $('.view--online').first();
            if (btn.length) btn.trigger('hover:enter');
            else Lampa.Noty.show('Плагин онлайн не найден');
        }
    }

    function attach(render, movie) {
        render.find('.source-icons').remove();
        var anchor = render.find('.full-start-new__buttons');
        if (!anchor.length) anchor = render.find('.full-start__buttons');
        if (!anchor.length) return;
        var row = $('<div class="source-icons"></div>').data('keys', {}).data('labels', {});
        anchor.after(row);
        var alive = function () { return $.contains(document.body, row[0]); };
        loadSources(movie, alive, function (items, final) {
            if (!alive()) return;
            appendItems(row, items, movie);
            if (final && !row.children().length) row.remove();
        });
    }

    function start() {
        injectStyles();
        try {
            // В Lampa 3.x это массив (push), в 2.x присваивание затёрло бы манифест онлайн-плагина
            if (Array.isArray(Lampa.Manifest.plugins)) Lampa.Manifest.plugins = MANIFEST;
        } catch (e) {}

        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var render = getRender(e);
                var movie = e.data && e.data.movie;
                if (render && movie) attach(render, movie);
            }
        });

        // Если карточка уже открыта в момент загрузки плагина
        try {
            var act = Lampa.Activity.active();
            if (act && act.component == 'full') {
                var r = act.activity ? act.activity.render() : null;
                var m = act.card || act.movie;
                if (r && m) attach(r, m);
            }
        } catch (e) {}
    }

    if (window.appready) start();
    else Lampa.Listener.follow('app', function (e) { if (e.type == 'ready') start(); });
})();