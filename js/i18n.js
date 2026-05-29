(function () {
    'use strict';

    var CURRENT_LANG = 'zh'; // 默认中文

    var TRANSLATIONS = {
        zh: {
            'title': '测序文库上机浓度计算工具',
            'platform': '选择平台',
            'q_value': 'Q实测定量',
            'fragment_length': '片段长度',
            'target_pm': '上机浓度 (pM)',
            'calculate': '计算',
            'export_pdf': '导出PDF',
            'export_csv': '导出CSV',
            'reset': '重置',
            'result_title': '计算结果',
            'quant_conc': '定量浓度',
            'library_volume': '文库原液体积',
            'buffer_volume': '补足体积',
            'dilution': '稀释倍数',
            'mix_protocol': '上机混合方案',
            'step': '步骤',
            'component': '组分',
            'volume': '体积 (μL)',
            'description': '说明',
            'total_volume': '总体积 (μL)',
            'history': '计算历史',
            'date': '日期',
            'platform': '平台',
            'q_val': 'Q值',
            'frag_len': '片段长度',
            'load_conc': '上机浓度',
            'load_vol': '上机体积',
            'lib_vol': '文库体积',
            'buf_vol': '缓冲液体积',
            'dilution_factor': '稀释倍数',
            'created_by': '制作人',
            'version': '版本',
            'generated': '生成时间',
            'report_title': '测序文库上机浓度计算报告',
            'basic_info': '基本信息',
            'calc_result': '计算结果',
            'mixing_protocol': '上机混合方案',
            'total_vol': '总体积',
            'final_loading': '上机最终体积',
            'please_calc_first': '请先计算！',
            'no_record': '暂无记录！',
            'please_calc': '请先计算',
            'pdf_export_fail': 'PDF导出失败，请重试！',
            '第1步': '第1步',
            '第2步': '第2步',
            '第3步': '第3步',
            '第4步': '第4步',
            '第5步': '第5步',
            '第6步': '第6步',
            '文库原液': '文库原液',
            '4nM文库': '4nM文库',
            '40pM中间液': '40pM中间液',
            '变性试剂 M': '变性试剂 M',
            '中和缓冲液': '中和缓冲液',
            '杂交缓冲液': '杂交缓冲液',
            'RMP1': 'RMP1',
            'RMP2': 'RMP2',
            'RMP4': 'RMP4',
            'HT1': 'HT1',
            'NaOH/水': 'NaOH/水',
            'Read Mix Primer 1（先加）': 'Read Mix Primer 1（先加）',
            'Read Mix Primer 2（最后加）': 'Read Mix Primer 2（最后加）',
            '补足缓冲液/水': '补足缓冲液/水',
            '根据稀释倍数计算': '根据稀释倍数计算',
            '加入文库原液': '加入文库原液',
            '补足至终体积': '补足至终体积',
            '加入2μL 4nM文库（先将原液稀释到4nM）': '加入2μL 4nM文库（先将原液稀释到4nM）',
            '加入2μL变性试剂M，剧烈震荡10s，低速离心，室温静置5min': '加入2μL变性试剂M，剧烈震荡10s，低速离心，室温静置5min',
            '加入2μL中和缓冲液，剧烈震荡10s，低速离心': '加入2μL中和缓冲液，剧烈震荡10s，低速离心',
            '加入194μL杂交缓冲液，剧烈震荡10s，低速离心，得到200μL 40pM中间液': '加入194μL杂交缓冲液，剧烈震荡10s，低速离心，得到200μL 40pM中间液',
            '取40pM中间液到新离心管': '取40pM中间液到新离心管',
            '加入杂交缓冲液补足至1000μL': '加入杂交缓冲液补足至1000μL',
            '变性试剂 M (μL)': '变性试剂 M (μL)',
            '中和缓冲液 (μL)': '中和缓冲液 (μL)',
            '杂交缓冲液1 (μL)': '杂交缓冲液1 (μL)',
            '40pM中间液 (μL)': '40pM中间液 (μL)',
            'RMP1 (μL)': 'RMP1 (μL)',
            'RMP2 (μL)': 'RMP2 (μL)',
            'HT1 (μL)': 'HT1 (μL)',
            '文库原液体积 (μL)': '文库原液体积 (μL)',
            '补足体积 (μL)': '补足体积 (μL)',
            'Volume (μL)': '体积 (μL)'
        },
        en: {
            'title': 'NGS Library Loading Calculator',
            'platform': 'Select Platform',
            'q_value': 'Q-value',
            'fragment_length': 'Fragment Length',
            'target_pm': 'Target Loading Conc (pM)',
            'calculate': 'Calculate',
            'export_pdf': 'Export PDF',
            'export_csv': 'Export CSV',
            'reset': 'Reset',
            'result_title': 'Calculation Results',
            'quant_conc': 'Quantification Conc',
            'library_volume': 'Library Volume',
            'buffer_volume': 'Buffer Volume',
            'dilution': 'Dilution Factor',
            'mix_protocol': 'Mixing Protocol',
            'step': 'Step',
            'component': 'Component',
            'volume': 'Volume (μL)',
            'description': 'Description',
            'total_volume': 'Total Volume (μL)',
            'history': 'Calculation History',
            'date': 'Date',
            'platform': 'Platform',
            'q_val': 'Q-value',
            'frag_len': 'Fragment Length',
            'load_conc': 'Loading Conc',
            'load_vol': 'Loading Volume',
            'lib_vol': 'Library Volume',
            'buf_vol': 'Buffer Volume',
            'dilution_factor': 'Dilution Factor',
            'created_by': 'Created by',
            'version': 'Version',
            'generated': 'Generated',
            'report_title': 'NGS Library Loading Calculator Report',
            'basic_info': 'Basic Information',
            'calc_result': 'Calculation Results',
            'mixing_protocol': 'Mixing Protocol',
            'total_vol': 'Total Volume',
            'final_loading': 'Final Loading',
            'please_calc_first': 'Please calculate first!',
            'no_record': 'No records!',
            'please_calc': 'Please calculate first',
            'pdf_export_fail': 'PDF export failed!',
            '第1步': 'Step 1',
            '第2步': 'Step 2',
            '第3步': 'Step 3',
            '第4步': 'Step 4',
            '第5步': 'Step 5',
            '第6步': 'Step 6',
            '文库原液': 'Library Stock',
            '4nM文库': '4nM Library',
            '40pM中间液': '40pM Intermediate',
            '变性试剂 M': 'Denaturing Reagent M',
            '中和缓冲液': 'Neutralization Buffer',
            '杂交缓冲液': 'Hybridization Buffer',
            'RMP1': 'RMP1',
            'RMP2': 'RMP2',
            'RMP4': 'RMP4',
            'HT1': 'HT1',
            'NaOH/水': 'NaOH/Water',
            'Read Mix Primer 1（先加）': 'Read Mix Primer 1 (Add first)',
            'Read Mix Primer 2（最后加）': 'Read Mix Primer 2 (Add last)',
            '补足缓冲液/水': 'Make up with buffer/water',
            '根据稀释倍数计算': 'Calculate by dilution factor',
            '加入文库原液': 'Add library stock',
            '补足至终体积': 'Make up to final volume',
            '加入2μL 4nM文库（先将原液稀释到4nM）': 'Add 2μL 4nM library (first dilute stock to 4nM)',
            '加入2μL变性试剂M，剧烈震荡10s，低速离心，室温静置5min': 'Add 2μL denaturing reagent M, vortex 10s, spin down, RT 5min',
            '加入2μL中和缓冲液，剧烈震荡10s，低速离心': 'Add 2μL neutralization buffer, vortex 10s, spin down',
            '加入194μL杂交缓冲液，剧烈震荡10s，低速离心，得到200μL 40pM中间液': 'Add 194μL hybridization buffer, vortex 10s, spin down, get 200μL 40pM intermediate',
            '取40pM中间液到新离心管': 'Take 40pM intermediate to new tube',
            '加入杂交缓冲液补足至1000μL': 'Add hybridization buffer to 1000μL',
            '变性试剂 M (μL)': 'Denaturing Reagent M (μL)',
            '中和缓冲液 (μL)': 'Neutralization Buffer (μL)',
            '杂交缓冲液1 (μL)': 'Hybridization Buffer 1 (μL)',
            '40pM中间液 (μL)': '40pM Intermediate (μL)',
            'RMP1 (μL)': 'RMP1 (μL)',
            'RMP2 (μL)': 'RMP2 (μL)',
            'HT1 (μL)': 'HT1 (μL)',
            '文库原液体积 (μL)': 'Library Volume (μL)',
            '补足体积 (μL)': 'Buffer Volume (μL)',
            'Volume (μL)': 'Volume (μL)'
        }
    };

    function t(key) {
        if (!key) return '';
        var lang = CURRENT_LANG;
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            return TRANSLATIONS[lang][key];
        }
        return key; // 如果找不到翻译，返回原key
    }

    function setLanguage(lang) {
        if (lang === 'zh' || lang === 'en') {
            CURRENT_LANG = lang;
            localStorage.setItem('seqlang', lang);
            updateUI();
        }
    }

    function getLanguage() {
        return CURRENT_LANG;
    }

    function initLanguage() {
        var savedLang = localStorage.getItem('seqlang');
        if (savedLang === 'zh' || savedLang === 'en') {
            CURRENT_LANG = savedLang;
        }
    }

    function updateUI() {
        // 更新页面上所有带 data-i18n 属性的元素
        var elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(function(el) {
            var key = el.getAttribute('data-i18n');
            el.textContent = t(key);
        });

        // 更新占位符
        var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(function(el) {
            var key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = t(key);
        });

        // 更新语言按钮状态
        var langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(function(btn) {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === CURRENT_LANG) {
                btn.classList.add('active');
            }
        });

        // 重新渲染平台输入框
        if (App.platform && App.platform.refreshLanguage) {
            App.platform.refreshLanguage();
        }

        // 重新计算以更新显示
        if (typeof calculate === 'function') {
            calculate();
        }
    }

    function switchLanguage(lang) {
        setLanguage(lang);
        
        // 追踪语言切换事件
        if (App.analytics && App.analytics.trackLanguageSwitch) {
            App.analytics.trackLanguageSwitch(lang);
        }
    }

    initLanguage();

    window.switchLanguage = switchLanguage;

    App.i18n = {
        t: t,
        setLanguage: setLanguage,
        getLanguage: getLanguage,
        updateUI: updateUI
    };
})();
