/* Deobfuscated: Card Buttons Editor v2.8.7 (@bylampa). Logic unchanged. */
(function() {
  "use strict";
  Lampa.Platform.tv();
  (function() {
    "use strict";
    var manifest= {
      "type":"other","version":"2.8.7","author":"@bylampa","name":"Card Buttons Editor","description":"Редактирование порядка, видимости, названий и группировка кнопок в карточке","component":"card_buttons_editor"
    },STYLE_ID="card-buttons-editor-style",KEY_ORDER="card_buttons_order",KEY_HIDE="card_buttons_hide",KEY_SHOW_NAMES="card_buttons_show_names",KEY_TITLES="card_buttons_titles",KEY_ICONS="card_buttons_icons",KEY_ORIG_TITLES="card_buttons_original_titles",KEY_ORIG_ICONS="card_buttons_original_icons",KEY_FOLDERS="card_buttons_folders",KEY_FOLDER_TITLES="card_buttons_folder_titles",KEY_FOLDER_ICONS="card_buttons_folder_icons",KEY_FOLDER_HIDE="card_buttons_folder_hide",KEY_ITEM_ORDER="card_buttons_item_order",currentRender=null,_unused=null,lastFocusedButtonId=null,lastControllerName=null,allButtons=[],DEFAULT_SUBTITLES= {
      "button--play":function v1() {
        return Lampa.Lang.translate("title_watch");
      },"button--book":function v2() {
        return Lampa.Lang.translate("settings_input_links");
      },"button--reaction":function v3() {
        return Lampa.Lang.translate("title_reactions");
      },"button--subscribe":function v4() {
        return Lampa.Lang.translate("title_subscribe");
      },"button--options":function v5() {
        return Lampa.Lang.translate("more");
      },"view--torrent":function v6() {
        return Lampa.Lang.translate("full_torrents");
      },"view--trailer":function v7() {
        return Lampa.Lang.translate("full_trailers");
      }
      
    },ICON_LIBRARY=[ {
      "name":"Плей","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><polygon points=\"5 3 19 12 5 21 5 3\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Фильм","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M2 12h20M7 2v20M17 2v20\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Звезда","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"ТВ","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"15\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M8 21h8M12 18v3\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Поиск","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"11\" cy=\"11\" r=\"8\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M21 21l-4.35-4.35\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Дом","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M9 22V12h6v10\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Огонь","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12 2C7.5 6.5 4 10 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8c0-4-3.5-7.5-8-12z\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M12 22c-1.5-2-2-4-2-6 0-2 1-4 2-6\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Часы","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"2\"/><polyline points=\"12 6 12 12 16 14\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Календарь","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M16 2v4M8 2v4M3 10h18\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Скачать","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Поделиться","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"18\" cy=\"5\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"6\" cy=\"12\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"18\" cy=\"19\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Сердце","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Закладка","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Глаз","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Настройки","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Список","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><line x1=\"8\" y1=\"6\" x2=\"21\" y2=\"6\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"8\" y1=\"12\" x2=\"21\" y2=\"12\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"8\" y1=\"18\" x2=\"21\" y2=\"18\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"3\" y1=\"6\" x2=\"3.01\" y2=\"6\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"3\" y1=\"12\" x2=\"3.01\" y2=\"12\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"3\" y1=\"18\" x2=\"3.01\" y2=\"18\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Инфо","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Замок","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M7 11V7a5 5 0 0110 0v4\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Пользователь","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"12\" cy=\"7\" r=\"4\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Колокол","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Прямой эфир","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"4\" fill=\"currentColor\"/></svg>"
    }, {
      "name":"Молния","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Фильтр","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Папка","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2v11z\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Кинотеатр","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7zM14 14h3v3h-3z\" fill=\"currentColor\"/></svg>"
    }, {
      "name":"Видеокамера","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M23 7l-7 5 7 5V7z\" stroke=\"currentColor\" stroke-width=\"2\"/><rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Музыка","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M9 18V5l12-2v13\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"6\" cy=\"18\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"18\" cy=\"16\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Микрофон","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><rect x=\"9\" y=\"1\" width=\"6\" height=\"11\" rx=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M5 11a7 7 0 0014 0M12 19v4M8 23h8\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Диск","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M12 2v20\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Компас","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Глобус","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Трофей","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M6 9H4a2 2 0 010-4h2M18 9h2a2 2 0 000-4h-2M8 21h8M12 17v4M7 5h10v4a5 5 0 01-10 0V5z\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Маска","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"8.5\" cy=\"10\" r=\"1.5\" fill=\"currentColor\"/><circle cx=\"15.5\" cy=\"10\" r=\"1.5\" fill=\"currentColor\"/><path d=\"M8 14c.83 2.67 4 2.67 8 0\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Корона","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M2 17l3-12 4 7 3-8 3 8 4-7 3 12H2z\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M2 17h20v3H2z\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Щит","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M9 12l2 2 4-4\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Ключ","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"8\" cy=\"12\" r=\"5\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M12 12h9l-2 3 2 3h-3l-2-3\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Рейтинг","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><rect x=\"3\" y=\"12\" width=\"4\" height=\"9\" rx=\"1\" stroke=\"currentColor\" stroke-width=\"2\"/><rect x=\"10\" y=\"7\" width=\"4\" height=\"14\" rx=\"1\" stroke=\"currentColor\" stroke-width=\"2\"/><rect x=\"17\" y=\"3\" width=\"4\" height=\"18\" rx=\"1\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Плеер","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2\"/><polygon points=\"10 8 10 16 16 12\" fill=\"currentColor\"/></svg>"
    }, {
      "name":"Сериал","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"18\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M2 7h20M2 11h20M2 15h20M2 19h20\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Буфер","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M12 2a10 10 0 010 20\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Эфир","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12 2L2 7l10 5 10-5-10-5z\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M2 17l10 5 10-5M2 12l10 5 10-5\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }, {
      "name":"Коллекция","svg":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><rect x=\"2\" y=\"2\" width=\"9\" height=\"9\" rx=\"1\" stroke=\"currentColor\" stroke-width=\"2\"/><rect x=\"13\" y=\"2\" width=\"9\" height=\"9\" rx=\"1\" stroke=\"currentColor\" stroke-width=\"2\"/><rect x=\"2\" y=\"13\" width=\"9\" height=\"9\" rx=\"1\" stroke=\"currentColor\" stroke-width=\"2\"/><rect x=\"13\" y=\"13\" width=\"9\" height=\"9\" rx=\"1\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>"
    }],DEFAULT_FOLDER_ICON="<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path></svg>";
    function modalSize() {
      return window.innerWidth<=585?"small":"medium";
    }
    
    function injectStyles() {
      if(document.getElementById(STYLE_ID))return;
      var v8="            .button-hide {                display: none !important;            }                        .button--play {                display: none !important;            }                        @keyframes button-fade-in {                from { opacity: 0; transform: translateY(5px); }                to { opacity: 1; transform: translateY(0); }            }                        .full-start-new__buttons .full-start__button {                opacity: 0;                animation: button-fade-in 0.3s ease forwards;            }                        .full-start-new__buttons.buttons-loading .full-start__button {                visibility: hidden !important;                animation: none;            }                        .button--folder {                cursor: pointer;            }                        .folder-hidden {                display: none !important;            }                        .menu-edit-split {                margin: 1em 1em;                height: 0;                border-top: 2px solid rgba(255, 255, 255, 0.1);            }                        .menu-edit-list__item {                display: -webkit-box;                display: -webkit-flex;                display: -moz-box;                display: -ms-flexbox;                display: flex;                padding: 0.3em;                -webkit-border-radius: 0.3em;                -moz-border-radius: 0.3em;                border-radius: 0.3em;                -webkit-box-align: center;                -webkit-align-items: center;                -moz-box-align: center;                -ms-flex-align: center;                align-items: center;                border: 3px solid transparent;            }                        .menu-edit-list__item:nth-child(even) {                background: rgba(255, 255, 255, 0.1);            }                        .menu-edit-list__item.folder-item {                background: rgba(255, 200, 50, 0.15) !important;                border-left: 3px solid rgba(255, 200, 50, 0.5);            }                        .menu-edit-list__item.folder-hidden-item {                opacity: 0.4;            }                        .menu-edit-list__item.button-hidden-item {                opacity: 0.4;            }                        .menu-edit-list__icon {                width: 2.4em;                height: 2.4em;                margin-right: 1em;                -webkit-flex-shrink: 0;                -ms-flex-negative: 0;                flex-shrink: 0;                -webkit-border-radius: 100%;                -moz-border-radius: 100%;                border-radius: 100%;                display: -webkit-box;                display: -webkit-flex;                display: -moz-box;                display: -ms-flexbox;                display: flex;                -webkit-box-align: center;                -webkit-align-items: center;                -moz-box-align: center;                -ms-flex-align: center;                align-items: center;                -webkit-box-pack: center;                -webkit-justify-content: center;                -moz-box-pack: center;                -ms-flex-pack: center;                justify-content: center;            }                        .menu-edit-list__icon > svg, .menu-edit-list__icon > img {                width: 1.4em !important;                height: 1.4em !important;            }                        .menu-edit-list__title {                font-size: 1.3em;                font-weight: 300;                line-height: 1.2;                -webkit-box-flex: 1;                -webkit-flex-grow: 1;                -moz-box-flex: 1;                -ms-flex-positive: 1;                flex-grow: 1;            }                        .menu-edit-list__title-sub {                opacity: 0.5;                font-size: 0.85em;            }                        .menu-edit-list__move,            .menu-edit-list__toggle,            .menu-edit-list__edit,            .menu-edit-list__icon-edit,            .menu-edit-list__delete {                width: 2.4em;                height: 2.4em;                display: -webkit-box;                display: -webkit-flex;                display: -moz-box;                display: -ms-flexbox;                display: flex;                -webkit-box-align: center;                -webkit-align-items: center;                -moz-box-align: center;                -ms-flex-align: center;                align-items: center;                -webkit-box-pack: center;                -webkit-justify-content: center;                -moz-box-pack: center;                -ms-flex-pack: center;                justify-content: center;                cursor: pointer;                border: 3px solid transparent;            }                        .menu-edit-list__move svg,            .menu-edit-list__toggle svg,            .menu-edit-list__edit svg,            .menu-edit-list__icon-edit svg,            .menu-edit-list__delete svg {                width: 1.4em !important;                height: 1.4em !important;            }                        .menu-edit-list__move.focus,            .menu-edit-list__toggle.focus,            .menu-edit-list__edit.focus,            .menu-edit-list__icon-edit.focus,            .menu-edit-list__delete.focus {                background: white;                -webkit-border-radius: 0.3em;                -moz-border-radius: 0.3em;                border-radius: 0.3em;                color: #000;                border-color: transparent;            }                        .menu-edit-list__toggle svg {                width: 1.4em !important;                height: 1.4em !important;            }                        .menu-edit-list__create-folder {                background: rgba(100,200,100,0.2);                margin-bottom: 1em;                border: 3px solid transparent;                display: -webkit-box;                display: -webkit-flex;                display: -moz-box;                display: -ms-flexbox;                display: flex;                -webkit-box-align: center;                -webkit-align-items: center;                -moz-box-align: center;                -ms-flex-align: center;                align-items: center;                -webkit-box-pack: center;                -webkit-justify-content: center;                -moz-box-pack: center;                -ms-flex-pack: center;                justify-content: center;            }                        .menu-edit-list__create-folder .menu-edit-list__icon {                margin-right: 0.5em;            }                        .menu-edit-list__create-folder .menu-edit-list__title {                -webkit-box-flex: 0;                -webkit-flex-grow: 0;                -moz-box-flex: 0;                -ms-flex-positive: 0;                flex-grow: 0;            }                        .menu-edit-list__create-folder.focus {                background: rgba(100,200,100,0.3);                border-color: rgba(255,255,255,0.8);            }                        .folder-create-confirm {                background: rgba(100,200,100,0.3);                margin-top: 1em;                border-radius: 0.3em;                border: 3px solid transparent;                font-size: 1.3em;                font-weight: 300;                line-height: 1.2;            }                        .folder-create-confirm > div {                text-align: center;                padding: 0.3em;            }                        .folder-create-confirm.focus {                border-color: rgba(255,255,255,0.8);            }                        .folder-reset-button {                background: rgba(200,80,80,0.6);                margin: 1em 0 0 0;                border-radius: 0.3em;                border: 3px solid transparent;                text-align: center;                padding: 0.5em 0.3em;                font-size: 1.3em;                font-weight: 300;                line-height: 1.2;            }                        .folder-reset-button.focus {                border-color: rgba(255,255,255,0.8);            }                        .reset-button {                background: rgba(200,80,80,0.6);                margin: 1em 3px 0 3px;                border-radius: 0.3em;                text-align: center;                padding: 1em;                cursor: pointer;                order: 9999 !important;            }                        .reset-button.focus {                box-shadow: 0 0 0 3px rgba(255,255,255,0.8);            }                        .icon-reset-button {                background: rgba(200,80,80,0.6);                margin: 0.5em 0.3em;                border-radius: 0.3em;                text-align: center;                padding: 0.8em;                cursor: pointer;                width: calc(100% - 0.6em);                font-size: 1.3em;                font-weight: 300;                line-height: 1.2;            }                        .icon-reset-button.focus {                box-shadow: 0 0 0 3px rgba(255,255,255,0.8);            }                        .icon-picker-list {                display: flex;                flex-wrap: wrap;                justify-content: center;            }                        .icon-picker-item {                display: -webkit-box;                display: -webkit-flex;                display: -moz-box;                display: -ms-flexbox;                display: flex;                width: 4em;                height: 4em;                -webkit-box-align: center;                -webkit-align-items: center;                -moz-box-align: center;                -ms-flex-align: center;                align-items: center;                -webkit-box-pack: center;                -webkit-justify-content: center;                -moz-box-pack: center;                -ms-flex-pack: center;                justify-content: center;                cursor: pointer;                border-radius: 0.3em;                margin: 0.3em;            }                        .icon-picker-item.focus {                background: rgba(255,255,255,0.2);            }                        .icon-picker-icon {                width: 2.4em;                height: 2.4em;                display: -webkit-box;                display: -webkit-flex;                display: -moz-box;                display: -ms-flexbox;                display: flex;                -webkit-box-align: center;                -webkit-align-items: center;                -moz-box-align: center;                -ms-flex-align: center;                align-items: center;                -webkit-box-pack: center;                -webkit-justify-content: center;                -moz-box-pack: center;                -ms-flex-pack: center;                justify-content: center;            }                        .icon-picker-icon svg {                width: 1.6em !important;                height: 1.6em !important;            }                        .rating-value {                background: none !important;                padding: 0 !important;                border-radius: 0 !important;                color: inherit !important;                font-size: inherit !important;            }                        @media (min-width: 586px) {                .full-start-new__buttons {                    display: flex !important;                    flex-wrap: wrap !important;                }                                .full-start__button {                    margin-bottom: 10px !important;                }            }                        @media (max-width: 585px) {                .full-start-new__buttons {                    display: flex !important;                    flex-wrap: wrap !important;                }                                .full-start__button {                    margin-bottom: 10px !important;                }            }        ";
      $("head").append("<style id=\""+STYLE_ID+"\">"+v8+"</style>");
    }
    
    function getStoredList(v9) {
      var v10=Lampa.Storage["get"](v9);
      if(Array.isArray(v10))return v10.slice();
      if(typeof v10==="string")try {
        var v11=JSON.parse(v10);
        return Array.isArray(v11)?v11:[];
      }
      catch(v12) {
        return v10.split(",").map(function(v13) {
          return v13.trim();
        }).filter(Boolean);
      }
      return[];
    }
    
    function shallowCopy(v14) {
      var v15= {};
      return Object.keys(v14).forEach(function(v16) {
        v15[v16]=v14[v16];
      }),v15;
    }
    
    function getFolderTitles() {
      var v17=Lampa.Storage["get"](KEY_FOLDER_TITLES);
      if(v17&&typeof v17==="object")return shallowCopy(v17);
      return {};
    }
    
    function setFolderTitle(v18,v19) {
      var v20=getFolderTitles();
      v20[v18]=v19,Lampa.Storage["set"](KEY_FOLDER_TITLES,v20);
    }
    
    function getFolderIcons() {
      var v21=Lampa.Storage["get"](KEY_FOLDER_ICONS);
      if(v21&&typeof v21==="object")return shallowCopy(v21);
      return {};
    }
    
    function setFolderIcon(v22,v23) {
      var v24=getFolderIcons();
      v24[v22]=v23,Lampa.Storage["set"](KEY_FOLDER_ICONS,v24);
    }
    
    function getFolders() {
      var v25=Lampa.Storage["get"](KEY_FOLDERS);
      if(v25&&typeof v25==="object")return shallowCopy(v25);
      return {};
    }
    
    function saveFolders(v26) {
      Lampa.Storage["set"](KEY_FOLDERS,shallowCopy(v26));
    }
    
    function getHiddenFolders() {
      var v27=Lampa.Storage["get"](KEY_FOLDER_HIDE);
      return Array.isArray(v27)?v27:[];
    }
    
    function saveHiddenFolders(v28) {
      Lampa.Storage["set"](KEY_FOLDER_HIDE,v28);
    }
    
    function getItemOrder() {
      var v29=Lampa.Storage["get"](KEY_ITEM_ORDER);
      return Array.isArray(v29)?v29:[];
    }
    
    function saveItemOrder(v30) {
      Lampa.Storage["set"](KEY_ITEM_ORDER,v30);
    }
    
    function deleteFolder(v31) {
      var v32=getFolders();
      delete v32[v31],saveFolders(v32);
      var v33=getFolderTitles();
      delete v33[v31],Lampa.Storage["set"](KEY_FOLDER_TITLES,v33);
      var v34=getFolderIcons();
      delete v34[v31],Lampa.Storage["set"](KEY_FOLDER_ICONS,v34);
      var v35=getHiddenFolders(),v36=v35.indexOf(v31);
      v36!==-1&&(v35.splice(v36,1),saveHiddenFolders(v35));
      var v37=getItemOrder(),v38=[];
      v37.forEach(function(v39) {
        !(v39.type==="folder"&&v39.id===v31)&&v38.push(v39);
      }),saveItemOrder(v38);
    }
    
    function allFolderButtonIds() {
      var v40=getFolders(),v41=[];
      return Object.keys(v40).forEach(function(v42) {
        Array.isArray(v40[v42])&&(v41=v41.concat(v40[v42]));
      }),v41;
    }
    
    function findFolderOfButton(v43) {
      var v44=getFolders();
      for(var v45 in v44) {
        if(Array.isArray(v44[v45])&&v44[v45].includes(v43))return v45;
      }
      return null;
    }
    
    function findButtonById(v46) {
      if(!currentRender||!currentRender.length)return null;
      var v47=currentRender.find(".full-start__button[data-button-id=\""+v46+"\"]").first();
      if(v47.length)return v47;
      for(var v48=0;v48<allButtons.length;v48++) {
        if(getButtonId(allButtons[v48])===v46)return allButtons[v48];
      }
      return null;
    }
    
    function buttonTitle(v49) {
      var v50=$(v49),v51=getButtonId(v50),v52=getTitles()[v51];
      if(v52)return v52;
      var v53=v50.find("span").first().text().trim()||v50.text().trim();
      if(!v53) {
        var v54=v50.attr("class")||"",v55=v54.split(" ").find(function(v56) {
          return v56.indexOf("view--")===0||v56.indexOf("button--")===0;
        });
        v55?(v53=v55.replace("view--","").replace("button--","").replace(/_/g," "),v53=v53.charAt(0).toUpperCase()+v53.slice(1)):v53="Кнопка";
      }
      return v53;
    }
    
    function createFolderButton(v57) {
      var v58=getFolderTitles(),v59=getFolderIcons(),v60=getFolders(),v61=v58[v57]||"Папка",v62=v59[v57]||DEFAULT_FOLDER_ICON,v63=v60[v57]||[],v64=$("<div>").addClass("full-start__button selector button--folder").attr("data-folder-id",v57).append($(v62)).append($("<span>").text(v61));
      return v64.on("hover:enter",function() {
        openFolderMenu(v57);
      }),v64.on("hover:long",function() {
        openEditor(currentRender);
      }),v64;
    }
    
    function openFolderMenu(v65) {
      var v66=getFolders(),v67=getFolderTitles(),v68=v67[v65]||"Папка",v69=v66[v65]||[],v70=[];
      v69.forEach(function(v71) {
        var v72=findButtonById(v71);
        if(v72) {
          var v73=v72.jquery?v72:$(v72),v74=buttonTitle(v73),v75=v73.find("svg").first(),v76=v75.length?v75.prop("outerHTML"):"",v77= {
            "title":v74.replace(/<[^>]*>/g,""),"onSelect":function() {
              v73.length&&v73.trigger("hover:enter");
            }
            
          };
          v76&&(v77.template="selectbox_icon",v77.icon=v76),v70.push(v77);
        }
        
      }),v70.push( {
        "title":"Редактировать содержимое","onSelect":function() {
          editFolderContent(v65);
        }
        
      }),v70.push( {
        "title":"Изменить порядок","onSelect":function() {
          reorderFolderButtons(v65);
        }
        
      }),Lampa.Select.show( {
        "title":v68,"items":v70,"onBack":function() {
          Lampa.Controller.toggle("content");
        }
        
      });
    }
    
    function editFolderContent(v78) {
      var v79=getFolders(),v80=getFolderTitles(),v81=v80[v78]||"Папка",v82=v79[v78]||[],v83=allFolderButtonIds(),v84=v82.slice(),v85=$("<div class=\"menu-edit-list\"></div>"),v86=[];
      allButtons.forEach(function(v87) {
        var v88=getButtonId(v87);
        (v82.indexOf(v88)!==-1||v83.indexOf(v88)===-1)&&v86.push(v87);
      });
      var v89= {};
      v86.forEach(function(v90) {
        var v91=v90.find("span").first().text().trim()||v90.text().trim();
        v91&&(v89[v91]=(v89[v91]||0)+1);
      }),v86.forEach(function(v92) {
        var v93=getButtonId(v92),v94=buttonTitle(v92),v95=v92.find("svg").first(),v96=v95.length?v95.clone():$("<svg></svg>"),v97=v84.indexOf(v93)!==-1,v98=v92.find("span").first().text().trim()||v92.text().trim();
        if(v98&&v89[v98]>1) {
          var v99=v92.attr("class")||"",v100=v92.attr("data-subtitle")||v92.attr("data-name")||v92.attr("data-id")||"";
          if(v100) {
            var v101=v100.split(/\s+/)[0];
            if(v101.length>30)v101=v101.substring(0,30);
            v94=v98+" ("+v101+")";
          }
          else {
            var v102=v99.match(/(?:button--|view--)(\w+)/);
            v102&&v102[1]&&(v94=v98+" ("+v102[1]+")");
          }
          
        }
        var v103=$("<div class=\"menu-edit-list__item\">                <div class=\"menu-edit-list__icon\"></div>                <div class=\"menu-edit-list__title\">"+v94+"</div>                <div class=\"menu-edit-list__toggle selector\">                    <svg width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                        <rect x=\"1.89111\" y=\"1.78369\" width=\"21.793\" height=\"21.793\" rx=\"3.5\" stroke=\"currentColor\" stroke-width=\"3\"/>                        <path d=\"M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588\" stroke=\"currentColor\" stroke-width=\"3\" class=\"dot\" opacity=\""+(v97?"1":"0")+"\" stroke-linecap=\"round\"/>                    </svg>                </div>            </div>");
        v103.find(".menu-edit-list__icon").append(v96),v103.find(".menu-edit-list__toggle").on("hover:enter",function() {
          var v104=v84.indexOf(v93);
          v104!==-1?(v84.splice(v104,1),v103.find(".dot").attr("opacity","0")):(v84.push(v93),v103.find(".dot").attr("opacity","1"));
        }),v85.append(v103);
      });
      var v105=$("<div class=\"selector folder-create-confirm\">            <div>Сохранить изменения</div>        </div>");
      v105.on("hover:enter",function() {
        if(v84.length<1) {
          Lampa.Noty.show("Выберите хотя бы 1 кнопку");
          return;
        }
        var v106=getFolders();
        v106[v78]=v84,saveFolders(v106),Lampa.Modal.close(),Lampa.Noty.show("Содержимое папки обновлено"),setTimeout(function() {
          currentRender&&currentRender.length&&currentRender[0]&&(applyAll(currentRender),Lampa.Controller.toggle("content"));
        },200);
      }),v85.append(v105),Lampa.Modal.open( {
        "title":"Редактирование: "+v81,"html":v85,"size":modalSize(),"scroll_to_center":true,"onBack":function() {
          Lampa.Modal.close(),openFolderMenu(v78);
        }
        
      });
    }
    
    function reorderFolderButtons(v107) {
      var v108=getFolders(),v109=v108[v107]||[],v110=$("<div class=\"menu-edit-list\"></div>"),v111=[];
      v109.forEach(function(v112) {
        var v113=findButtonById(v112);
        v113&&v111.push(v113);
      });
      var v114= {};
      v111.forEach(function(v115) {
        var v116=v115.jquery?v115:$(v115),v117=v116.find("span").first().text().trim()||v116.text().trim();
        v117&&(v114[v117]=(v114[v117]||0)+1);
      }),v111.forEach(function(v118) {
        var v119=v118.jquery?v118:$(v118),v120=getButtonId(v119),v121=buttonTitle(v119),v122=v119.find("svg").first(),v123=v122.length?v122.clone():$("<svg></svg>"),v124=v119.find("span").first().text().trim()||v119.text().trim();
        if(v124&&v114[v124]>1) {
          var v125=v119.attr("class")||"",v126=v119.attr("data-subtitle")||v119.attr("data-name")||v119.attr("data-id")||"";
          if(v126) {
            var v127=v126.split(/\s+/)[0];
            if(v127.length>30)v127=v127.substring(0,30);
            v121=v124+" ("+v127+")";
          }
          else {
            var v128=v125.match(/(?:button--|view--)(\w+)/);
            v128&&v128[1]&&(v121=v124+" ("+v128[1]+")");
          }
          
        }
        var v129=$("<div class=\"menu-edit-list__item\">"+"<div class=\"menu-edit-list__icon\"></div>"+"<div class=\"menu-edit-list__title\">"+v121+"</div>"+"<div class=\"menu-edit-list__move move-up selector\">"+"<svg width=\"22\" height=\"14\" viewBox=\"0 0 22 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">"+"<path d=\"M2 12L11 3L20 12\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/>"+"</svg>"+"</div>"+"<div class=\"menu-edit-list__move move-down selector\">"+"<svg width=\"22\" height=\"14\" viewBox=\"0 0 22 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">"+"<path d=\"M2 2L11 11L20 2\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/>"+"</svg>"+"</div>"+"</div>");
        v129.find(".menu-edit-list__icon").append(v123),v129.data("btnId",v120),v129.find(".move-up").on("hover:enter",function() {
          var v130=v129.prev();
          v130.length&&(v129.insertBefore(v130),saveFolderOrderFromDom(v107,v110));
        }),v129.find(".move-down").on("hover:enter",function() {
          var v131=v129.next();
          v131.length&&(v129.insertAfter(v131),saveFolderOrderFromDom(v107,v110));
        }),v110.append(v129);
      });
      var v132=getFolderTitles();
      Lampa.Modal.open( {
        "title":v132[v107]||"Папка","html":v110,"size":modalSize(),"scroll_to_center":true,"onBack":function() {
          Lampa.Modal.close(),openFolderMenu(v107);
        }
        
      });
    }
    
    function saveFolderOrderFromDom(v133,v134) {
      var v135=[];
      v134.find(".menu-edit-list__item").each(function() {
        var v136=$(this).data("btnId");
        v136&&v135.push(v136);
      });
      if(v135.length>0) {
        var v137=getFolders();
        v137[v133]=v135,saveFolders(v137);
      }
      
    }
    
    function getTitles() {
      var v138=Lampa.Storage["get"](KEY_TITLES);
      return v138&&typeof v138==="object"?v138: {};
    }
    
    function setTitle(v139,v140) {
      var v141=getTitles();
      v141[v139]=v140,Lampa.Storage["set"](KEY_TITLES,v141);
    }
    
    function getIcons() {
      var v142=Lampa.Storage["get"](KEY_ICONS);
      return v142&&typeof v142==="object"?v142: {};
    }
    
    function setIcon(v143,v144) {
      var v145=getIcons();
      v145[v143]=v144,Lampa.Storage["set"](KEY_ICONS,v145);
    }
    
    function getOriginalTitles() {
      var v146=Lampa.Storage["get"](KEY_ORIG_TITLES);
      return v146&&typeof v146==="object"?v146: {};
    }
    
    function rememberOriginalTitles(v147) {
      if(!v147||!v147.length||!v147[0])return;
      var v148=getOriginalTitles(),v149=false;
      v147.find(".full-start__button").each(function() {
        var v150=$(this);
        if(v150.hasClass("button--folder"))return;
        var v151=getButtonId(v150);
        if(!v148[v151]) {
          var v152;
          v151==="button--rating"?v152="Оценить":v152=v150.find("span").first().text().trim(),v152&&(v148[v151]=v152,v149=true);
        }
        
      }),v149&&Lampa.Storage["set"](KEY_ORIG_TITLES,v148);
    }
    
    function rememberOriginalIcons(v153) {
      if(!v153||!v153.length||!v153[0])return;
      var v154=Lampa.Storage["get"](KEY_ORIG_ICONS, {}),v155=false;
      v153.find(".full-start__button").each(function() {
        var v156=$(this),v157=getButtonId(v156);
        if(!v154[v157]) {
          var v158=v156.find("svg").first();
          v158.length&&(v154[v157]=v158.prop("outerHTML"),v155=true);
        }
        
      }),v155&&Lampa.Storage["set"](KEY_ORIG_ICONS,v154);
    }
    
    function getRenderBody(v159) {
      if(v159&&v159.body)return v159.body;
      if(v159&&v159.link&&v159.link.html)return v159.link.html;
      if(v159&&v159.object&&v159.object.activity&&typeof v159.object.activity.render==="function")return v159.object.activity.render();
      return null;
    }
    
    function getButtonId(v160) {
      var v161=v160.attr("data-button-id");
      if(v161)return v161;
      if(v160.hasClass("shots-view-button"))return v161="shots-view-button",v160.attr("data-button-id",v161),v161;
      var v162=(v160.attr("class")||"").split(/\s+/),v163=null;
      for(var v164=0;v164<v162.length;v164++) {
        var v165=v162[v164];
        if(v165.indexOf("button--")===0&&v165!=="button--priority") {
          v163=v165;
          break;
        }
        
      }
      if(!v163)for(var v166=0;v166<v162.length;v166++) {
        var v167=v162[v166];
        if(v167.indexOf("view--")===0) {
          v163=v167;
          break;
        }
        
      }
      if(v163) {
        if(v163==="button--rating")return v160.attr("data-button-id","button--rating"),"button--rating";
        var v168=v160.attr("data-subtitle")||"",v169=v160.attr("data-name")||"",v170=v168||v169||"";
        if(v170)return v161=v163+"_"+Lampa.Utils.hash(v170),v160.attr("data-button-id",v161),v161;
        var v171=v160.clone();
        v171.find(".focus").removeClass("focus"),v171.find("svg").remove(),v171.find("span").remove();
        var v172=Lampa.Utils.hash(v171.html());
        return v161=v163+"_"+v172,v160.attr("data-button-id",v161),v161;
      }
      var v173=v160.data("id")||v160.data("name")||v160.attr("data-name");
      if(v173)return v161="data:"+v173,v160.attr("data-button-id",v161),v161;
      var v174=v160.text().trim();
      if(v174)return v161="text:"+v174,v160.attr("data-button-id",v161),v161;
      return v161="html:"+Lampa.Utils.hash(v160.clone().removeClass("focus").prop("outerHTML")),v160.attr("data-button-id",v161),v161;
    }
    
    function defaultSubtitleFor(v175) {
      if(DEFAULT_SUBTITLES[v175])return DEFAULT_SUBTITLES[v175]();
      var v176=v175.split("_")[0];
      if(DEFAULT_SUBTITLES[v176])return DEFAULT_SUBTITLES[v176]();
      if(v175.indexOf("_")!==-1) {
        var v177=v175.split("_");
        if(v177.length>=2) {
          var v178=v177[0]+"_"+v177[1];
          if(DEFAULT_SUBTITLES[v178])return DEFAULT_SUBTITLES[v178]();
        }
        
      }
      return null;
    }
    
    function displayTitleFor(v179,v180) {
      var v181=getTitles();
      if(v181[v179])return v181[v179];
      var v182=v180.find("span").first().text().trim()||v180.text().trim();
      if(v182)return v182;
      var v183=defaultSubtitleFor(v179);
      if(v183)return v183;
      return v179;
    }
    
    function focusedButtonId(v184) {
      if(!v184||!v184.length)return null;
      var v185=v184.find(".full-start__button.focus");
      if(v185&&v185.length)return getButtonId(v185);
      return null;
    }
    
    function restoreButton(v186,v187) {
      if(!v186||!v186.length||!v186[0]||!v187)returnfalse;
      var v188=v186.find(".full-start__button").filter(function() {
        return getButtonId($(this))===v187;
      }).first();
      if(v188&&v188.length&&!v188.hasClass("button-hide")&&!v188.hasClass("hide"))try {
        return Lampa.Controller.collectionFocus(v188[0],v186[0]),true;
      }
      catch(v189) {}returnfalse;
    }
    
    function applyTitleToButton(v190,v191,v192) {
      if(!v192||!v192.length||!v192[0])return;
      var v193=v192.find(".full-start__button").filter(function() {
        return getButtonId($(this))===v190;
      }).first();
      if(v193&&v193.length) {
        var v194=v193.find("span").first();
        v194.length?v194.text(v191):v193.contents().filter(function() {
          return this.nodeType===3;
        }).first().replaceWith(v191),v193.attr("data-original-title",v191);
      }
      
    }
    
    function applyIconToButton(v195,v196,v197) {
      if(!v197||!v197.length||!v197[0])return;
      var v198=v197.find(".full-start__button").filter(function() {
        return getButtonId($(this))===v195;
      }).first();
      if(v198&&v198.length) {
        var v199=v198.find("svg").first();
        if(v199.length&&v196) {
          var v200=$(v196);
          v199.replaceWith(v200);
        }
        
      }
      
    }
    
    function applyIcons(v201) {
      if(!v201||!v201.length||!v201[0])return;
      var v202=getIcons(),v203=Lampa.Storage["get"](KEY_ORIG_ICONS, {}),v204= {};
      Object.keys(v203).forEach(function(v205) {
        var v206=v205.split("_")[0];
        if(!v204[v206])v204[v206]=[];
        v204[v206].push(v203[v205]);
      });
      var v207= {};
      v201.find(".full-start__button").each(function() {
        var v208=$(this);
        if(v208.hasClass("button--folder"))return;
        var v209=getButtonId(v208);
        if(v202[v209]) {
          var v210=v208.find("svg").first();
          if(v210.length) {
            var v211=$(v202[v209]);
            v210.replaceWith(v211);
          }
          return;
        }
        if(v203[v209]) {
          var v210=v208.find("svg").first();
          if(v210.length&&v210.prop("outerHTML")!==v203[v209]) {
            var v211=$(v203[v209]);
            v210.replaceWith(v211);
          }
          return;
        }
        var v212=v209.split("_")[0];
        if(v204[v212]) {
          if(!v207[v212])v207[v212]=0;
          var v213=v207[v212];
          if(v213<v204[v212].length) {
            var v214=v204[v212][v213];
            v207[v212]++;
            var v210=v208.find("svg").first();
            if(v210.length&&v210.prop("outerHTML")!==v214) {
              var v211=$(v214);
              v210.replaceWith(v211);
            }
            
          }
          
        }
        
      });
    }
    
    function collectButtons(v215,v216) {
      if(!v215||!v215.length||!v215[0])return {
        "items":[],"map": {},"targetContainer":$(),"extraContainer":$()
      };
      var v217=v215.find(".full-start-new__buttons"),v218=v215.find(".buttons--container"),v219=[],v220= {};
      function normalizeButtons(v221) {
        v221.each(function() {
          var v222=$(this);
          if(v222.hasClass("button--play")||v222.hasClass("button--priority"))return;
          if(v222.hasClass("hide"))return;
          if(v222.hasClass("button--folder"))return;
          var v223=getButtonId(v222);
          if(!v223)return;
          v222.hasClass("button--options")&&!v222.find("span").length&&v222.append("<span>Ещё</span>");
          if(v220[v223]) {
            var v224=1,v225=v223+"_"+v224;
            while(v220[v225]) {
              v224++,v225=v223+"_"+v224;
            }
            v223=v225;
          }
          v220[v223]=v216?v222.detach():v222,v219.push(v223);
        });
      }
      if(v217.length)normalizeButtons(v217.find(".full-start__button"));
      if(v218.length)normalizeButtons(v218.find(".full-start__button"));
      return {
        "items":v219,"map":v220,"targetContainer":v217,"extraContainer":v218
      };
    }
    
    function mergeOrder(v226,v227) {
      var v228=[],v229=new Set(v227);
      v226.forEach(function(v230) {
        if(v229.has(v230))v228.push(v230);
      });
      var v231=[];
      v227.forEach(function(v232) {
        if(!v228.includes(v232))v231.push(v232);
      });
      if(!v226||v226.length===0) {
        var v233=["view--torrent","view--trailer","shots-view-button","button--book","button--reaction","button--options","button--rating"];
        v231.sort(function(v234,v235) {
          var v236=v234.split("_")[0],v237=v235.split("_")[0],v238=v233.indexOf(v236),v239=v233.indexOf(v237);
          if(v234==="shots-view-button")v238=v233.indexOf("shots-view-button");
          if(v235==="shots-view-button")v239=v233.indexOf("shots-view-button");
          if(v238!==-1&&v239!==-1)return v238-v239;
          if(v238!==-1)return 1;
          if(v239!==-1)return-1;
          if(v236<v237)return-1;
          if(v236>v237)return 1;
          return 0;
        });
      }
      return v231.forEach(function(v240) {
        v228.push(v240);
      }),v228;
    }
    
    function applyHidden(v241) {
      var v242=new Set(getStoredList(KEY_HIDE));
      Object.keys(v241).forEach(function(v243) {
        if(v241[v243])v241[v243].toggleClass("button-hide",v242.has(v243));
      });
    }
    
    function applyTitles(v244) {
      if(!v244||!v244.length||!v244[0])return;
      var v245=getTitles(),v246=getOriginalTitles();
      v244.find(".full-start__button").each(function() {
        var v247=$(this);
        if(v247.hasClass("button--folder"))return;
        var v248=getButtonId(v247);
        if(v245[v248]) {
          var v249=v247.find("span").first();
          v249.length?v249.text(v245[v248]):v247.contents().filter(function() {
            return this.nodeType===3;
          }).first().replaceWith(v245[v248]);
        }
        else {
          if(v246[v248]) {
            var v249=v247.find("span").first();
            v249.length&&v249.text().trim()!==v246[v248]&&v249.text(v246[v248]);
          }
          
        }
        
      });
    }
    
    function applyShowNames(v250) {
      if(!v250||!v250.length||!v250[0])return;
      var v251=Lampa.Storage["get"](KEY_SHOW_NAMES);
      if(v251===null)v251=true;
      var v252=v250.find(".full-start-new__buttons");
      if(!v252.length)return;
      v252.find(".button--options").each(function() {
        var v253=$(this);
        if(!v253.find("span").length)v253.append("<span>Ещё</span>");
      }),v251?v252.find(".full-start__button").each(function() {
        var v254=$(this),v255=v254.find("span");
        if(v255.length)v255.css("display","inline");
      }):v252.find(".full-start__button").each(function() {
        var v256=$(this),v257=v256.find("span");
        if(v257.length)v257.css("display","");
      });
    }
    
    function applyAll(v258,v259) {
      if(!v258||!v258.length||!v258[0])return;
      injectStyles();
      var v260=v258.find(".full-start-new__buttons");
      if(!v260.length)return;
      rememberOriginalTitles(v258),rememberOriginalIcons(v258);
      !v259&&v260.find(".button--folder").remove();
      var v261=v260.find(".button--priority").detach(),v262=collectButtons(v258,true),v263=v262.items,v264=v262.map,v265=allFolderButtonIds(),v266=getFolders(),v267=getHiddenFolders(),v268=getItemOrder(),v269=mergeOrder(getStoredList(KEY_ORDER),v263);
      v260.empty();
      v261.length&&v260.append(v261);
      var v270= {},v271=[];
      v268.length>0&&v268.forEach(function(v272) {
        if(v272.type==="folder"&&!v270[v272.id]) {
          var v273=createFolderButton(v272.id);
          v273.length&&(v267.indexOf(v272.id)!==-1&&v273.addClass("folder-hidden"),v260.append(v273),v270[v272.id]=true);
        }
        else {
          if(v272.type==="button"&&!v270[v272.id]) {
            var v274=v272.id;
            v264[v274]&&v264[v274].length&&(v265.includes(v274)?v264[v274].attr("style","display: none !important"):v264[v274].attr("style",""),v260.append(v264[v274]),v270[v274]=true);
          }
          
        }
        
      }),Object.keys(v266).forEach(function(v275) {
        !v270[v275]&&v271.push(v275);
      }),v271.forEach(function(v276) {
        var v277=createFolderButton(v276);
        if(v277.length) {
          v267.indexOf(v276)!==-1&&v277.addClass("folder-hidden");
          var v278=v260.children().first();
          v278.length?v277.insertBefore(v278):v260.append(v277),v270[v276]=true;
        }
        
      }),v269.forEach(function(v279) {
        !v270[v279]&&v264[v279]&&v264[v279].length&&(v265.includes(v279)?v264[v279].attr("style","display: none !important"):v264[v279].attr("style",""),v260.append(v264[v279]),v270[v279]=true);
      }),allButtons=[],v269.forEach(function(v280) {
        v264[v280]&&v264[v280].length&&allButtons.push(v264[v280]);
      }),applyHidden(v264),applyIcons(v258),applyTitles(v258),applyShowNames(v258),!v259&&setTimeout(function() {
        applyIcons(v258),applyTitles(v258),applyShowNames(v258);
      },200),Lampa.Controller.toggle("content");
    }
    
    function openIconPicker(v281,v282,v283) {
      var v284=$("<div class=\"icon-picker-list\"></div>"),v285=$("<div class=\"icon-reset-button selector\">По умолчанию</div>");
      v285.on("hover:enter",function() {
        Lampa.Modal.close();
        var v286=getIcons();
        delete v286[v281],Lampa.Storage["set"](KEY_ICONS,v286);
        var v287=Lampa.Storage["get"](KEY_ORIG_ICONS, {});
        v287[v281]&&applyIconToButton(v281,v287[v281],v282);
        if(v283)v283();
      }),v284.append(v285),ICON_LIBRARY.forEach(function(v288) {
        var v289=$("<div class=\"icon-picker-item selector\"><div class=\"icon-picker-icon\">"+v288.svg+"</div></div>");
        v289.on("hover:enter",function() {
          Lampa.Modal.close(),setIcon(v281,v288.svg);
          if(v283)v283();
        }),v284.append(v289);
      }),Lampa.Modal.open( {
        "title":"Выберите иконку","html":v284,"size":modalSize(),"scroll_to_center":true,"onBack":function() {
          Lampa.Modal.close();
          if(v283)v283();
        }
        
      });
    }
    
    function openFolderIconPicker(v290,v291) {
      var v292=$("<div class=\"icon-picker-list\"></div>"),v293=$("<div class=\"icon-reset-button selector\">По умолчанию</div>");
      v293.on("hover:enter",function() {
        Lampa.Modal.close(),setFolderIcon(v290,DEFAULT_FOLDER_ICON),Lampa.Noty.show("Иконка сброшена"),setTimeout(function() {
          v291&&v291.length&&v291[0]&&openEditor(v291,lastFocusedButtonId,lastControllerName);
        },100);
      }),v292.append(v293),ICON_LIBRARY.forEach(function(v294) {
        var v295=$("<div class=\"icon-picker-item selector\"><div class=\"icon-picker-icon\">"+v294.svg+"</div></div>");
        v295.on("hover:enter",function() {
          Lampa.Modal.close(),setFolderIcon(v290,v294.svg),Lampa.Noty.show("Иконка изменена"),setTimeout(function() {
            v291&&v291.length&&v291[0]&&openEditor(v291,lastFocusedButtonId,lastControllerName);
          },100);
        }),v292.append(v295);
      }),Lampa.Modal.open( {
        "title":"Выберите иконку для папки","html":v292,"size":modalSize(),"scroll_to_center":true,"onBack":function() {
          Lampa.Modal.close(),setTimeout(function() {
            v291&&v291.length&&v291[0]&&openEditor(v291,lastFocusedButtonId,lastControllerName);
          },100);
        }
        
      });
    }
    
    function renameButtonDialog(v296,v297,v298,v299,v300,v301,v302) {
      Lampa.Modal.close(),Lampa.Input.edit( {
        "free":true,"title":"Изменить название кнопки","nosave":true,"value":v297,"onBack":function() {
          setTimeout(function() {
            v298&&v298.length&&v298[0]&&openEditor(v298,v296,v301);
          },200);
        }
        
      },function(v303) {
        if(v303&&v303.trim()) {
          var v304=v303.trim();
          setTitle(v296,v304),applyTitleToButton(v296,v304,v298),Lampa.Noty.show("Название кнопки изменено"),setTimeout(function() {
            v298&&v298.length&&v298[0]&&openEditor(v298,v296,v301);
          },200);
        }
        else Lampa.Noty.show("Название не может быть пустым"),setTimeout(function() {
          v298&&v298.length&&v298[0]&&openEditor(v298,v296,v301);
        },200);
      });
    }
    
    function renameFolderDialog(v305,v306,v307) {
      Lampa.Modal.close(),Lampa.Input.edit( {
        "free":true,"title":"Изменить название папки","nosave":true,"value":v306,"onBack":function() {
          setTimeout(function() {
            v307&&v307.length&&v307[0]&&openEditor(v307,v305,lastControllerName);
          },200);
        }
        
      },function(v308) {
        if(v308&&v308.trim()) {
          var v309=v308.trim();
          setFolderTitle(v305,v309),Lampa.Noty.show("Название папки изменено"),setTimeout(function() {
            v307&&v307.length&&v307[0]&&openEditor(v307,v305,lastControllerName);
          },200);
        }
        else Lampa.Noty.show("Название не может быть пустым"),setTimeout(function() {
          v307&&v307.length&&v307[0]&&openEditor(v307,v305,lastControllerName);
        },200);
      });
    }
    
    function createFolderDialog() {
      Lampa.Input.edit( {
        "free":true,"title":"Название папки","nosave":true,"value":"","nomic":true
      },function(v310) {
        if(!v310||!v310.trim()) {
          Lampa.Noty.show("Введите название папки"),openEditor(currentRender,lastFocusedButtonId,lastControllerName);
          return;
        }
        pickNewFolderIcon(v310.trim());
      });
    }
    
    function pickNewFolderIcon(v311) {
      var v312=$("<div class=\"icon-picker-list\"></div>");
      ICON_LIBRARY.forEach(function(v313) {
        var v314=$("<div class=\"icon-picker-item selector\">                <div class=\"icon-picker-icon\">"+v313.svg+"</div>            </div>");
        v314.on("hover:enter",function() {
          Lampa.Modal.close(),pickNewFolderContent(v311,v313.svg);
        }),v312.append(v314);
      }),Lampa.Modal.open( {
        "title":"Выберите иконку для папки","html":v312,"size":modalSize(),"scroll_to_center":true,"onBack":function() {
          Lampa.Modal.close(),createFolderDialog();
        }
        
      });
    }
    
    function pickNewFolderContent(v315,v316) {
      var v317=[],v318=$("<div class=\"menu-edit-list\"></div>"),v319=allFolderButtonIds(),v320=[];
      allButtons.forEach(function(v321) {
        var v322=getButtonId(v321);
        v319.indexOf(v322)===-1&&v320.push(v321);
      });
      var v323= {};
      v320.forEach(function(v324) {
        var v325=v324.find("span").first().text().trim()||v324.text().trim();
        v325&&(v323[v325]=(v323[v325]||0)+1);
      }),v320.forEach(function(v326) {
        var v327=getButtonId(v326),v328=buttonTitle(v326),v329=v326.find("svg").first(),v330=v329.length?v329.clone():$("<svg></svg>"),v331=v326.find("span").first().text().trim()||v326.text().trim();
        if(v331&&v323[v331]>1) {
          var v332=v326.attr("class")||"",v333=v326.attr("data-subtitle")||v326.attr("data-name")||v326.attr("data-id")||"";
          if(v333) {
            var v334=v333.split(/\s+/)[0];
            if(v334.length>30)v334=v334.substring(0,30);
            v328=v331+" ("+v334+")";
          }
          else {
            var v335=v332.match(/(?:button--|view--)(\w+)/);
            v335&&v335[1]&&(v328=v331+" ("+v335[1]+")");
          }
          
        }
        var v336=$("<div class=\"menu-edit-list__item\">                <div class=\"menu-edit-list__icon\"></div>                <div class=\"menu-edit-list__title\">"+v328+"</div>                <div class=\"menu-edit-list__toggle selector\">                    <svg width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                        <rect x=\"1.89111\" y=\"1.78369\" width=\"21.793\" height=\"21.793\" rx=\"3.5\" stroke=\"currentColor\" stroke-width=\"3\"/>                        <path d=\"M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588\" stroke=\"currentColor\" stroke-width=\"3\" class=\"dot\" opacity=\"0\" stroke-linecap=\"round\"/>                    </svg>                </div>            </div>");
        v336.find(".menu-edit-list__icon").append(v330),v336.find(".menu-edit-list__toggle").on("hover:enter",function() {
          var v337=v317.indexOf(v327);
          v337!==-1?(v317.splice(v337,1),v336.find(".dot").attr("opacity","0")):(v317.push(v327),v336.find(".dot").attr("opacity","1"));
        }),v318.append(v336);
      });
      var v338=$("<div class=\"selector folder-create-confirm\">            <div>Создать папку \""+v315+"\"</div>        </div>");
      v338.on("hover:enter",function() {
        if(v317.length<1) {
          Lampa.Noty.show("Выберите минимум 1 кнопку");
          return;
        }
        var v339="folder_"+Date.now()+"_"+Math.floor(Math.random()*10000);
        setFolderTitle(v339,v315),setFolderIcon(v339,v316);
        var v340=getFolders();
        v340[v339]=v317,saveFolders(v340),Lampa.Modal.close(),Lampa.Noty.show("Папка \""+v315+"\" создана"),setTimeout(function() {
          currentRender&&currentRender.length&&currentRender[0]&&(applyAll(currentRender),Lampa.Controller.toggle("content"));
        },200);
      }),v318.append(v338),Lampa.Modal.open( {
        "title":"Выберите кнопки для папки","html":v318,"size":modalSize(),"scroll_to_center":true,"onBack":function() {
          Lampa.Modal.close(),pickNewFolderIcon(v315);
        }
        
      });
    }
    
    function openEditor(v341,v342,v343) {
      if(!v341||!v341.length||!v341[0])return;
      if(v343)lastControllerName=v343;
      else {
        var v344=Lampa.Controller.enabled();
        lastControllerName=v344?v344.name:"content";
      }
      !v342?lastFocusedButtonId=focusedButtonId(v341):lastFocusedButtonId=v342;
      var v345=collectButtons(v341,false),v346=v345.items,v347=v345.map,v348=mergeOrder(getStoredList(KEY_ORDER),v346),v349=new Set(getStoredList(KEY_HIDE)),v350=getFolders(),v351=allFolderButtonIds(),v352=getFolderTitles(),v353=getFolderIcons(),v354=getHiddenFolders(),v355=getItemOrder(),v356=Lampa.Storage["get"](KEY_SHOW_NAMES);
      if(v356===null)v356=true;
      var v357=$("<div class=\"menu-edit-list\"></div>"),v358=$("<div class=\"menu-edit-list__item menu-edit-list__create-folder selector\">"+"<div class=\"menu-edit-list__icon\">"+"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">"+"<path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path>"+"<line x1=\"12\" y1=\"11\" x2=\"12\" y2=\"17\"></line>"+"<line x1=\"9\" y1=\"14\" x2=\"15\" y2=\"14\"></line>"+"</svg>"+"</div>"+"<div class=\"menu-edit-list__title\">Создать папку</div>"+"</div>");
      v358.on("hover:enter",function() {
        Lampa.Modal.close(),createFolderDialog();
      }),v357.append(v358);
      var v359=v356?1:0,v360=$("<div class=\"menu-edit-list__item\" data-id=\"show_names\">            <div class=\"menu-edit-list__icon\">                <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                    <path d=\"M3 12H21M3 6H21M3 18H21\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>                </svg>            </div>            <div class=\"menu-edit-list__title\">Названия кнопок</div>            <div class=\"menu-edit-list__toggle toggle selector\">                <svg width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                    <rect x=\"1.89111\" y=\"1.78369\" width=\"21.793\" height=\"21.793\" rx=\"3.5\" stroke=\"currentColor\" stroke-width=\"3\"/>                    <path d=\"M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588\" stroke=\"currentColor\" stroke-width=\"3\" class=\"dot\" opacity=\""+v359+"\" stroke-linecap=\"round\"/>                </svg>            </div>        </div>");
      if(!v356)v360.addClass("button-hidden");
      v360.find(".toggle").on("hover:enter",function() {
        v360.toggleClass("button-hidden");
        var v361=v360.find(".dot");
        v361.attr("opacity",v360.hasClass("button-hidden")?0:1);
      }),v357.append(v360),v357.append("<div class=\"menu-edit-split\"></div>");
      var v362= {};
      v348.forEach(function(v363) {
        var v364=v347[v363];
        if(!v364||!v364.length)return;
        var v365=v364.find("span").first().text().trim()||v364.text().trim();
        v365&&(v362[v365]=(v362[v365]||0)+1);
      });
      var v366=getIcons(),v367=Lampa.Storage["get"](KEY_ORIG_ICONS, {}),v368=[],v369= {};
      Object.keys(v350).forEach(function(v370) {
        !v355.some(function(v371) {
          return v371.id===v370;
        })&&(v368.push( {
          "type":"folder","id":v370
        }),v369[v370]=true);
      });
      v355.length>0&&v355.forEach(function(v372) {
        if(v372.type==="folder"&&!v369[v372.id])v368.push( {
          "type":"folder","id":v372.id
        }),v369[v372.id]=true;
        else v372.type==="button"&&!v369[v372.id]&&(!v351.includes(v372.id)&&(v368.push( {
          "type":"button","id":v372.id
        }),v369[v372.id]=true));
      });
      v348.forEach(function(v373) {
        !v369[v373]&&!v351.includes(v373)&&(v368.push( {
          "type":"button","id":v373
        }),v369[v373]=true);
      }),v368.forEach(function(v374) {
        if(v374.type==="folder") {
          var v375=v374.id,v376=v352[v375]||"Папка",v377=v353[v375]||DEFAULT_FOLDER_ICON,v378=v350[v375]||[],v379=v354.indexOf(v375)!==-1,v380=$("<div class=\"menu-edit-list__item folder-item"+(v379?" folder-hidden-item":"")+"\" data-id=\""+v375+"\">                    <div class=\"menu-edit-list__icon\">"+v377+"</div>                    <div class=\"menu-edit-list__title\">"+v376+" <span class=\"menu-edit-list__title-sub\">("+v378.length+")</span></div>                    <div class=\"menu-edit-list__delete selector\" title=\"Удалить папку\">                        <svg width=\"22\" height=\"22\" viewBox=\"0 0 26 26\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                            <rect x=\"1.89111\" y=\"1.78369\" width=\"21.793\" height=\"21.793\" rx=\"3.5\" stroke=\"currentColor\" stroke-width=\"3\"/>                            <path d=\"M9.5 9.5L16.5 16.5M16.5 9.5L9.5 16.5\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/>                        </svg>                    </div>                    <div class=\"menu-edit-list__edit selector\" title=\"Переименовать\">                        <svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                            <path d=\"M16.474 5.408L18.592 7.526M16.474 5.408L7.408 14.474C7.146 14.736 7 15.088 7 15.456V17.5H9.044C9.412 17.5 9.764 17.354 10.026 17.092L19.092 8.026M16.474 5.408L19.092 8.026M19.092 8.026L21 6.118C21.39 5.728 21.39 5.092 21 4.704L19.296 3C18.908 2.61 18.272 2.61 17.882 3L16.474 4.408\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>                        </svg>                    </div>                    <div class=\"menu-edit-list__icon-edit selector\" title=\"Сменить иконку\">                        <svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                            <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"1.5\"/>                            <circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\" fill=\"currentColor\"/>                            <path d=\"M21 15l-5-5L5 21\" stroke=\"currentColor\" stroke-width=\"1.5\"/>                        </svg>                    </div>                    <div class=\"menu-edit-list__move move-up selector\">                        <svg width=\"22\" height=\"14\" viewBox=\"0 0 22 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                            <path d=\"M2 12L11 3L20 12\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/>                        </svg>                    </div>                    <div class=\"menu-edit-list__move move-down selector\">                        <svg width=\"22\" height=\"14\" viewBox=\"0 0 22 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                            <path d=\"M2 2L11 11L20 2\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/>                        </svg>                    </div>                    <div class=\"menu-edit-list__toggle toggle selector\">                        <svg width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                            <rect x=\"1.89111\" y=\"1.78369\" width=\"21.793\" height=\"21.793\" rx=\"3.5\" stroke=\"currentColor\" stroke-width=\"3\"/>                            <path d=\"M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588\" stroke=\"currentColor\" stroke-width=\"3\" class=\"dot\" opacity=\""+(v379?"0":"1")+"\" stroke-linecap=\"round\"/>                        </svg>                    </div>                </div>");
          v380.find(".menu-edit-list__edit").on("hover:enter",function(v381) {
            v381.stopPropagation(),renameFolderDialog(v375,v376,v341);
          }),v380.find(".menu-edit-list__icon-edit").on("hover:enter",function(v382) {
            v382.stopPropagation(),Lampa.Modal.close(),setTimeout(function() {
              openFolderIconPicker(v375,v341);
            },100);
          }),v380.find(".move-up").on("hover:enter",function(v383) {
            v383.stopPropagation();
            var v384=v380.prev();
            v384.length&&!v384.hasClass("menu-edit-split")&&!v384.hasClass("menu-edit-list__create-folder")&&v384.data("id")!=="show_names"&&v380.insertBefore(v384);
          }),v380.find(".move-down").on("hover:enter",function(v385) {
            v385.stopPropagation();
            var v386=v380.next();
            v386.length&&!v386.hasClass("menu-edit-split")&&!v386.hasClass("folder-reset-button")&&v380.insertAfter(v386);
          }),v380.find(".toggle").on("hover:enter",function(v387) {
            v387.stopPropagation();
            var v388=getHiddenFolders(),v389=v388.indexOf(v375);
            v389!==-1?(v388.splice(v389,1),v380.find(".dot").attr("opacity","1"),v380.removeClass("folder-hidden-item")):(v388.push(v375),v380.find(".dot").attr("opacity","0"),v380.addClass("folder-hidden-item")),saveHiddenFolders(v388);
          }),v380.find(".menu-edit-list__delete").on("hover:enter",function(v390) {
            v390.stopPropagation(),Lampa.Modal.close(),Lampa.Noty.show("Папка удалена"),deleteFolder(v375),setTimeout(function() {
              currentRender&&currentRender.length&&currentRender[0]&&(applyAll(currentRender),Lampa.Controller.toggle("content"));
            },200);
          }),v357.append(v380);
        }
        else {
          var v391=v374.id,v392=v347[v391];
          if(!v392||!v392.length)return;
          var v393=displayTitleFor(v391,v392),v394=v366[v391]||v367[v391]||v392.find("svg").first().prop("outerHTML")||"",v395=v349.has(v391)?0:1,v396=v392.find("span").first().text().trim()||v392.text().trim(),v397=v396||v393;
          if(v396&&v362[v396]>1) {
            var v398=v392.attr("class")||"",v399=v392.attr("data-subtitle")||v392.attr("data-name")||v392.attr("data-id")||"";
            if(v399) {
              var v400=v399.split(/\s+/)[0];
              if(v400.length>30)v400=v400.substring(0,30);
              v397=v396+" <span class=\"menu-edit-list__title-sub\">("+v400+")</span>";
            }
            else {
              var v401=v398.match(/(?:button--|view--)(\w+)/);
              v401&&v401[1]&&(v397=v396+" <span class=\"menu-edit-list__title-sub\">("+v401[1]+")</span>");
            }
            
          }
          var v402=$("<div class=\"menu-edit-list__item\" data-id=\""+v391+"\">                    <div class=\"menu-edit-list__icon\">"+v394+"</div>                    <div class=\"menu-edit-list__title\">"+v397+"</div>                    <div class=\"menu-edit-list__edit selector\" title=\"Изменить название\">                        <svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                            <path d=\"M16.474 5.408L18.592 7.526M16.474 5.408L7.408 14.474C7.146 14.736 7 15.088 7 15.456V17.5H9.044C9.412 17.5 9.764 17.354 10.026 17.092L19.092 8.026M16.474 5.408L19.092 8.026M19.092 8.026L21 6.118C21.39 5.728 21.39 5.092 21 4.704L19.296 3C18.908 2.61 18.272 2.61 17.882 3L16.474 4.408\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>                        </svg>                    </div>                    <div class=\"menu-edit-list__icon-edit selector\" title=\"Сменить иконку\">                        <svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                            <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"1.5\"/>                            <circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\" fill=\"currentColor\"/>                            <path d=\"M21 15l-5-5L5 21\" stroke=\"currentColor\" stroke-width=\"1.5\"/>                        </svg>                    </div>                    <div class=\"menu-edit-list__move move-up selector\">                        <svg width=\"22\" height=\"14\" viewBox=\"0 0 22 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                            <path d=\"M2 12L11 3L20 12\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/>                        </svg>                    </div>                    <div class=\"menu-edit-list__move move-down selector\">                        <svg width=\"22\" height=\"14\" viewBox=\"0 0 22 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                            <path d=\"M2 2L11 11L20 2\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/>                        </svg>                    </div>                    <div class=\"menu-edit-list__toggle toggle selector\">                        <svg width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">                            <rect x=\"1.89111\" y=\"1.78369\" width=\"21.793\" height=\"21.793\" rx=\"3.5\" stroke=\"currentColor\" stroke-width=\"3\"/>                            <path d=\"M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588\" stroke=\"currentColor\" stroke-width=\"3\" class=\"dot\" opacity=\""+v395+"\" stroke-linecap=\"round\"/>                        </svg>                    </div>                </div>");
          v349.has(v391)&&(v402.addClass("button-hidden"),v402.addClass("button-hidden-item"));
          var v403=v402.find(".menu-edit-list__title");
          v402.find(".menu-edit-list__icon-edit").on("hover:enter",function(v404) {
            v404.stopPropagation();
            var v405=lastFocusedButtonId;
            Lampa.Modal.close(),setTimeout(function() {
              openIconPicker(v391,v341,function() {
                lastFocusedButtonId=v405,setTimeout(function() {
                  v341&&v341.length&&v341[0]&&openEditor(v341,v405,lastControllerName);
                },100);
              });
            },100);
          }),v402.find(".menu-edit-list__edit").on("hover:enter",function(v406) {
            v406.stopPropagation();
            var v407=v396||v393;
            renameButtonDialog(v391,v407,v341,v402,v403,lastControllerName,$(this));
          }),v402.find(".move-up").on("hover:enter",function(v408) {
            v408.stopPropagation();
            var v409=v402.prev();
            v409.length&&!v409.hasClass("menu-edit-split")&&v409.data("id")&&v409.data("id")!=="show_names"&&v402.insertBefore(v409);
          }),v402.find(".move-down").on("hover:enter",function(v410) {
            v410.stopPropagation();
            var v411=v402.next();
            v411.length&&!v411.hasClass("menu-edit-split")&&!v411.hasClass("folder-reset-button")&&v402.insertAfter(v411);
          }),v402.find(".toggle").on("hover:enter",function(v412) {
            v412.stopPropagation(),v402.toggleClass("button-hidden"),v402.toggleClass("button-hidden-item");
            var v413=v402.find(".dot");
            v413.attr("opacity",v402.hasClass("button-hidden")?0:1);
          }),v357.append(v402);
        }
        
      });
      var v414=$("<div class=\"folder-reset-button selector\">Сбросить все изменения</div>");
      v414.on("hover:enter",function() {
        Lampa.Storage["set"](KEY_ORDER,[]),Lampa.Storage["set"](KEY_HIDE,[]),Lampa.Storage["set"](KEY_SHOW_NAMES,true),Lampa.Storage["set"](KEY_TITLES, {}),Lampa.Storage["set"](KEY_ICONS, {}),Lampa.Storage["set"](KEY_FOLDER_TITLES, {}),Lampa.Storage["set"](KEY_FOLDER_ICONS, {}),Lampa.Storage["set"](KEY_FOLDER_HIDE,[]),Lampa.Storage["set"](KEY_ITEM_ORDER,[]),saveFolders( {}),allButtons=[],Lampa.Modal.close(),Lampa.Noty.show("Настройки сброшены"),setTimeout(function() {
          v341&&v341.length&&v341[0]&&(applyAll(v341),Lampa.Controller.toggle("content"));
        },200);
      }),v357.append(v414),Lampa.Modal.open( {
        "title":"Редактор кнопок","html":v357,"size":modalSize(),"scroll_to_center":true,"onBack":function saveEditorSettings() {
          var v415=[],v416=[],v417=[],v418=v356,v419=v357.find(".menu-edit-list__item[data-id=\"show_names\"]");
          v419.length&&(v418=!v419.hasClass("button-hidden"),Lampa.Storage["set"](KEY_SHOW_NAMES,v418));
          v357.find(".menu-edit-list__item").each(function() {
            var v420=$(this),v421=v420.data("id");
            if(!v421||v421==="show_names")return;
            v421.indexOf("folder_")===0?v417.push( {
              "type":"folder","id":v421
            }):(v417.push( {
              "type":"button","id":v421
            }),v415.push(v421),v420.hasClass("button-hidden")&&v416.push(v421));
          }),saveItemOrder(v417);
          var v422=getStoredList(KEY_ORDER),v423=false;
          if(v415.length!==v422.length)v423=true;
          else for(var v424=0;v424<v415.length;v424++) {
            if(v415[v424]!==v422[v424]) {
              v423=true;
              break;
            }
            
          }
          v423&&Lampa.Storage["set"](KEY_ORDER,v415),Lampa.Storage["set"](KEY_HIDE,v416),Lampa.Modal.close(),setTimeout(function() {
            if(v341&&v341.length&&v341[0]) {
              var v425=v341.find(".full-start-new__buttons");
              v425.length&&v425.addClass("buttons-loading"),setTimeout(function() {
                applyAll(v341),setTimeout(function() {
                  v425.length&&v425.removeClass("buttons-loading");
                },100),setTimeout(function() {
                  try {
                    lastControllerName?Lampa.Controller.toggle(lastControllerName):Lampa.Controller.toggle("content"),lastFocusedButtonId&&setTimeout(function() {
                      restoreButton(v341,lastFocusedButtonId),lastFocusedButtonId=null;
                    },50);
                  }
                  catch(v426) {
                    try {
                      Lampa.Controller.toggle("content");
                    }
                    catch(v427) {}
                  }
                  
                },50);
              },150);
            }
            
          },100);
        }
        
      });
    }
    
    function init() {
      injectStyles(),Lampa.Listener.follow("activity,full",function(v428) {
        if(v428.type==="complite"||v428.type==="archive") {
          var v429;
          if(v428.object&&v428.object.activity&&typeof v428.object.activity.render==="function")v429=v428.object.activity.render();
          else v428.activity&&typeof v428.activity.render==="function"&&(v429=v428.activity.render());
          if(!v429)return;
          var v430=$(v429);
          if(!v430||!v430.length)return;
          currentRender=v430;
          var v431=v430.find(".full-start-new__buttons");
          v431.length&&(v431.addClass("buttons-loading"),setTimeout(function() {
            try {
              applyAll(v430);
              var v432=v430.find(".full-start__button");
              v432.off("hover:long").on("hover:long",function() {
                openEditor(v430);
              });
            }
            catch(v433) {}
          },100),setTimeout(function() {
            try {
              applyAll(v430,true),v431.removeClass("buttons-loading");
            }
            catch(v434) {
              v431.removeClass("buttons-loading");
            }
            
          },400));
        }
        
      });
    }
    
    function start() {
      Lampa.Manifest.plugins=manifest,init();
    }
    
    function bootstrap() {
      window.plugin_card_buttons_editor_ready=true,window.appready?start():Lampa.Listener.follow("app",function(v435) {
        if(v435.type==="ready")start();
      });
    }
    !window.plugin_card_buttons_editor_ready&&bootstrap();
  }());
})();
