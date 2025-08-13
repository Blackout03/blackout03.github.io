$(function () {

    var imgpre = $('#IMGPRE').val()
    var lazy = $('#NOLAZY').val() ? '' : 'lazy'
    var moreless = 0
    var hp_coeff_cache = {}
    var hp_coeff_single_cache = 0
    var cur_schedule_ver = ""
    var cur_schedule_name = ""
    var cur_schedule_id = ""
    var cur_real = 0
    var UI = 0
    //if (lang == 'CH' && window.innerWidth > 960) UI = 1
    var cur_floor_index = 0
    var showtop = 1
    var show_arena = 0

    var Floors = []
    var _h = $('#_H_').val()

    var did_2_load = 0
    var f_ind = 3
    var hp_coeff_cache_show_and_link = 0

    let script_computer = document.createElement('script')
    script_computer.src = 'https://homdgcat.wiki/gi/EN/database.js'
    document.head.append(script_computer)
    script_computer.onload = begin1

    function begin1() {

        let script_computer_2 = document.createElement('script')
        script_computer_2.src = 'https://homdgcat.wiki/gi/EN/database_extra.js'
        document.head.append(script_computer_2)
        script_computer_2.onload = function () {
            _SpiralAbyssFloorConfig = {..._SpiralAbyssFloorConfig, ..._SpiralAbyssFloorConfig_2}
            did_2_load = 1
        }

        DPSDict = dpsdict(_SpiralAbyssDPSData)
        currentSpiralAbyss = _SpiralAbyssSchedule[0].Name;
        var non_break = 1;
        var now;
        for (var i_ = 1; non_break && i_ <= _SpiralAbyssSchedule.length; i_++) {
            now = _SpiralAbyssSchedule[_SpiralAbyssSchedule.length - i_];
            if ((now.Generation != 99) && (!now.Hidden)) {
                currentSpiralAbyss = now.Name;
                currentGeneration = now.Generation
                non_break = 0;
            }
        }
        if (_h) {
            non_break = 1;
            for (var i_ = 1; non_break && i_ <= _SpiralAbyssSchedule.length; i_++) {
                now = _SpiralAbyssSchedule[_SpiralAbyssSchedule.length - i_];
                if (now.Name.includes(_h)) {
                    currentSpiralAbyss = now.Name;
                    currentGeneration = now.Generation
                    non_break = 0;
                    break
                }
            }
        }
        V_OPTIONS = {
            'CH': ['正式服', '测试服v1', '测试服v2', '测试服v3', '测试服v4', '测试服v5', '测试服v6', '惊喜'],
            'EN': ['Live', 'Beta v1', 'Beta v2', 'Beta v3', 'Beta v4', 'Beta v5', 'Beta v6', 'Surprise']
        }

        $('container').render({
            template: [{
                div: [{
                    section: function (d) {
                        $(d.container).render({
                            data: _computer_.SpiralAbyssGenerationConfig,
                            template: {
                                schedule: function (p) {
                                    return p.data.Name
                                },
                                a: {
                                    class: function (d) {
                                        return d.data._id === currentGeneration ? 'activeg' : ''
                                    },
                                    'data-id': function (d) {
                                        return d.data._id
                                    },
                                }
                            }
                        })
                    },
                    class: 'generation'
                }, {
                    section: function (b) {
                        $(b.container).render({
                            data: _SpiralAbyssSchedule,
                            template: {
                                schedule: function (d) {
                                    if (d.data.Show) return d.data.Show.replace('惊喜 ', '').replace('Surprise ', '')
                                    return d.data.Name ? d.data.Name : VER_GI
                                },
                                a: {
                                    class: function (d) {
                                        gen = d.data.Generation
                                        return d.data.Name === currentSpiralAbyss ? 'active' + ' gg g' + gen : 'gg g' + gen
                                    },
                                    'data-json': function (d) {
                                        return JSON.stringify(d.data)
                                    },
                                    'data-gen': function (d) {
                                        return d.data.Generation
                                    },
                                    style: function (d) {
                                        var dsp = d.data.Generation == currentGeneration ? '' : 'none'
                                        return 'display:' + dsp + ";"
                                    }
                                }
                            }
                        })
                    },
                    class: 'schedule'
                }, {
                    section: renderResultPre,
                    class: 'result'
                }],
                class: 'content'
            }]
        })

        if ($('#_H_').val() == '1') {
            $('.scroller').css('overflow-x', 'scroll !important')
            $('.scroller').css('width', 'calc(100%)')
            $('.result').addClass('result_')
            $('.content').css('padding-left', '0')
            $('.content').css('padding-right', '0')
            $('.p_b').addClass('p_b_')
            $('h3 .tlsub').html(computer_.MiscText.Translate_)
        }

        if (!lazy) {
            $('body').addClass('bg_3')
            a_section_white()
        } else {
            $('body').addClass('bg')
        }

    }

    $(document).on('click', '.schedule schedule', function () {
        var _this = $(this);
        if (_this.hasClass('active')) {
            return;
        }
        _this.addClass('active').siblings('schedule').removeClass('active');
        renderFloor_Intro()
    })

    $(document).on('click', '.v_l', function () {
        var _this = $('schedule.active').prev()
        _this.siblings('schedule').removeClass('active')
        _this.addClass('active')
        renderFloor_Intro()
    })

    $(document).on('click', '.v_r', function () {
        var _this = $('schedule.active').next()
        _this.siblings('schedule').removeClass('active')
        _this.addClass('active')
        renderFloor_Intro()
    })

    function renderFloor_Intro() {
        var _this_generation = parseInt($(this).attr('data-gen'))
        if (_this_generation > 3 && _this_generation < 99) {
            renderResultPre()
        } else {
            if (did_2_load) {
                renderResultPre()
            } else {
                $('.lt').show()
                var gu = setInterval(function () {
                    if (did_2_load) {
                        $('.lt').hide()
                        clearInterval(gu)
                        renderResultPre()
                    }
                }, 200)
            }
        }
    }

    $(document).on('click', '.generation schedule', function () {
        var _this = $(this);
        if (_this.hasClass('activeg')) {
            return;
        }
        _this.addClass('activeg').siblings('schedule').removeClass('activeg');
        sVersion(_this.attr('data-id'))
    })

    function sVersion(generation) {
        $('.gg').hide();
        $('.g' + generation).show()
    }

    function renderResultPre() {

        var sData = JSON.parse($('schedule.active').attr('data-json'));
        cur_schedule_ver = sData.Name
        cur_schedule_name = sData.Show ? (sData.Show ? sData.Show : cur_schedule_ver) : cur_schedule_ver
        cur_schedule_id = sData.Generation
        cur_real = sData.Real
        var Phases = sData.Phases;
        var Blessings = sData.Blessings;
        Floors = sData.Floors
        var Download = sData.Download;
        if (_coeff_override[cur_schedule_ver]) {
            for (const l in _coeff_override[cur_schedule_ver]) {
                hp_coeff_cache[sData.Floors[l]] = _coeff_override[cur_schedule_ver][l]
            }
        }
        var p_b = [];
        Phases.forEach(function (item, i) {
            var a = {
                p_name: '',
                b: _SpiralAbyssBlessingConfig[Blessings[i]]
            }
            if (!_SpiralAbyssBlessingConfig[Blessings[i]]) return
            if (a.b.ShockWaveConfig && a.b.ShockWaveConfig.length) {
                var a_f = [
                    {
                        "Chambers": [
                            {
                                "Name": "9-1",
                                "Level": 72
                            },
                            {
                                "Name": "9-2",
                                "Level": 74
                            },
                            {
                                "Name": "9-3",
                                "Level": 76
                            }
                        ]
                    },
                    {
                        "Chambers": [
                            {
                                "Name": "10-1",
                                "Level": 80
                            },
                            {
                                "Name": "10-2",
                                "Level": 82
                            },
                            {
                                "Name": "10-3",
                                "Level": 85
                            }
                        ]
                    },
                    {
                        "Chambers": [
                            {
                                "Name": "11-1",
                                "Level": 88
                            },
                            {
                                "Name": "11-2",
                                "Level": 90
                            },
                            {
                                "Name": "11-3",
                                "Level": 92
                            }
                        ]
                    },
                    {
                        "Chambers": [
                            {
                                "Name": "12-1",
                                "Level": 95
                            },
                            {
                                "Name": "12-2",
                                "Level": 98
                            },
                            {
                                "Name": "12-3",
                                "Level": 100
                            }
                        ]
                    }
                ]
                a.b.ShockWaveConfig.forEach(function (item) {
                    item.a_f = a_f;
                })
            }
            p_b.push(a)
        })
        $('.result').empty().render({
            template: [
                {
                    h4: [
                        {
                            div: [
                                {
                                    div: '◁',
                                    class: 'v_l'
                                },
                                {
                                    div: [
                                        {
                                            p: function (t) {
                                                var ret_ = sData.Show ? sData.Show : sData.Name
                                                switch_title(ret_ ? ret_ : VER_GI)
                                                return ret_ ? ret_ : VER_GI
                                            },
                                            class: 'ver_text_name'
                                        },
                                        {
                                            p: sData.OpenTime,
                                            class: 'ver_text_time'
                                        }
                                    ],
                                    class: 'ver_text hover-shadow showtop_2'
                                },
                                {
                                    div: {
                                        p: '▷'
                                    },
                                    class: 'v_r'
                                }
                            ],
                            class: 'ver'
                        },
                        {
                            div: "<color style='color:#0066ff'>" + ((lang == 'CH') ? '下载图片' : 'Download Image') + '</color>',
                            class: 'level_ dl_button hover-shadow'
                        },
                        {
                            p: [
                                {
                                    span: '◁',
                                    class: 'f_l'
                                },
                                {
                                    span: (mod(f_ind, 4) + 9).toString(),
                                    class: 'f_o'
                                },
                                {
                                    span: '▷',
                                    class: 'f_r'
                                }
                            ],
                            style: {
                                'margin-top': '10px'
                            }
                        },
                    ]
                },
                {
                    section: '',
                    class: 'a_floor'
                },
                {
                    section: function (d) {
                        $(d.container).render({
                            data: p_b,
                            template: {
                                div: [{
                                    p: `<b>[[b/Name]]</p>`
                                }, {
                                    p: `[[b/Desc]]`
                                }, {
                                    ul: {
                                        li: [{
                                            p: `[[ShockWaveDesc]]`
                                        }, {
                                            ul: {
                                                li: {
                                                    span: ['[[Name]] ', {
                                                        em: 0,
                                                        style: {
                                                            color: '#0000FF'
                                                        }
                                                    }],
                                                    a: { 'data-level': '[[Level]]' },
                                                    datapath: 'Chambers',
                                                },
                                                datapath: 'a_f',
                                                when: function (d) {
                                                    return d.data.a_f && d.data.a_f.length
                                                }
                                            },
                                            a: { 'data-ra': '[[ShockWaveDMG]]' },
                                            class: 's_w_f'
                                        }],
                                        datapath: 'b/ShockWaveConfig',
                                    },
                                    class: 'p_b_ul',
                                    when: function (d) {
                                        return d.data.b.ShockWaveConfig && d.data.b.ShockWaveConfig.length
                                    }
                                }]
                            }
                        })
                    },
                    class: 'p_b'
                },
                {
                    section: function (d) {
                        var SpiralAbyssDPSDatas = _SpiralAbyssDPSData;
                        for (var i = 0; i < SpiralAbyssDPSDatas.length; i++) {
                            $(d.container).render({
                                template: {
                                    div: function (d) {
                                        var chartDom = d.container;
                                        var myChart = echarts.init(chartDom);
                                        var SpiralAbyssDPSData = SpiralAbyssDPSDatas[i];
                                        var label_array = [];
                                        var value_array = [];
                                        for (var j = 0; j < SpiralAbyssDPSData.Data.length; j++) {
                                            label_array.push(SpiralAbyssDPSData.Data[j].Ver)
                                            value_array.push(dps(SpiralAbyssDPSData.Chamber, SpiralAbyssDPSData.Data[j].DPS, SpiralAbyssDPSData.Data[j].Ver))
                                        }
                                        var option = {
                                            title: {
                                                text: SpiralAbyssDPSData.Title,
                                                subtext: SpiralAbyssDPSData.SubTitle,
                                                left: 'center',
                                                textStyle: {
                                                    color: '#000'
                                                },
                                                subtextStyle: {
                                                    color: '#2545ba'
                                                },
                                                top: '8%'
                                            },
                                            toolbox: {
                                                feature: {
                                                    saveAsImage: {}
                                                },
                                                right: '75%',
                                                top: '10%'
                                            },
                                            tooltip: {
                                                trigger: 'axis'
                                            },
                                            xAxis: {
                                                data: label_array,
                                                axisLabel: {
                                                    interval: 0,
                                                    rotate: 40
                                                }
                                            },
                                            yAxis: {},
                                            series: [
                                                {
                                                    type: "line",
                                                    data: value_array,
                                                    color: SpiralAbyssDPSData.Color,
                                                }
                                            ],
                                            grid: {
                                                top: '26%',
                                            },
                                        }
                                        myChart.setOption(option);
                                    },
                                    class: 'eachets'
                                }
                            })
                        }
                    },
                    class: 'p_h',
                    when: 0
                },
                {
                    section: function (d) {
                        var SpiralAbyssDPSDatas = _SpiralAbyssDPSData;
                        var value_array_list = []
                        var color_list = []
                        for (var i = 0; i < SpiralAbyssDPSDatas.length; i++) {
                            var SpiralAbyssDPSData = SpiralAbyssDPSDatas[i];
                            var label_array = [];
                            var value_array = [];
                            for (var j = 0; j < SpiralAbyssDPSData.Data.length; j++) {
                                label_array.push(SpiralAbyssDPSData.Data[j].Ver)
                                value_array.push(dps(SpiralAbyssDPSData.Chamber, SpiralAbyssDPSData.Data[j].DPS, SpiralAbyssDPSData.Data[j].Ver))
                            }
                            value_array_list.push(value_array)
                            color_list.push(SpiralAbyssDPSData.Color)
                        }
                        $(d.container).render({
                            template: {
                                div: function (d) {
                                    var chartDom = d.container;
                                    var myChart = echarts.init(chartDom);
                                    var option = {
                                        title: {
                                            text: {
                                                CH: '深境螺旋血量演化',
                                                EN: 'Spiral Abyss HP Trend',
                                            }[lang],
                                            subtext: SpiralAbyssDPSData.SubTitle,
                                            left: 'center',
                                            textStyle: {
                                                color: '#000'
                                            },
                                            subtextStyle: {
                                                color: '#2545ba'
                                            },
                                            top: '8%'
                                        },
                                        toolbox: {
                                            feature: {
                                                saveAsImage: {}
                                            },
                                            right: '75%',
                                            top: '10%'
                                        },
                                        legend: {
                                            data: ['12-1', '12-2', '12-3'],
                                            top: '20%'
                                        },
                                        tooltip: {
                                            trigger: 'axis'
                                        },
                                        xAxis: {
                                            data: label_array,
                                            axisLabel: {
                                                interval: 0,
                                                rotate: 40
                                            }
                                        },
                                        yAxis: {},
                                        series: [
                                            {
                                                name: '12-1',
                                                type: "line",
                                                data: value_array_list[2],
                                                color: color_list[2],
                                            },
                                            {
                                                name: '12-2',
                                                type: "line",
                                                data: value_array_list[1],
                                                color: color_list[1],
                                            },
                                            {
                                                name: '12-3',
                                                type: "line",
                                                data: value_array_list[0],
                                                color: color_list[0],
                                            },
                                        ],
                                        grid: {
                                            top: '26%',
                                        },
                                    }
                                    myChart.setOption(option);
                                },
                                class: 'eachets'
                            }
                        })
                    },
                    class: 'p_h'
                }
            ]
        })
        $('.hp_coeff').hide()

        renderFloorPre(Floors[mod(f_ind, 4)])

        $('.s_w_f').find('li span').each(function (i, item) {
            var ra = $(item).parents('.s_w_f').attr('data-ra');
            var Level = $(item).attr('data-level');
            $(item).find('em').text(Math.floor(Number(ra) * _computer_.LevelCurves[Level]['5']))
        })
    }

    $('body').on('click', '.dl_button', function () {
        var use_lang = (lang == 'CH') ? 'CH' : 'EN'
        var spiral_abyss_name = (lang == 'CH') ? '渊月螺旋' : 'Abyss'
        $('.temp').remove()
        $('.content').render({
            a: `https://homdgcat.wiki/Abyss/${use_lang}/${cur_schedule_ver}.png`,
            attr: {
                download: `${cur_schedule_ver} ${spiral_abyss_name}.png`
            },
            style: {
                display: 'none'
            },
            t: {
                p: 'temp'
            },
            class: 'temp'
        })
        $('.temp p').click()
        //window.location.href = `/Abyss/${use_lang}/${cur_schedule_ver}.png`
    })

    $('body').on('click', '.f_l', function () {
        f_ind -= 1
        renderFloorPre(Floors[mod(f_ind, 4)])
    })

    $('body').on('click', '.f_r', function () {
        f_ind += 1
        renderFloorPre(Floors[mod(f_ind, 4)])
    })

    function mod(n, m) {
        return ((n % m) + m) % m
    }

    function renderFloorPre(index) {
        $('.f_o').html(mod(f_ind, 4) + 9)
        $('.lt').hide()
        cur_floor_index = index
        hp_coeff_single_cache = hp_coeff_cache[cur_floor_index]
        showdps = 1
        cur_floor_showver = _SpiralAbyssFloorConfig[index].ShowVers ? _SpiralAbyssFloorConfig[index].ShowVers : [0]
        show_vops = {}
        for (var j = 0; j < cur_floor_showver.length; j++) {
            show_vops[V_OPTIONS[lang][cur_floor_showver[j]]] = cur_floor_showver[j]
        }
        if (Math.min(...cur_floor_showver)) {
            selected = Math.max(...cur_floor_showver)
        } else {
            selected = 0
        }
        select_value = selected
        $('.a_floor').empty()
        if (_SpiralAbyssFloorConfig[index].Auto) {
            $('.a_floor').render({
                data: _SpiralAbyssFloorConfig[index],
                template: [
                    {
                        h5: function (f) {
                            return f.data.Disorder.replaceAll('• ', '')
                        },
                        style: {
                            'font-weight': 'normal'
                        }
                    },
                    {
                        p: '',
                        class: 'hp_coeff'
                    },
                    {
                        ul: function (f) {
                            f.data.Chambers.forEach(function (ddd) {
                                $(f.container).render({
                                    data: ddd,
                                    template: {
                                        li: [
                                            {
                                                h6: [
                                                    {
                                                        p: ['[[Name]] Lv[[Level]]'],
                                                        class: 'level_'
                                                    },
                                                    {
                                                        div: {
                                                            div: '',
                                                            class: 'emote_'
                                                        },
                                                        style: {
                                                            display: 'flex',
                                                            'justify-content': 'center',
                                                            'margin-top': '5px',
                                                            'margin-bottom': '-5px'
                                                        }
                                                    }
                                                ],
                                                a: {
                                                    'data-name': '[[Name]]'
                                                },
                                                style: {
                                                    'margin-top': '5px',
                                                    'margin-bottom': '15px'
                                                }
                                            },
                                            {
                                                div: [
                                                    {
                                                        div: [
                                                            function (h) {
                                                                $(h.container).render(Floor_Render(h.data.Name, h.data.Upper, h.data.UpperCount))
                                                            },
                                                            {
                                                                div: function (p) {
                                                                    generate_boss_guide(p, ddd.UpperGuide)
                                                                },
                                                                class: 'bossguide',
                                                                when: ddd.UpperGuide && ddd.UpperGuide.length
                                                            }
                                                        ],
                                                        class: 'upper'
                                                    },
                                                    {
                                                        div: [
                                                            function (h) {
                                                                $(h.container).render(Floor_Render(h.data.Name, h.data.Lower, h.data.LowerCount))
                                                            },
                                                            {
                                                                div: function (p) {
                                                                    generate_boss_guide(p, ddd.LowerGuide)
                                                                },
                                                                class: 'bossguide',
                                                                when: ddd.LowerGuide && ddd.LowerGuide.length
                                                            }
                                                        ],
                                                        class: 'lower'
                                                    }
                                                ],
                                                class: 'up_low',
                                            }
                                        ]
                                    }
                                })
                            })
                        }
                    }
                ]
            })
            $('.ui_parent').remove()
        } else {
            $('.a_floor').render({
                data: _SpiralAbyssFloorConfig[index],
                template: [{
                    h5: function (f) {
                        return f.data.Disorder.replaceAll('• ', '')
                    },
                    style: {
                        'font-weight': 'normal'
                    }
                },
                    {
                        p: '',
                        class: 'hp_coeff'
                    },{
                        ul: function (f) {
                            f.data.Chambers.forEach(function (ddd) {
                                trigger_hp_coeff(ddd.Name)
                                $(f.container).render({
                                    data: ddd,
                                    template: {
                                        li: [{
                                            h6: [{
                                                p: ['[[Name]] Lv[[Level]]', function (d) {
                                                    return _computer_.SpiralAbyssGoalTypeTemplateConfig[d.data.GoalType][lang]
                                                }],
                                                class: 'more level_'
                                            }, {
                                                p: '[[Name]]',
                                                class: 'less',
                                                style: {
                                                    display: 'none',
                                                    'font-size': '22px',
                                                }
                                            }, {
                                                div: dps_show_container_(),
                                                class: 'dps_show_container',
                                            }],
                                            a: {
                                                'data-name': '[[Name]]'
                                            }
                                        }, {
                                            div: [
                                                {
                                                    div: '',
                                                    class: 'emote_'
                                                },
                                                {
                                                    select: '',
                                                    options: show_vops,
                                                    style: {
                                                        'text-align': 'center',
                                                        width: '100px'
                                                    },
                                                    class: 'version-choose',
                                                },
                                                {
                                                    div: '',
                                                    class: 'emote_'
                                                },
                                            ],
                                            class: 'a_floor_button',
                                            when: cur_schedule_id != 99
                                        }, {
                                            div: [{
                                                div: [
                                                    function (p) {
                                                        var ver_list = p.data.GadgetVers;
                                                        if (!ver_list) {
                                                            var this_class = 'u_l_g'
                                                        } else {
                                                            var this_class = 'u_l_g sw'
                                                            for (var j = 0; j < ver_list.length; j++) {
                                                                this_class += (' sw-' + ver_list[j].toString())
                                                            }
                                                        }
                                                        $(p.container).render({
                                                            div: {
                                                                style: {
                                                                    'font-weight': function (d) {
                                                                        return _SpiralAbyssGadgetDescConfig[d.data.Gadgets[0]].Show.Bold ? 600 : 500
                                                                    },
                                                                    color: function (d) {
                                                                        var color = _SpiralAbyssGadgetDescConfig[d.data.Gadgets[0]].Show.Color || '';
                                                                        return computer_.TextColorConfig[color];
                                                                    },
                                                                    display: 'table',
                                                                    margin: 'auto',
                                                                }
                                                            },
                                                            when: function (d) {
                                                                return d.data.Gadgets && d.data.Gadgets.length && d.data.Gadgets[0]
                                                            },
                                                            click: function (d) {
                                                                var hover = _SpiralAbyssGadgetDescConfig[d.org_data.Gadgets[0]].Hover
                                                                if (!hover) {
                                                                    return;
                                                                }
                                                            },
                                                            class: this_class,
                                                            style: {
                                                                'padding-left': '0px',
                                                                'padding-right': '0px'
                                                            }
                                                        });
                                                    },
                                                    {
                                                        div: {
                                                            div: function (p) {
                                                                var weav = _SpiralAbyssWaveDescConfig[p.data.WaveDesc];
                                                                if (!weav) {
                                                                    var _mon_ = p.data.Monsters[0]
                                                                    var _name = ''
                                                                    var _color = _Monsters[_mon_.ID] ? (_Monsters[_mon_.ID].Color ? computer_.TextColorConfig[_Monsters[_mon_.ID].Color] : '#666') : '#666'
                                                                    if (_mon_.Name) {
                                                                        _name = `<color style="color:${_color};"><b>` + _mon_.Name + '</b></color>'
                                                                    } else if (_Monsters[_mon_.ID] && _Monsters[_mon_.ID].UseCustomColorName) {
                                                                        _name = '<b>' + _MonsterCustomColorNameConfig[_mon_.ID].Name + '</b>'
                                                                    } else {
                                                                        _name = `<color style="color:${_color};"><b>` + (_Monsters[_mon_.ID] ? _Monsters[_mon_.ID].Name : '???') + '</b></color>'
                                                                    }
                                                                    if (p.data.Monsters.length == 1) {
                                                                        weav = {
                                                                            Show: {
                                                                                Text: _name
                                                                            },
                                                                            Hover: _name
                                                                        }
                                                                    } else {
                                                                        weav = {
                                                                            Show: {
                                                                                Text: ''
                                                                            },
                                                                            Hover: '_name'
                                                                        }
                                                                    }
                                                                }
                                                                var extraDesc = p.data.ExtraDesc && p.data.ExtraDesc;
                                                                var monsters = p.data.Monsters;
                                                                var ver_list = p.data.Vers;
                                                                if (!ver_list) {
                                                                    var this_class = ''
                                                                } else {
                                                                    var this_class = 'sw'
                                                                    for (var j = 0; j < ver_list.length; j++) {
                                                                        this_class += (' sw-' + ver_list[j].toString())
                                                                    }
                                                                }
                                                                var has_arena = false
                                                                if ((ddd.Center != undefined) && !p.data.NoArena) {
                                                                    has_arena = true
                                                                }
                                                                $(p.container).render({
                                                                    data: { monsters: monsters },
                                                                    template: [{
                                                                        div: [{
                                                                            span: [weav.Show.Text, {
                                                                                i: weav.Hover && weav.Hover,
                                                                                when: function () {
                                                                                    return weav.Hover && weav.Hover
                                                                                },
                                                                                width: '240px',
                                                                                style: {
                                                                                    left: 'calc(50% - 120px)',
                                                                                    bottom: 'calc(100% + 5px)'
                                                                                }
                                                                            }],
                                                                            class: 'weav_hover',
                                                                            style: {
                                                                                display: 'table',
                                                                                margin: '0px auto 8px',
                                                                                padding: '0px 20px',
                                                                                'text-align': 'center'
                                                                            }
                                                                        }, {
                                                                            span: extraDesc,
                                                                            when: function () {
                                                                                return extraDesc
                                                                            },
                                                                            style: {
                                                                                color: '#808080',
                                                                                "font-size": '12px',
                                                                                display: 'table',
                                                                                margin: 'auto'
                                                                            }
                                                                        }],
                                                                        class: this_class,
                                                                        style: {
                                                                            'padding-top': '10px'
                                                                        },
                                                                    }].concat(monMon(this_class, ddd.Center, p.data.Center, has_arena, monsters))
                                                                })
                                                            },
                                                            datapath: 'Upper',
                                                            a: {
                                                                class: function (b) {
                                                                    var ver_list = b.data.Vers;
                                                                    if (!ver_list) {
                                                                        var this_class = ''
                                                                    } else {
                                                                        var this_class = 'sw'
                                                                        for (var j = 0; j < ver_list.length; j++) {
                                                                            this_class += (' sw-' + ver_list[j].toString())
                                                                        }
                                                                    }
                                                                    return 'individual '+ this_class
                                                                }
                                                            }
                                                        },
                                                        style: {
                                                            'padding-left': '0px',
                                                            'padding-right': '0px',
                                                            'padding-top': '15px',
                                                            'display': 'flex',
                                                            'justify-content': 'center',
                                                            'flex-wrap': 'wrap'
                                                        },
                                                        class: 'u_l_w',

                                                    },
                                                    {
                                                        div: function (p) {
                                                            generate_boss_guide(p, ddd.UpperGuide)
                                                        },
                                                        class: 'bossguide',
                                                        when: ddd.UpperGuide && ddd.UpperGuide.length
                                                    }
                                                ],
                                                class: 'upper'
                                            },
                                                {
                                                    div: [
                                                        function (p) {
                                                            var ver_list = p.data.GadgetVers;
                                                            if (!ver_list) {
                                                                var this_class = 'u_l_g'
                                                            } else {
                                                                var this_class = 'u_l_g sw'
                                                                for (var j = 0; j < ver_list.length; j++) {
                                                                    this_class += (' sw-' + ver_list[j].toString())
                                                                }
                                                            }
                                                            $(p.container).render({
                                                                div: {
                                                                    style: {
                                                                        'font-weight': function (d) {
                                                                            return _SpiralAbyssGadgetDescConfig[d.data.Gadgets[1]].Show.Bold ? 600 : 500
                                                                        },
                                                                        color: function (d) {
                                                                            var color = _SpiralAbyssGadgetDescConfig[d.data.Gadgets[1]].Show.Color || '';
                                                                            return computer_.TextColorConfig[color];
                                                                        },
                                                                        display: 'table',
                                                                        margin: 'auto',
                                                                    }
                                                                },
                                                                when: function (d) {
                                                                    return d.data.Gadgets && d.data.Gadgets.length && d.data.Gadgets[1]
                                                                },
                                                                click: function (d) {
                                                                    var hover = _SpiralAbyssGadgetDescConfig[d.org_data.Gadgets[1]].Hover
                                                                    if (!hover) {
                                                                        return;
                                                                    }
                                                                    poplayer({
                                                                        header: _SpiralAbyssGadgetDescConfig[d.org_data.Gadgets[1]].Show.Text,
                                                                        width: '50%',
                                                                        height: '400px',
                                                                        template: {
                                                                            div: "<span style='font-size:13px'><b>" + computer_.MiscText.Abyss_Show + "</b></span><br><br>" + hover
                                                                        },
                                                                        class: 'need_header'
                                                                    })
                                                                },
                                                                class: this_class,
                                                                style: {
                                                                    'padding-left': '0px',
                                                                    'padding-right': '0px'
                                                                }
                                                            });
                                                        },
                                                        {
                                                            div: {
                                                                div: function (p) {
                                                                    var weav = _SpiralAbyssWaveDescConfig[p.data.WaveDesc];
                                                                    if (!weav) {
                                                                        var _mon_ = p.data.Monsters[0]
                                                                        var _name = ''
                                                                        var _color = _Monsters[_mon_.ID] ? (_Monsters[_mon_.ID].Color ? computer_.TextColorConfig[_Monsters[_mon_.ID].Color] : '#666') : '#666'
                                                                        if (_mon_.Name) {
                                                                            _name = `<color style="color:${_color};"><b>` + _mon_.Name + '</b></color>'
                                                                        } else if (_Monsters[_mon_.ID] && _Monsters[_mon_.ID].UseCustomColorName) {
                                                                            _name = '<b>' + _MonsterCustomColorNameConfig[_mon_.ID].Name + '</b>'
                                                                        } else {
                                                                            _name = `<color style="color:${_color};"><b>` + (_Monsters[_mon_.ID] ? _Monsters[_mon_.ID].Name : '???') + '</b></color>'
                                                                        }
                                                                        if (p.data.Monsters.length == 1) {
                                                                            weav = {
                                                                                Show: {
                                                                                    Text: _name
                                                                                },
                                                                                Hover: _name
                                                                            }
                                                                        } else {
                                                                            weav = {
                                                                                Show: {
                                                                                    Text: ''
                                                                                },
                                                                                Hover: '_name'
                                                                            }
                                                                        }
                                                                    }
                                                                    var extraDesc = p.data.ExtraDesc && p.data.ExtraDesc;
                                                                    var monsters = p.data.Monsters;
                                                                    var ver_list = p.data.Vers;
                                                                    if (!ver_list) {
                                                                        var this_class = ''
                                                                    } else {
                                                                        var this_class = 'sw'
                                                                        for (var j = 0; j < ver_list.length; j++) {
                                                                            this_class += (' sw-' + ver_list[j].toString())
                                                                        }
                                                                    }
                                                                    var has_arena = false
                                                                    if ((ddd.Center != undefined) && !p.data.NoArena) {
                                                                        has_arena = true
                                                                    }
                                                                    $(p.container).render({
                                                                        data: { monsters: monsters },
                                                                        template: [{
                                                                            div: [{
                                                                                span: [weav.Show.Text, {
                                                                                    i: weav.Hover && weav.Hover,
                                                                                    when: function () {
                                                                                        return weav.Hover && weav.Hover
                                                                                    },
                                                                                    width: '240px',
                                                                                    style: {
                                                                                        left: 'calc(50% - 120px)',
                                                                                        bottom: 'calc(100% + 5px)'
                                                                                    }
                                                                                }],
                                                                                class: 'weav_hover',
                                                                                style: {
                                                                                    display: 'table',
                                                                                    margin: '0px auto 8px',
                                                                                    padding: '0px 20px',
                                                                                    'text-align': 'center'
                                                                                }
                                                                            }, {
                                                                                span: extraDesc,
                                                                                when: function () {
                                                                                    return extraDesc
                                                                                },
                                                                                style: {
                                                                                    'font-weight': function (d) {
                                                                                        return weav.Show.Bold ? 600 : 500
                                                                                    },
                                                                                    color: function (d) {
                                                                                        var color = weav.Show.Color;
                                                                                        return computer_.TextColorConfig[color] || '#808080';
                                                                                    },
                                                                                    "font-size": '12px',
                                                                                    display: 'table',
                                                                                    margin: 'auto'
                                                                                }
                                                                            }],
                                                                            class: this_class,
                                                                            style: {
                                                                                'padding-top': '10px'
                                                                            },
                                                                        }].concat(monMon(this_class, ddd.Center, p.data.Center, has_arena, monsters))
                                                                    })
                                                                },
                                                                datapath: 'Lower',
                                                                a: {
                                                                    class: function (b) {
                                                                        var ver_list = b.data.Vers;
                                                                        if (!ver_list) {
                                                                            var this_class = ''
                                                                        } else {
                                                                            var this_class = 'sw'
                                                                            for (var j = 0; j < ver_list.length; j++) {
                                                                                this_class += (' sw-' + ver_list[j].toString())
                                                                            }
                                                                        }
                                                                        return 'individual '+ this_class
                                                                    }
                                                                }
                                                            },
                                                            class: 'u_l_w',
                                                            style: {
                                                                'padding-left': '0px',
                                                                'padding-right': '0px',
                                                                'padding-top': '15px',
                                                                'display': 'flex',
                                                                'justify-content': 'center',
                                                                'flex-wrap': 'wrap'
                                                            }
                                                        },
                                                        {
                                                            div: function (p) {
                                                                generate_boss_guide(p, ddd.LowerGuide)
                                                            },
                                                            class: 'bossguide',
                                                            when: ddd.LowerGuide && ddd.LowerGuide.length
                                                        }
                                                    ],
                                                    class: 'lower'
                                                }
                                            ],
                                            class: 'up_low',
                                            when: UI % 2 == 0
                                        }]
                                    }
                                })
                            })
                        }
                    }]
            })
        }
        $('.a_floor').show();
        $('.p_b').show()
        $('.version-choose').val(selected);
        toggle_ver_instant(selected);
        rotate()
    }

    function generate_boss_guide(p, d) {
        d.forEach(function (i) {
            $(p.container).render({
                div: {
                    div: [
                        {
                            p: {
                                CH: '妮可少女的研究',
                                EN: `HomDGCat's Notes`
                            }[lang],
                            class: 'bossguide_p_b',
                            style: {
                                'text-align': 'center',
                                'font-weight': 'bold',
                            }
                        },
                        {
                            div: {
                                img: 'https://homdgcat.wiki/homdgcat-res/monster/' + _bossguide[i].Icon + '.png',
                                class: 'monster_left_img'
                            },
                            style: {
                                display: 'flex',
                                'justify-content': 'center',
                                margin: '6px 0 11px'
                            }
                        },
                        {
                            p: _bossguide[i].Name,
                            class: 'bossguide_p_b',
                            style: {
                                'text-align': 'center',
                                'font-weight': 'bold',
                            }
                        },
                        {
                            p: text_process(_bossguide[i].DescList.join('<br>')),
                            class: 'bossguide_p'
                        }
                    ],
                    class: 'a_section_content'
                },
                class: 'a_section',
                style: {
                    'margin-bottom': '8px'
                }
            })
        })
    }

    function text_process(t) {
        return t.replaceAll(`#`, `</color>`).replaceAll(`@`, `<color style='color:#FFD780'>`)
    }

    function Floor_Render(interval, Mons, MonCount_0) {
        var MonCount = MonCount_0
        var monsters_stuff = []
        trigger_hp_coeff(interval)
        if (!Mons.length) return []
        Mons.forEach(function (mid) {
            var monster = _Monsters[mid]
            var choose_icon = monster.Icon[Math.floor(Math.random() * monster.Icon.length)]
            var num = monster.HP * _computer_.LevelCurves[_SpiralAbyssFloorEntryToLevelCoeffConfig[interval].Level][monster.HPCurve] * (hp_coeff_single_cache || _SpiralAbyssFloorEntryToLevelCoeffConfig[interval].HPCoeff)
            var mon_hp = num.toFixed(0)
            monsters_stuff.push({
                a: '/gi/monster?lang=' + (lang3) + '&id=' + mid + '&level=' + _SpiralAbyssFloorEntryToLevelCoeffConfig[interval].Level + '&mul=' + hp_coeff_cache_show_and_link,
                t: [
                    {
                        div: {
                            img: 'https://homdgcat.wiki/homdgcat-res/monster/' + choose_icon + '.png',
                            class: 'monster_left_img'
                        },
                        class: 'monster_left'
                    },
                    {
                        div: [
                            {
                                p: mon_hp,
                                class: 'monster_hp',
                                style: {
                                    color: computer_.TextColorConfig[monster.Color] || ''
                                },
                            },
                            {
                                p: "Local Legend",
                                class: 'monster_hp',
                                style: {
                                    color: '#666'
                                },
                                when: _local_legends.includes(mid)
                            }
                        ],
                        class: 'monster_right'
                    }
                ],
                class: 'monster_card_2 hover-shadow',
            })
        })
        return [
            {
                p: computer_.MiscText.AbyssCount[lang].replace("#", MonCount),
                class: 'enemy_count',
                when: (MonCount != 1) && (MonCount != 0)
            },
            {
                p: _MonsterCustomColorNameConfig[Mons[0]] ? _MonsterCustomColorNameConfig[Mons[0]].Name : _Monsters[Mons[0]].Name,
                class: 'enemy_count',
                when: (MonCount == 1) || (Mons.length == 1),
                style: {
                    'font-weight': 'bold',
                    color: computer_.TextColorConfig[_Monsters[Mons[0]].Color] || '#666'
                }
            },
            {
                div: monsters_stuff,
                class: 'monsters_stuff'
            }
        ]
    }

    function trigger_hp_coeff(interval) {
        if (hp_coeff_single_cache) {
            $('.hp_coeff').html(`HP <color style="color:#cc0000">${(hp_coeff_single_cache * 100).toFixed(0)}%</color>`)
            hp_coeff_cache_show_and_link = hp_coeff_single_cache
        } else {
            $('.hp_coeff').html(`HP <color style="color:#cc0000">${(_SpiralAbyssFloorEntryToLevelCoeffConfig[interval].HPCoeff * 100).toFixed(0)}%</color>`)
            hp_coeff_cache_show_and_link = _SpiralAbyssFloorEntryToLevelCoeffConfig[interval].HPCoeff
        }
    }

    function toggle_ver_instant(select_value) {
        showdps = select_value == selected
        $('.dps_show_container').empty().each(function () {
            $(this).render(dps_show_container_())
        })
        select_class = '.sw-' + select_value.toString();
        $('.sw').hide();
        $(select_class).show();
        if (show_arena) {
            $('.arena').hide()
            $('.arena-' + select_value.toString()).show()
        }
    }

    function dpsdict(datas) {
        var out = {}
        datas.forEach(function (v) {
            if (v.Chamber) {
                out[v.Chamber] = {}
                v.Data.forEach(function (u) {
                    out[v.Chamber][u.Ver] = dps(v.Chamber, u.DPS, u.Ver)
                })
            }
        })
        return out
    }

    function dps_show_container_() {
        return {
            span: function (p) {
                var dps_num = ""
                if (p.data.DPS && p.data.DPS[select_value.toString()]) {
                    dps_num = dps(p.data.Name, p.data.DPS[select_value.toString()], cur_schedule_ver)
                } else if (DPSDict[p.data.Name] && DPSDict[p.data.Name][cur_schedule_ver]) {
                    dps_num = DPSDict[p.data.Name][cur_schedule_ver]
                }
                return "HP <color style='color:#cc0000;'><b>" + dps_num + "</b></color>"
            },
            style: {
                'display': 'block',
                'font-weight': '500',
            },
            class: 'dps-show',
            when: function (p) {
                return (p.data.DPS && p.data.DPS[select_value.toString()]) || (DPSDict[p.data.Name] && DPSDict[p.data.Name][cur_schedule_ver])
            }
        }
    }

    $("body").on("change", ".version-choose", function () {
        select_value = $(this).val();
        $('.version-choose').val(select_value);
        toggle_ver_instant(select_value)
    });

    $("body").on("mouseenter", ".u_l_g span,.affix_s_h,.weav_hover", function () {
        $(this).find("i").show();
    });
    $("body").on("mouseleave", ".u_l_g span,.affix_s_h,.weav_hover", function () {
        $(this).find("i").hide();
    });

    $("body").on("mouseenter", ".acc .monicon_container", function () {
        $(this).closest('.acc').find(".acc_hover").show();
    });
    $("body").on("mouseleave", ".acc .monicon_container", function () {
        $(this).closest('.acc').find(".acc_hover").hide();
    });

    $("body").on("mouseenter", ".affix_s_h", function () {
        $(this).parents('.acc').find("i").show();
    });
    $("body").on("mouseleave", ".affix_s_h", function () {
        $(this).parents('.acc').find("i").hide();
    });

    $("body").on("click", ".ui", function () {
        UI = 1 - UI
        if (cur_floor_index) renderFloorPre(cur_floor_index)
        $(".ui").html(computer_.MiscText.Abyss_UI[UI][lang2])
    });

    $("body").on("click", ".tlsub", function () {
        if (lang == 'CH') $("a[data-id='EN']").click()
        if (lang == 'EN') $("a[data-id='CN']").click()
    });

    function affix_s_h(m) {
        return {
            span: function (d) {
                var affix = m.data.Affix;
                $(d.container).render({
                    data: affix,
                    template: {
                        span: [{
                            em: function (d) {
                                return _SpiralAbyssAffixDescConfig[d.data].Show.Text
                            },
                            click: function (d) {
                                var hover = _SpiralAbyssAffixDescConfig[d.org_data].Hover && (_SpiralAbyssAffixDescConfig[d.org_data].Hover);
                                if (!hover) {
                                    return;
                                }
                                poplayer({
                                    header: _SpiralAbyssAffixDescConfig[d.org_data].Show.Text,
                                    width: '50%',
                                    height: '400px',
                                    template: {
                                        div: "<p style='font-size:13px;color:#FFCC44;text-align:center;padding-bottom:12px'>" + computer_.MiscText.Abyss_Show[lang] + "</p>" + hover
                                    },
                                    class: 'need_header'
                                })
                            }
                        }, {
                            i: function (d) {
                                var hover = _SpiralAbyssAffixDescConfig[d.data].Hover && (computer_.MiscText.Abyss_Show[lang] + "<br><br>" + _SpiralAbyssAffixDescConfig[d.data].Hover)
                                return hover
                            },
                            when: function (d) {
                                return _SpiralAbyssAffixDescConfig[d.data].Hover && _SpiralAbyssAffixDescConfig[d.data].Hover
                            },
                            width: '270px',
                            when: UI % 2 == 1
                        }],
                        style: {
                            color: function (d) {
                                var color = _SpiralAbyssAffixDescConfig[d.data].Show.Color;
                                return computer_.TextColorConfig[color] || '';
                            },
                            'font-weight': function (d) {
                                var bold = _SpiralAbyssAffixDescConfig[d.data].Show.Bold;
                                return bold ? 600 : 500;
                            }
                        },
                        class: 'affix_s_h',
                    }
                })
            },
            when: function () {
                return m.data.Affix && m.data.Affix.length
            }
        }
    }

    function monMon(this_class, c, cv, h, ms) {
        var mos = {
            moster: {
                div: [
                    {
                        div: function (m) {
                            var monster = _Monsters[m.data.ID];
                            var num = m.data.Num;
                            var mask = m.data.Mark || false;
                            var hpDown = m.data.HPDown || false;
                            var hpUp = m.data.HPUp || false;
                            var hpOverride = m.data.HPOverride;
                            var nameOverride = m.data.Name || false;
                            var choose_icon = monster.Icon[Math.floor(Math.random() * monster.Icon.length)]
                            if (!monster) return;
                            var interval = $(m.container).parents('.up_low').siblings('h6').attr('data-name')
                            var this_link = '/gi/monster?lang=' + (lang3) + '&id=' + m.data.ID + '&level=' + _SpiralAbyssFloorEntryToLevelCoeffConfig[interval].Level + '&mul=' + hp_coeff_cache_show_and_link
                            var affix_ids = m.data.Affix ? JSON.stringify(m.data.Affix) : '[]'
                            $(m.container).render([
                                {
                                    div: [
                                        {
                                            span: '⊗',
                                            class: 'monicon_mark',
                                            when: mask
                                        },
                                        {
                                            img: 'https://homdgcat.wiki/homdgcat-res/monster/' + choose_icon + '.png',
                                            class: 'monicon'
                                        },
                                        {
                                            span: (num || '?').toString(),
                                            class: 'monicon_num',
                                            when: num,
                                        }
                                    ],
                                    class: 'monicon_container',
                                    a: {
                                        'data-link': this_link
                                    }
                                },
                                {
                                    div: [
                                        {
                                            span: function (d) {
                                                var HPBase = monster.HP
                                                if (hpOverride) HPBase = hpOverride
                                                var HPCurve = monster.HPCurve
                                                var inter = _SpiralAbyssFloorEntryToLevelCoeffConfig[$(d.container).parents('.up_low').siblings('h6').attr('data-name')]
                                                var HP = Math.round(HPBase * _computer_.LevelCurves[inter.Level][HPCurve] * (hp_coeff_single_cache || inter.HPCoeff))
                                                var s = '<b><color style="color:' + (computer_.TextColorConfig[monster.Color] || '') + ';">' + HP + '</color></b>'
                                                if (hpDown) s = '<b><color style="color:' + (computer_.TextColorConfig[monster.Color] || '') + ';">' + HP + '</color> ↓</b>'
                                                if (hpUp) s = '<b><color style="color:' + (computer_.TextColorConfig[monster.Color] || '') + ';">' + HP + '</color> ↑</b>'
                                                return s
                                            }
                                        },
                                    ],
                                    class: 'monbelow',
                                    a: {
                                        'data-link': this_link
                                    }
                                },
                                {
                                    div: {
                                        p: "Local Legend",
                                        style: {
                                            color: '#666',
                                        },
                                    },
                                    class: 'monnote',
                                    when: _local_legends.includes(m.data.ID)
                                },
                                {
                                    div: {
                                        p: m.data.Note ? m.data.Note.Text : '',
                                        style: {
                                            color: function (j) {
                                                if (!m.data.Note) return ''
                                                return m.data.Note.Color ? (computer_.TextColorConfig[m.data.Note.Color] ? computer_.TextColorConfig[m.data.Note.Color] : m.data.Note.Color) : '#808080';
                                            },
                                            'font-size': function (j) {
                                                if (!m.data.Note) return ''
                                                if (!m.data.Note.Scale) return ''
                                                if (!m.data.Note.Scale) return ''
                                                return m.data.Note.Scale + 'em'
                                            }
                                        },
                                    },
                                    class: 'monnote',
                                    when: (m.data.Note != undefined),
                                    a: {
                                        'data-id': affix_ids
                                    }
                                }
                            ])
                        },
                        class: 'monster_card',
                    },
                    {
                        div: {
                            div: [
                                {
                                    p: function (m) {
                                        var monster = _Monsters[m.data.ID];
                                        var nameOverride = m.data.Name || false;
                                        if (nameOverride) {
                                            return nameOverride
                                        }
                                        if (monster.UseCustomColorName) {
                                            return _MonsterCustomColorNameConfig[m.data.ID].Name
                                        }
                                        return monster.Name
                                    },
                                    class: 'mon_hover_name',
                                    style: {
                                        color: function (m) {
                                            return computer_.TextColorConfig[_Monsters[m.data.ID].Color] || '';
                                        }
                                    },
                                },
                                {
                                    p: {
                                        span: function (d) {
                                            var t = _SpiralAbyssAffixDescConfig[d.data].Show.Text
                                            if (t.substring(0, 1) == " ") t = t.substring(1)
                                            return t
                                        },
                                        style: {
                                            color: function (d) {
                                                var color = _SpiralAbyssAffixDescConfig[d.data].Show.Color;
                                                return computer_.TextColorConfig[color] || '';
                                            },
                                            'font-weight': function (d) {
                                                var bold = _SpiralAbyssAffixDescConfig[d.data].Show.Bold;
                                                return bold ? 600 : 500;
                                            },
                                            'margin-left': '0',
                                            'margin-top': '5px',
                                        },
                                        class: 'affix_s_h',
                                        datapath: 'Affix',
                                    },
                                    class: 'mon_hover_affix',
                                    when: function (d) {
                                        return d.data.Affix && d.data.Affix.length
                                    }
                                }
                            ],
                            class: 'acc_hover_',
                            style: {
                                'border-color': function (m) {
                                    return computer_.TextColorConfig[_Monsters[m.data.ID].Color] || '';
                                }
                            },
                        },
                        class: 'acc_hover'
                    }
                ],
                datapath: 'monsters',
                class: 'acc' + (h ? ' noarena' : '')
            },
            class: this_class
        }
        if (!h) return [mos]
        return [
            mos,
        ]
    }

    $('body').on('click', '.showtop', function () {
        showtop = 1 - showtop
        if (showtop) {
            $('.generation').hide()
            $('.schedule').hide()
        } else {
            $('.generation').css('display', 'flex')
            $('.schedule').css('display', 'flex')
        }
    })
    $('body').on('click', '.showtop_2', function () {
        showtop = 1 - showtop
        if (showtop) {
            $('.generation').hide()
            $('.schedule').hide()
        } else {
            $('.generation').css('display', 'flex')
            $('.schedule').css('display', 'flex')
        }
    })

    $('body').on('click', '.monicon_container, .monbelow', function () {
        window.location.href = $(this).attr('data-link')
    })

    $('body').on('click', '.monnote', function () {
        var affix_id = $(this).attr('data-id')
        if (!affix_id) return
        var affix_id_list = JSON.parse(affix_id)
        poplayer({
            header: computer_.MiscText.Abyss_Show[lang],
            width: '50%',
            height: '400px',
            template: {
                div: function (l) {
                    for (var ii = affix_id_list.length - 1; ii >= 0; ii--) {
                        var affix_data = _SpiralAbyssAffixDescConfig[affix_id_list[ii]]
                        $(l.container).render({
                            p: '<b>' + affix_data.Show.Text + '</b><br><span style=\'font-size:0.85em;margin:0;\'>' + affix_data.Hover + '</span><br><br>'
                        })
                    }
                },
            },
            class: 'need_header'
        })
    })

    function dps(chamber, data, vvv) {
        if (typeof data == "number") return data
        var lv = _SpiralAbyssFloorEntryToLevelCoeffConfig[chamber].Level
        var coeff = _SpiralAbyssFloorEntryToLevelCoeffConfig[chamber].HPCoeff
        if (_coeff_override[vvv]) {
            var floor_index = {
                "9-": 0,
                "10": 1,
                "11": 2,
                "12": 3
            }[chamber.substring(0, 2)]
            coeff = _coeff_override[vvv][floor_index]
        }
        return Math.round((data[0] * _computer_.LevelCurves[lv]["1"] + data[1] * _computer_.LevelCurves[lv]["2"]) * coeff)
    }

    $('body').on('click', '.title', function () {
        $('.p_h').toggle()
        $('.dl_button').toggle()
    })

    function rotate() {
        var keq_emotes = ['1', '3', '6', '7', '18', '19', '20']
        $('.emote_').each(function () {
            var this_emote = keq_emotes[Math.floor(Math.random() * keq_emotes.length)]
            $(this).empty().render({
                img: `https://homdgcat.wiki/images/emote/Keqing/${this_emote}.png`
            })
        })
    }

    $('body').on('click', '.emote_', rotate)

})