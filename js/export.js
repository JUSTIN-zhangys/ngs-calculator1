(function () {
    'use strict';

    function exportPDF() {
        var result = App.state.currentResult;
        if (!result) return alert('请先计算！');
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('测序文库上机浓度计算报告', 105, 25, { align: 'center' });
        doc.setFontSize(12);
        var y = 40;
        doc.text('机    型: ' + result.platformName, 20, y); y += 10;
        doc.text('Q实测定量: ' + result.qValue + ' ng/μL', 20, y); y += 10;
        doc.text('片段长度: ' + result.fragmentLength + ' bp', 20, y); y += 10;
        doc.text('上机浓度: ' + result.targetPM + ' pM', 20, y); y += 10;
        doc.text('上机体积: ' + result.loadVolume + ' μL', 20, y); y += 10;
        doc.text('文库原液体积: ' + result.sampleVolume + ' μL', 20, y); y += 10;
        doc.text(result.bufferComponent + '补足体积: ' + result.bufferVolume + ' μL', 20, y); y += 10;
        doc.text('稀释倍数: ' + result.dilution + '\u00D7', 20, y);
        doc.save('文库计算报告.pdf');
    }

    function exportCSV() {
        var data = App.state.historyData;
        if (data.length === 0) return alert('暂无记录！');
        var csv = '时间,机型,Q值,片段长度(bp),上机浓度(pM),原液体积(μL),补足体积(μL),稀释倍数\n';
        data.forEach(function (item) {
            csv += '"' + item.time + '",'
                + '"' + item.platformName + '",'
                + item.qValue + ','
                + item.fragmentLength + ','
                + item.targetPM + ','
                + item.sampleVolume + ','
                + item.bufferVolume + ','
                + item.dilution + '\n';
        });
        var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = '文库计算历史.csv';
        link.click();
        URL.revokeObjectURL(link.href);
    }

    window.exportPDF = exportPDF;
    window.exportCSV = exportCSV;
    App.exporter = { exportPDF: exportPDF, exportCSV: exportCSV };
})();