(function () {
    'use strict';

    function renderHistory() {
        var tbody = document.getElementById('historyBody');
        var data = App.state.historyData;
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="color:#888;text-align:center;">暂无记录</td></tr>';
            return;
        }
        tbody.innerHTML = data.map(function (item, i) {
            return ''
                + '<tr>'
                + '<td>' + item.time + '</td>'
                + '<td>' + item.platformName + '</td>'
                + '<td>' + item.qValue + '</td>'
                + '<td>' + item.fragmentLength + '</td>'
                + '<td>' + item.sampleVolume + '</td>'
                + '<td>' + item.bufferVolume + '</td>'
                + '<td><button onclick="deleteHistory(' + i + ')" style="background:#ff4757;color:white;border:none;padding:5px 10px;border-radius:6px;cursor:pointer;">删除</button></td>'
                + '</tr>';
        }).join('');
    }

    function addToHistory() {
        var result = App.state.currentResult;
        if (!result) return alert('请先进行计算！');
        var entry = { time: new Date().toLocaleString('zh-CN') };
        for (var key in result) {
            if (result.hasOwnProperty(key)) {
                entry[key] = result[key];
            }
        }
        App.state.historyData.unshift(entry);
        if (App.state.historyData.length > 30) App.state.historyData.pop();
        renderHistory();
    }

    function deleteHistory(i) {
        if (confirm('确定删除这条记录？')) {
            App.state.historyData.splice(i, 1);
            renderHistory();
        }
    }

    window.addToHistory = addToHistory;
    window.deleteHistory = deleteHistory;
    window.renderHistory = renderHistory;
    App.history = { addToHistory: addToHistory, deleteHistory: deleteHistory, renderHistory: renderHistory };
})();