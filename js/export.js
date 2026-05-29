(function () {
    'use strict';

    function exportPDF() {
        var result = App.state.currentResult;
        if (!result) {
            var alertMsg = App.i18n && App.i18n.getLanguage() === 'en' 
                ? 'Please calculate first!' 
                : '请先计算！';
            return alert(alertMsg);
        }

        try {
            var isEnglish = App.i18n && App.i18n.getLanguage() === 'en';
            var t = function(text) {
                if (!App.i18n) return text;
                return App.i18n.t(text);
            };

            var jsPDF = window.jspdf.jsPDF;
            var doc = new jsPDF();

            // Header
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('SeqMix Pro', 105, 25, { align: 'center' });

            // Report Title
            doc.setFontSize(14);
            doc.setFont('helvetica', 'normal');
            var reportTitle = isEnglish 
                ? 'NGS Library Loading Calculator Report'
                : '测序文库上机浓度计算报告';
            doc.text(reportTitle, 105, 35, { align: 'center' });

            // Divider
            doc.setDrawColor(200, 200, 200);
            doc.line(15, 40, 195, 40);

            // Date and Version
            doc.setFontSize(10);
            var genLabel = isEnglish ? 'Generated:' : '生成时间:';
            var verLabel = isEnglish ? 'Version:' : '版本:';
            doc.text(genLabel + ' ' + new Date().toLocaleString(), 15, 50);
            doc.text(verLabel + ' v1.0.0', 165, 50, { align: 'right' });

            // Basic Info
            var y = 65;
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            var basicTitle = isEnglish ? 'Basic Information' : '基本信息';
            doc.text(basicTitle, 15, y);
            y += 8;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');

            var basicInfo = isEnglish ? [
                'Platform: ' + result.platformName,
                'Q-value: ' + result.qValue + ' ng/μL',
                'Fragment Length: ' + result.fragmentLength + ' bp',
                'Target Loading Conc: ' + result.targetPM + ' pM',
                'Final Volume: ' + result.loadVolume + ' μL'
            ] : [
                '机型: ' + result.platformName,
                'Q实测定量: ' + result.qValue + ' ng/μL',
                '片段长度: ' + result.fragmentLength + ' bp',
                '上机浓度: ' + result.targetPM + ' pM',
                '上机体积: ' + result.loadVolume + ' μL'
            ];

            basicInfo.forEach(function(text) {
                doc.text(text, 15, y);
                y += 7;
            });

            // Divider
            doc.setDrawColor(220, 220, 220);
            doc.line(15, y + 3, 195, y + 3);
            y += 12;

            // Calculation Results
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            var calcTitle = isEnglish ? 'Calculation Results' : '计算结果';
            doc.text(calcTitle, 15, y);
            y += 8;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');

            var quantConc = ((result.qValue * 1000000) / (660 * result.fragmentLength)).toFixed(6) + ' nM';
            var calcResults = isEnglish ? [
                'Quantification Conc: ' + quantConc,
                'Library Volume: ' + result.sampleVolume + ' μL',
                t(result.bufferComponent) + ' Volume: ' + result.bufferVolume + ' μL',
                'Dilution Factor: ' + result.dilution + 'x'
            ] : [
                '定量浓度: ' + quantConc,
                '文库原液体积: ' + result.sampleVolume + ' μL',
                t(result.bufferComponent) + ' 补足体积: ' + result.bufferVolume + ' μL',
                '稀释倍数: ' + result.dilution + '×'
            ];

            calcResults.forEach(function(text) {
                doc.text(text, 15, y);
                y += 7;
            });

            // Get Mix Protocol
            var mixProtocol = [];
            var config = null;
            try {
                if (window.App && window.App.platform && window.App.platform.getCurrentConfig) {
                    config = window.App.platform.getCurrentConfig();
                    if (config && config.mixProtocol) {
                        mixProtocol = config.mixProtocol;
                    }
                }
            } catch (e) {
                console.log('Get mix protocol failed', e);
            }

            if (mixProtocol.length > 0 && y < 200) {
                // Divider
                doc.setDrawColor(220, 220, 220);
                doc.line(15, y + 3, 195, y + 3);
                y += 12;

                // Mix Protocol
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                var mixTitle = isEnglish ? 'Mixing Protocol' : '上机混合方案';
                doc.text(mixTitle, 15, y);
                y += 10;

                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');

                // Get Reagent Values
                var reagentValues = {};
                try {
                    if (App.calculator && App.calculator.getReagentValues && config) {
                        reagentValues = App.calculator.getReagentValues(config);
                    }
                } catch (e) {
                    console.log('Get reagent values failed', e);
                }

                mixProtocol.forEach(function(step, index) {
                    if (y > 270) return;

                    var stepLabel = t(step.stepLabel || '');
                    var component = t(step.component || '');

                    // Get Volume
                    var volumeText = '--';
                    try {
                        if (step.type === 'sample') {
                            if (result.platformId === 'nimbo') {
                                volumeText = '2.0000';
                            } else {
                                volumeText = result.sampleVolume;
                            }
                        } else if (step.type === 'buffer') {
                            volumeText = result.bufferVolume;
                        } else if (step.type === 'reagent' && step.ref) {
                            if (result.platformId === 'nimbo' && step.ref === 'intermediate') {
                                var intermediateVol = (result.loadVolume * result.targetPM) / 40;
                                volumeText = intermediateVol.toFixed(4);
                            } else if (reagentValues[step.ref] !== undefined) {
                                volumeText = reagentValues[step.ref].toString();
                            }
                        }
                    } catch (e) {
                        volumeText = '--';
                    }

                    // Display Step
                    doc.setFont('helvetica', 'bold');
                    doc.text(stepLabel, 15, y);
                    doc.setFont('helvetica', 'normal');

                    var line = component + ' (' + volumeText + ' μL)';
                    if (line.length > 60) {
                        line = line.substring(0, 57) + '...';
                    }
                    doc.text(line, 40, y);

                    y += 7;
                });

                // Total Volume
                if (y < 275) {
                    doc.setFont('helvetica', 'bold');
                    var totalText = isEnglish 
                        ? 'Total Volume: ' + result.loadVolume + ' μL (Final Loading)'
                        : '总体积: ' + result.loadVolume + ' μL (上机最终体积)';
                    doc.text(totalText, 15, y);
                }
            }

            // Footer
            doc.setDrawColor(220, 220, 220);
            doc.line(15, 280, 195, 280);
            doc.setFontSize(9);
            var createdBy = isEnglish ? 'Created by:' : '制作人:';
            doc.text(createdBy + ' zhangyuanshen (justin)', 15, 290);
            doc.text('SeqMix Pro v1.0.0', 195, 290, { align: 'right' });

            doc.save('SeqMixPro_Report_' + new Date().toISOString().slice(0, 10) + '.pdf');
            
            // 追踪 PDF 导出事件
            if (App.analytics && App.analytics.trackExport) {
                App.analytics.trackExport('PDF');
            }

        } catch (e) {
            console.error('PDF export failed', e);
            var errMsg = App.i18n && App.i18n.getLanguage() === 'en' 
                ? 'PDF export failed! Error: '
                : 'PDF导出失败，请重试！错误: ';
            alert(errMsg + e.message);
        }
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
        
        // 追踪 CSV 导出事件
        if (App.analytics && App.analytics.trackExport) {
            App.analytics.trackExport('CSV');
        }
    }

    window.exportPDF = exportPDF;
    window.exportCSV = exportCSV;
    App.exporter = { exportPDF: exportPDF, exportCSV: exportCSV };
})();