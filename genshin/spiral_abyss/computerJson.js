var April_1st = 0

var anniversary_show = 0
var cur_time_0 = Date.now()
//if ((cur_time_0 >= 1753930800000) && (cur_time_0 <= 1755165600000)) anniversary_show = 1

var computer_ = {
    "TextColorConfig": {
        "Fire": "#FF0000",
        "Water": "#0070C0",
        "Elec": "#7030A0",
        "Ice": "#00B0F0",
        "Grass": "#70AD47",
        "Wind": "#00B050",
        "Rock": "#D4A000",
        "Wood": "#D4A000",
        "Pink": "#FF66FF",
        "Grey": "#808080",
        "None": "#000000",
    },
    "TextColorLightConfig": {
        "Fire": "#FF9999",
        "Water": "#80C0FF",
        "Elec": "#FFACFF",
        "Ice": "#99FFFF",
        "Grass": "#99FF88",
        "Wind": "#80FFD7",
        "Rock": "#FFE699",
        "Wood": "#FFE699",
        "Pink": "#FF66FF",
        "Grey": "#808080",
        "None": "#eeeeee",
    },
}

var cookie_lang = "EN"
document.cookie.split(";").forEach(function (c) {
    if ((c.includes('lang=')) && !(c.includes('session'))) {
        cookie_lang = c.substring(c.indexOf('lang=') + 5, c.indexOf('lang=') + 7)
    }
});
var AVAILABLE_LANG = ["CH", "EN", "RU", "JP", "KR"]
var is_ru = 0
var param_lang = $('#LANG').val().toUpperCase()
if (param_lang == "ES") param_lang = "SP"
var store_lang = param_lang
if (!AVAILABLE_LANG.includes(store_lang)) {
    store_lang = "CH"
}
var lang3 = "CH"
if (param_lang) {
    var DATE = new Date()
    document.cookie = 'lang=' + store_lang + ';expires=' + new Date(DATE.getTime() + 8640000000).toUTCString() + ';path=/'
    lang3 = store_lang
} else {
    lang3 = cookie_lang
}
var lang2 = lang3
if ((lang2 != "CH") && (lang2 != "EN") && (lang2 != "RU")) lang2 = "EN"
var lang = lang2
if (lang == "RU") lang = "EN"

if (lang == 'EN') { $('body').css('font-family', "'Segoe UI', 'Arial', sans-serif") }
else { $('body').css('font-family', "'Microsoft YaHei', sans-serif") }

