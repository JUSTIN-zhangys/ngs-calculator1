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
            id: 'hiseq',
            name: 'HiSeq 4000',
            targetPM: 300,
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
            id: 'nextseq',
            name: 'NextSeq',
            targetPM: 1.3,
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
            id: 'pro_p',
            name: 'PRO_P',
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