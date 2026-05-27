(function () {
    'use strict';

    function getReagentValues(config) {
        var values = {};
        for (var i = 0; i < config.reagents.length; i++) {
            var r = config.reagents[i];
            var input = document.getElementById('reagent_' + r.id);
            values[r.id] = input ? (parseFloat(input.value) || r.defaultValue) : 0;
        }
        return values;
    }

    function calculate() {
        var config = App.platform.getCurrentConfig();
        if (!config) return;

        var qValue = parseFloat(document.getElementById('qValue').value) || 2.18;
        var fragmentLength = parseFloat(document.getElementById('fragmentLength').value) || 420;

        var targetPM = config.targetPM;
        // 优先读取用户输入的总体积，其次使用配置值
        var loadVolumeInput = document.getElementById('totalVolume');
        var loadVolume = loadVolumeInput ? (parseFloat(loadVolumeInput.value) || config.loadVolume) : config.loadVolume;

        var quantNM = (qValue * 1000000) / (660 * fragmentLength);
        var targetNM = targetPM / 1000;
        var sampleVolume = (targetNM * loadVolume) / quantNM;
        var dilution = quantNM / targetNM;

        var reagentValues = getReagentValues(config);
        var reagentSum = 0;
        var reagentDetails = {};
        for (var key in reagentValues) {
            if (reagentValues.hasOwnProperty(key)) {
                reagentSum += reagentValues[key];
                reagentDetails[key] = reagentValues[key];
            }
        }

        var bufferVolume = loadVolume - reagentSum - sampleVolume;

        App.state.currentResult = {
            platformId: config.id,
            platformName: config.name,
            qValue: qValue,
            fragmentLength: fragmentLength,
            targetPM: targetPM,
            loadVolume: loadVolume,
            sampleVolume: sampleVolume.toFixed(4),
            bufferVolume: bufferVolume.toFixed(4),
            bufferComponent: config.bufferComponent,
            dilution: dilution.toFixed(2),
            reagentDetails: reagentDetails
        };

        document.getElementById('resultQuantNM').textContent = quantNM.toFixed(6) + ' nM';
        document.getElementById('resultSampleVol').textContent = sampleVolume.toFixed(4) + ' μL';
        document.getElementById('resultBufferVol').textContent = bufferVolume.toFixed(4) + ' μL';
        document.getElementById('resultDilution').textContent = dilution.toFixed(2) + '\u00D7';

        renderMixProtocol(config, sampleVolume, bufferVolume, reagentValues, loadVolume);
    }

    function renderMixProtocol(config, sampleVolume, bufferVolume, reagentValues, loadVolume) {
        var tbody = document.getElementById('mixTableBody');
        if (config.mixProtocol.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="color:#888;text-align:center;padding:20px;">自定义模式：请手动计算混合方案</td></tr>';
            return;
        }

        var rows = '';
        for (var i = 0; i < config.mixProtocol.length; i++) {
            var step = config.mixProtocol[i];
            var volume = '';
            if (step.type === 'reagent') {
                volume = reagentValues[step.ref] !== undefined ? reagentValues[step.ref].toString() : '--';
            } else if (step.type === 'sample') {
                volume = sampleVolume.toFixed(4);
            } else if (step.type === 'buffer') {
                volume = bufferVolume.toFixed(4);
            }
            rows += '<tr>'
                + '<td class="step-col"><strong>' + step.stepLabel + '</strong></td>'
                + '<td><strong>' + step.component + '</strong></td>'
                + '<td>' + volume + '</td>'
                + '<td>' + step.description + '</td>'
                + '</tr>';
        }
        rows += '<tr class="total-row">'
            + '<td colspan="2"><strong>总体积</strong></td>'
            + '<td><strong>' + loadVolume + '</strong></td>'
            + '<td><strong>上机最终体积</strong></td>'
            + '</tr>';

        tbody.innerHTML = rows;
    }

    window.calculate = calculate;
    App.calculator = { calculate: calculate, getReagentValues: getReagentValues, renderMixProtocol: renderMixProtocol };
})();