$('body').on('click', '._menu_', function () {
    poplayer({
        header: '<color style=\'color:#fff\'>HomDGCat</color>',
        class: 'yuhengcup',
        width: '95%',
        template: [
            {
                h3: computer_.MiscText.Title[lang],
                style: {
                    color: '#27363E',
                    'margin-top': '15px',
                    'margin-bottom': '45px',
                    'font-size': '40px',
                    'cursor': 'pointer',
                },
                event: {
                    click: function () {
                        window.location.href = '/home'
                    }
                }
            },
            {
                section: [
                    {
                        schedule: {
                            a: '/',
                            t: {
                                span: links.Head[0][lang2],
                                style: {
                                    'font-size': (lang == 'CH') ? '16px' : '15px',
                                    'margin': 'auto'
                                }
                            },
                        },
                        style: {
                            'border': '1.6px solid #7030A0'
                        }
                    },
                    {
                        schedule: {
                            span: links.Head[1][lang2],
                            style: {
                                'font-size': '16px',
                                'margin': 'auto'
                            }
                        },
                        event: {
                            click: function (d) {
                                $('.menu_GI').show()
                                $('.menu_SR').hide()
                                $(d.sender).addClass('active')
                                $(d.sender).siblings().removeClass('active')
                            }
                        },
                        class: 'active'
                    },
                    {
                        schedule: {
                            span: links.Head[2][lang2],
                            style: {
                                'font-size': '16px',
                                'margin': 'auto'
                            }
                        },
                        event: {
                            click: function (d) {
                                $('.menu_GI').hide()
                                $('.menu_SR').show()
                                $(d.sender).addClass('active')
                                $(d.sender).siblings().removeClass('active')
                            }
                        }
                    },
                ],
                class: 'menu_CTRL',
                style: {
                    'margin-bottom': '30px'
                }
            },
            {
                section: [
                    {
                        schedule: {
                            a: '/gi/boss',
                            t: {
                                span: (lang == 'CH') ? '怪物解析' : 'Boss Guides',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },

                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                        },
                    },
                    {
                        schedule: {
                            a: '/gi/change',
                            t: {
                                span: (lang == 'CH') ? '改动汇总' : 'Track Updates',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },

                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                        },
                    },
                    {
                        schedule: {
                            a: '/gi/future',
                            t: {
                                span: (lang == 'CH') ? '未来情报' : 'Future Info',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },

                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                        },
                    },
                    {
                        schedule: {
                            a: '/gi/formulae',
                            t: {
                                span: '公式大全',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },
                        when: lang == 'CH',
                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                            'border-color': '#7030A0'
                        },
                    },
                    {
                        schedule: {
                            a: '/gi/readable',
                            t: {
                                span: (lang == 'CH') ? '阅读物搜索' : 'Readables Search',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },

                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                        },
                    },
                    {
                        schedule: {
                            a: '/gi/search',
                            t: {
                                span: (lang == 'CH') ? '文本搜索' : 'Text Search',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },

                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                        },
                    },
                ],
                class: 'menu_GI menu_GI_2',
                style: {
                    'margin-bottom': '10px',
                    'margin-top': '-13px',
                    'justify-content': 'center'
                }
            },
            {
                section: [
                    {
                        schedule: {
                            a: '/sr/boss',
                            t: {
                                span: (lang == 'CH') ? '怪物解析' : 'Boss Guides',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },

                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                        },
                    },
                    {
                        schedule: {
                            a: '/sr/change',
                            t: {
                                span: (lang == 'CH') ? '改动汇总' : 'Track Updates',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },

                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                        },
                    },
                    {
                        schedule: {
                            a: '/sr/future',
                            t: {
                                span: (lang == 'CH') ? '未来情报' : 'Future Info',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },

                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                        },
                    },
                    {
                        schedule: {
                            a: '/sr/anniversary',
                            t: {
                                span: (lang == 'CH') ? '云璃一周年' : 'Yunli 1st Anniversary',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },
                        when: anniversary_show,
                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                            'border-color': '#dd0000'
                        },
                    },
                    {
                        schedule: {
                            a: '/sr/formulae',
                            t: {
                                span: '公式大全',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },
                        when: lang == 'CH',
                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                            'border-color': '#7030A0'
                        },
                    },
                    {
                        schedule: {
                            a: '/sr/readable',
                            t: {
                                span: (lang == 'CH') ? '阅读物搜索' : 'Readables Search',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },

                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                        },
                    },
                    {
                        schedule: {
                            a: '/sr/search',
                            t: {
                                span: (lang == 'CH') ? '文本+对话搜索' : 'Text+Dialogue Search',
                                style: {
                                    'margin': 'auto',
                                    'font-weight': 'bold',
                                },
                                class: 'panel'
                            },
                            class: 'panel'
                        },

                        class: 'hover-shadow panelw',
                        style: {
                            width: 'max-content',
                        },
                    },
                ],
                class: 'menu_SR menu_SR_2',
                style: {
                    'margin-bottom': '10px',
                    'margin-top': '-13px',
                    'justify-content': 'center'
                }
            },
            {
                section: function (g) {
                    links.GI.forEach(function (j) {
                        $(g.container).render({
                            template: {
                                schedule: {
                                    a: j.Link,
                                    t: {
                                        span: j.Name[lang2],
                                        style: {
                                            'font-size': '19px',
                                            'margin': 'auto'
                                        }
                                    }
                                },
                                class: 'hover-shadow'
                            }
                        })
                    })
                },
                class: 'menu_GI'
            },
            {
                section: function (g) {
                    links.SR.forEach(function (j) {
                        $(g.container).render({
                            template: {
                                schedule: {
                                    a: j.Link,
                                    t: {
                                        span: j.Name[lang],
                                        style: {
                                            'font-size': '19px',
                                            'margin': 'auto'
                                        }
                                    }
                                },
                                class: 'hover-shadow'
                            }
                        })
                    })
                },
                class: 'menu_SR'
            }
        ]
    })
    $('.menu_SR').hide()
})

var Loading_Template = {
    template: {
        div: {
            div: [
                {
                    img: $('#IMGPRE').val() + 'images/load.jpg',
                    height: '120px'
                },
                {
                    p: lang == 'CH' ? '加载中' : 'Loading'
                }
            ]
        },
        class: 'lt',
        a: {
            id: "_LT"
        }
    }
}

$('body').render(Loading_Template)
$('.lt').hide()

$('body').on('click', '.lt', function () {
    $('.lt').hide()
})

var IS_TWT = 0

var SHOW_LANG = 0
$('body').on('click', '._translate_', function () {
    SHOW_LANG = 1 - SHOW_LANG
    if (SHOW_LANG) {
        $('h3 .tlsub').show()
    } else {
        $('h3 .tlsub').hide()
    }
})

init_title_save = ''
function init_title(ttl) {
    document.title = ttl
    init_title_save = ttl
}

function switch_title(new_add) {
    document.title = new_add + ' ' + init_title_save
}

function a_section_white() {
    $("head").append('<style type="text/css"></style>');
    var newStyleElement = $("head").children(':last');
    newStyleElement.html('.a_section{color:white!important} .a_section_small{color:white!important} .battle_desc{color:white!important} .battle_stat{color:white!important} .card{color:white!important} .card_2{color:white!important}');
}

function custom_string(k, text_color) {
    if (typeof k == 'string') {
        return k.replaceAll("#", "</color>").replaceAll("@", `<color style='color:#${text_color}'>`).replaceAll("$", "#")
    }
    var out_ = (k.Name ? ('@<b>' + k.Name + '</b>#') : '') + (k.Title ? ('@<b>' + k.Title + '</b>#') : '') + (k.TitleWhite ? ('<b>' + k.TitleWhite + '</b>') : '')
    if (k.Desc) out_ += '<br>' + k.Desc
    if (k.DescList) out_ += '<br>' + k.DescList.join('<br>')
    if (out_.substring(0, 4) == '<br>') out_ = out_.substring(4)
    return out_.replaceAll("#", "</color>").replaceAll("@", `<color style='color:#${text_color}'>`).replaceAll("$", "#")
}

var bg_name = 'bg'
if ($('#NOLAZY').val()) {
    bg_name = 'bg_2'
    $('html').css('overflow-y', 'scroll')
    $('html').css('scrollbar-width', 'none')
}
