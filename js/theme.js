(function () {
    'use strict';

    function toggleDarkMode() {
        App.state.isDarkMode = !App.state.isDarkMode;
        document.body.classList.toggle('dark-mode', App.state.isDarkMode);
        var btn = document.getElementById('darkModeBtn');
        if (btn) btn.textContent = App.state.isDarkMode ? '☀️ 浅色模式' : '🌙 暗黑模式';
    }

    window.toggleDarkMode = toggleDarkMode;
    App.theme = { toggleDarkMode: toggleDarkMode };
})();