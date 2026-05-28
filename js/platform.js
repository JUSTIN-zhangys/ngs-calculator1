(function () {
    'use strict';

    function renderReagentInputs(config) {
        var container = document.getElementById('reagentInputs');
        if (!container) return;
        container.innerHTML = '';
        
        // 添加总体积输入框
        var totalVolDiv = document.createElement('div');
        totalVolDiv.className = 'input-group';
        var totalVolLabel = document.createElement('label');
        totalVolLabel.setAttribute('for', 'totalVolume');
        totalVolLabel.textContent = App.i18n ? App.i18n.t('total_volume') : '总体积 (μL)';
        var totalVolInput = document.createElement('input');
        totalVolInput.type = 'number';
        totalVolInput.id = 'totalVolume';
        totalVolInput.value = config.loadVolume;
        totalVolInput.step = '1';
        totalVolDiv.appendChild(totalVolLabel);
        totalVolDiv.appendChild(totalVolInput);
        container.appendChild(totalVolDiv);
        
        // 添加试剂输入框
        for (var i = 0; i < config.reagents.length; i++) {
            var r = config.reagents[i];
            var div = document.createElement('div');
            div.className = 'input-group';
            var label = document.createElement('label');
            label.setAttribute('for', 'reagent_' + r.id);
            label.textContent = App.i18n ? App.i18n.t(r.label) : r.label;
            var input = document.createElement('input');
            input.type = 'number';
            input.id = 'reagent_' + r.id;
            input.value = r.defaultValue;
            input.step = '1';
            div.appendChild(label);
            div.appendChild(input);
            container.appendChild(div);
        }
    }

    function updateBufferLabel(config) {
        var el = document.getElementById('resultBufferLabel');
        if (el) {
            var bufferComp = App.i18n ? App.i18n.t(config.bufferComponent) : config.bufferComponent;
            var labelSuffix = App.i18n && App.i18n.getLanguage() === 'en' ? ' Volume (μL)' : ' 补足体积 (μL)';
            el.textContent = bufferComp + labelSuffix;
        }
    }

    function getCurrentConfig() {
        var activeBtn = document.querySelector('.platform-btn.active');
        var platformId = activeBtn ? activeBtn.dataset.platform : 'novaseq';
        var config = App.configs.getPlatformById(platformId);
        return config || App.configs.platforms[0];
    }

    function selectPlatform(btn) {
        document.querySelectorAll('.platform-btn').forEach(function (b) { return b.classList.remove('active'); });
        btn.classList.add('active');

        var config = App.configs.getPlatformById(btn.dataset.platform);
        if (config) {
            renderReagentInputs(config);
            updateBufferLabel(config);
            document.getElementById('targetPM').value = config.targetPM;
            if (document.getElementById('totalVolume')) {
                document.getElementById('totalVolume').value = config.loadVolume;
            }
        }
        calculate();
    }

    function initPlatform() {
        var firstBtn = document.querySelector('.platform-btn[data-platform="novaseq"]');
        if (firstBtn) {
            var config = App.configs.getPlatformById('novaseq');
            if (config) {
                renderReagentInputs(config);
                updateBufferLabel(config);
                document.getElementById('targetPM').value = config.targetPM;
                if (document.getElementById('totalVolume')) {
                    document.getElementById('totalVolume').value = config.loadVolume;
                }
            }
        }
    }

    // 更新语言时重新渲染
    function refreshLanguage() {
        var config = getCurrentConfig();
        renderReagentInputs(config);
        updateBufferLabel(config);
    }

    window.selectPlatform = selectPlatform;
    App.platform = {
        selectPlatform: selectPlatform,
        getCurrentConfig: getCurrentConfig,
        renderReagentInputs: renderReagentInputs,
        updateBufferLabel: updateBufferLabel,
        initPlatform: initPlatform,
        refreshLanguage: refreshLanguage
    };
})();