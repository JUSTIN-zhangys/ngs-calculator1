(function () {
    'use strict';

    function resetForm() {
        document.getElementById('qValue').value = '2.18';
        document.getElementById('fragmentLength').value = '420';
        document.getElementById('customPM').value = '125';
        document.getElementById('customVol').value = '1500';
        document.getElementById('customInputs').style.display = 'none';

        var firstBtn = document.querySelector('.platform-btn');
        if (firstBtn) {
            document.querySelectorAll('.platform-btn').forEach(function (b) { return b.classList.remove('active'); });
            firstBtn.classList.add('active');
            var config = App.configs.getPlatformById('novaseq');
            if (config) {
                App.platform.renderReagentInputs(config);
                App.platform.updateBufferLabel(config);
            }
        }

        calculate();
    }

    function init() {
        App.platform.initPlatform();
        calculate();
        renderHistory();
    }

    window.resetForm = resetForm;
    App.core = { resetForm: resetForm, init: init };

    if (typeof window.addEventListener === 'function') {
        window.addEventListener('DOMContentLoaded', init);
    }
})();