(function () {
    'use strict';

    var PLATFORMS = [
        {
            id: 'novaseq',
            name: 'NovaSeq',
            targetPM: 125,
            loadVolume: 1500,
            reagents: [
                { id: 'rmp1', label: 'RMP1 (μL)', defaultValue: 750 },
                { id: 'rmp2', label: 'RMP2 (μL)', defaultValue: 600 }
            ],
            mixProtocol: [
                { type: 'reagent', ref: 'rmp1', component: 'RMP1', stepLabel: '第1步', description: 'Read Mix Primer 1（先加）' },
                { type: 'buffer',  component: 'RMP4', stepLabel: '第2步', description: '补足缓冲液/水' },
                { type: 'sample',  component: '文库原液', stepLabel: '第3步', description: '根据稀释倍数计算' },
                { type: 'reagent', ref: 'rmp2', component: 'RMP2', stepLabel: '第4步', description: 'Read Mix Primer 2（最后加）' }
            ],
            bufferComponent: 'RMP4'
        },
        {
            id: 'pro_1000M-S',
            name: 'pro_1000M-S',
            targetPM: 150,
            loadVolume: 150,
            reagents: [
                { id: 'rmp1', label: 'RMP1 (μL)', defaultValue: 75 },
                { id: 'rmp2', label: 'RMP2 (μL)', defaultValue: 60 }
            ],
            mixProtocol: [
                { type: 'reagent', ref: 'rmp1', component: 'RMP1', stepLabel: '第1步', description: 'Read Mix Primer 1（先加）' },
                { type: 'buffer',  component: 'RMP4', stepLabel: '第2步', description: '补足缓冲液/水' },
                { type: 'sample',  component: '文库原液', stepLabel: '第3步', description: '根据稀释倍数计算' },
                { type: 'reagent', ref: 'rmp2', component: 'RMP2', stepLabel: '第4步', description: 'Read Mix Primer 2（最后加）' }
            ],
            bufferComponent: 'RMP4'
        },
        {
            id: 'miseq',
            name: 'MiSeq',
            targetPM: 15,
            loadVolume: 1500,
            reagents: [
                { id: 'ht1', label: 'HT1 (μL)', defaultValue: 600 }
            ],
            mixProtocol: [
                { type: 'sample',  component: '文库原液', stepLabel: '第1步', description: '加入文库原液' },
                { type: 'buffer',  component: 'NaOH/水', stepLabel: '第2步', description: '补足至终体积' },
                { type: 'reagent', ref: 'ht1', component: 'HT1', stepLabel: '第3步', description: '杂交缓冲液' }
            ],
            bufferComponent: 'NaOH/水'
        },
        {
            id: 'pro_1000M-T',
            name: 'pro_1000M-T',    
            targetPM: 125,
            loadVolume: 700,
            reagents: [
                { id: 'rmp1', label: 'RMP1 (μL)', defaultValue: 350 },
                { id: 'rmp2', label: 'RMP2 (μL)', defaultValue: 280 }
            ],
            mixProtocol: [
                { type: 'reagent', ref: 'rmp1', component: 'RMP1', stepLabel: '第1步', description: 'Read Mix Primer 1（先加）' },
                { type: 'buffer',  component: 'RMP4', stepLabel: '第2步', description: '补足缓冲液/水' },
                { type: 'sample',  component: '文库原液', stepLabel: '第3步', description: '根据稀释倍数计算' },
                { type: 'reagent', ref: 'rmp2', component: 'RMP2', stepLabel: '第4步', description: 'Read Mix Primer 2（最后加）' }
            ],
            bufferComponent: 'RMP4'
        },
        {
            id: 'novaseq_xp',
            name: 'NovaSeq XP',
            targetPM: 200,
            loadVolume: 1500,
            reagents: [
                { id: 'rmp1', label: 'RMP1 (μL)', defaultValue: 750 },
                { id: 'rmp2', label: 'RMP2 (μL)', defaultValue: 600 }
            ],
            mixProtocol: [
                { type: 'reagent', ref: 'rmp1', component: 'RMP1', stepLabel: '第1步', description: 'Read Mix Primer 1（先加）' },
                { type: 'buffer',  component: 'RMP4', stepLabel: '第2步', description: '补足缓冲液/水' },
                { type: 'sample',  component: '文库原液', stepLabel: '第3步', description: '根据稀释倍数计算' },
                { type: 'reagent', ref: 'rmp2', component: 'RMP2', stepLabel: '第4步', description: 'Read Mix Primer 2（最后加）' }
            ],
            bufferComponent: 'RMP4'
        },
        {
            id: 'EVO_3000M-S',
            name: 'EVO_3000M-S',
            targetPM: 125,
            loadVolume: 375,
            reagents: [
                { id: 'rmp1', label: 'RMP1 (μL)', defaultValue: 187.5 },
                { id: 'rmp2', label: 'RMP2 (μL)', defaultValue: 150 }
            ],
            mixProtocol: [
                { type: 'reagent', ref: 'rmp1', component: 'RMP1', stepLabel: '第1步', description: 'Read Mix Primer 1（先加）' },
                { type: 'buffer',  component: 'RMP4', stepLabel: '第2步', description: '补足缓冲液/水' },
                { type: 'sample',  component: '文库原液', stepLabel: '第3步', description: '根据稀释倍数计算' },
                { type: 'reagent', ref: 'rmp2', component: 'RMP2', stepLabel: '第4步', description: 'Read Mix Primer 2（最后加）' }
            ],
            bufferComponent: 'RMP4'
        },
        {
            id: 'EVO_3000M-T',
            name: 'EVO_3000M-T',
            targetPM: 125,
            loadVolume: 1500,
            reagents: [
                { id: 'rmp1', label: 'RMP1 (μL)', defaultValue: 750 },
                { id: 'rmp2', label: 'RMP2 (μL)', defaultValue: 600 }
            ],
            mixProtocol: [
                { type: 'reagent', ref: 'rmp1', component: 'RMP1', stepLabel: '第1步', description: 'Read Mix Primer 1（先加）' },
                { type: 'buffer',  component: 'RMP4', stepLabel: '第2步', description: '补足缓冲液/水' },
                { type: 'sample',  component: '文库原液', stepLabel: '第3步', description: '根据稀释倍数计算' },
                { type: 'reagent', ref: 'rmp2', component: 'RMP2', stepLabel: '第4步', description: 'Read Mix Primer 2（最后加）' }
            ],
            bufferComponent: 'RMP4'
        },
        {
            id: 'evo_p',
            name: 'EVO_P',
            targetPM: 125,
            loadVolume: 1500,
            reagents: [
                { id: 'rmp1', label: 'RMP1 (μL)', defaultValue: 750 },
                { id: 'rmp2', label: 'RMP2 (μL)', defaultValue: 600 }
            ],
            mixProtocol: [
                { type: 'reagent', ref: 'rmp1', component: 'RMP1', stepLabel: '第1步', description: 'Read Mix Primer 1（先加）' },
                { type: 'buffer',  component: 'RMP4', stepLabel: '第2步', description: '补足缓冲液/水' },
                { type: 'sample',  component: '文库原液', stepLabel: '第3步', description: '根据稀释倍数计算' },
                { type: 'reagent', ref: 'rmp2', component: 'RMP2', stepLabel: '第4步', description: 'Read Mix Primer 2（最后加）' }
            ],
            bufferComponent: 'RMP4'
        },
        {
            id: 'nimbo',
            name: 'Nimbo',
            targetPM: 6,
            loadVolume: 1000,
            reagents: [
                { id: 'denatureM', label: '变性试剂 M (μL)', defaultValue: 2 },
                { id: 'neutralize', label: '中和缓冲液 (μL)', defaultValue: 2 },
                { id: 'hybridize1', label: '杂交缓冲液1 (μL)', defaultValue: 194 },
                { id: 'intermediate', label: '40pM中间液 (μL)', defaultValue: 150 }
            ],
            mixProtocol: [
                { type: 'sample',  component: '4nM文库', stepLabel: '第1步', description: '加入2μL 4nM文库（先将原液稀释到4nM）' },
                { type: 'reagent', ref: 'denatureM', component: '变性试剂 M', stepLabel: '第2步', description: '加入2μL变性试剂M，剧烈震荡10s，低速离心，室温静置5min' },
                { type: 'reagent', ref: 'neutralize', component: '中和缓冲液', stepLabel: '第3步', description: '加入2μL中和缓冲液，剧烈震荡10s，低速离心' },
                { type: 'reagent', ref: 'hybridize1', component: '杂交缓冲液', stepLabel: '第4步', description: '加入194μL杂交缓冲液，剧烈震荡10s，低速离心，得到200μL 40pM中间液' },
                { type: 'reagent', ref: 'intermediate', component: '40pM中间液', stepLabel: '第5步', description: '取40pM中间液到新离心管' },
                { type: 'buffer',  component: '杂交缓冲液', stepLabel: '第6步', description: '加入杂交缓冲液补足至1000μL' }
            ],
            bufferComponent: '杂交缓冲液'
        }
    ];

    function getPlatformById(id) {
        for (var i = 0; i < PLATFORMS.length; i++) {
            if (PLATFORMS[i].id === id) return PLATFORMS[i];
        }
        return null;
    }

    function getPlatforms() {
        return PLATFORMS;
    }

    App.configs = {
        platforms: PLATFORMS,
        getPlatformById: getPlatformById,
        getPlatforms: getPlatforms
    };
})();