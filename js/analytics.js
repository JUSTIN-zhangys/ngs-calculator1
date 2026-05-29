(function() {
    'use strict';

    // 初始化统计系统
    function initAnalytics() {
        // 检查是否已配置 GA ID
        if (!App.config || !App.config.GA_ID) {
            console.log('[Analytics] GA_ID 未配置，请在 config 中设置');
            // 即使没有 GA ID，也初始化本地统计
            initCustomAnalytics();
            return;
        }

        // 加载 Google Analytics
        loadGoogleAnalytics();
        
        // 初始化自定义统计
        initCustomAnalytics();
    }

    // 加载 Google Analytics
    function loadGoogleAnalytics() {
        const gaId = App.config.GA_ID;
        
        // 创建 GA script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);

        // 初始化 gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('config', gaId, {
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=None;Secure'
        });

        console.log('[Analytics] Google Analytics 已加载，ID:', gaId);
    }

    // 初始化自定义统计
    function initCustomAnalytics() {
        App.analytics = {
            sessionStart: new Date(),
            sessionId: generateSessionId(),
            events: [],
            
            // 追踪页面访问
            trackPageView: function(pageName) {
                const event = {
                    type: 'pageview',
                    page: pageName,
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    language: navigator.language,
                    screenSize: `${window.screen.width}x${window.screen.height}`
                };
                this.events.push(event);
                this.sendToGA('page_view', { page_title: pageName });
                console.log('[Analytics] 页面访问:', event);
            },

            // 追踪计算事件
            trackCalculation: function(data) {
                const event = {
                    type: 'calculation',
                    platform: data.platform,
                    qValue: data.qValue,
                    fragmentLength: data.fragmentLength,
                    targetPM: data.targetPM,
                    result: data.result,
                    timestamp: new Date().toISOString()
                };
                this.events.push(event);
                this.sendToGA('calculation', {
                    platform: data.platform,
                    q_value: data.qValue,
                    fragment_length: data.fragmentLength,
                    target_pm: data.targetPM
                });
                console.log('[Analytics] 计算事件:', event);
            },

            // 追踪导出事件
            trackExport: function(format) {
                const event = {
                    type: 'export',
                    format: format,
                    timestamp: new Date().toISOString()
                };
                this.events.push(event);
                this.sendToGA('export', { format: format });
                console.log('[Analytics] 导出事件:', event);
            },

            // 追踪平台切换
            trackPlatformSwitch: function(platform) {
                const event = {
                    type: 'platform_switch',
                    platform: platform,
                    timestamp: new Date().toISOString()
                };
                this.events.push(event);
                this.sendToGA('platform_switch', { platform: platform });
                console.log('[Analytics] 平台切换:', event);
            },

            // 追踪语言切换
            trackLanguageSwitch: function(language) {
                const event = {
                    type: 'language_switch',
                    language: language,
                    timestamp: new Date().toISOString()
                };
                this.events.push(event);
                this.sendToGA('language_switch', { language: language });
                console.log('[Analytics] 语言切换:', event);
            },

            // 发送到 Google Analytics
            sendToGA: function(eventName, params) {
                if (window.gtag) {
                    gtag('event', eventName, params);
                }
            },

            // 获取会话统计
            getSessionStats: function() {
                return {
                    sessionId: this.sessionId,
                    sessionStart: this.sessionStart,
                    duration: Math.floor((new Date() - this.sessionStart) / 1000) + 's',
                    totalEvents: this.events.length,
                    calculations: this.events.filter(e => e.type === 'calculation').length,
                    exports: this.events.filter(e => e.type === 'export').length,
                    events: this.events
                };
            },

            // 导出本地统计数据
            exportLocalStats: function() {
                const stats = this.getSessionStats();
                const blob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `seqmix-stats-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
            }
        };

        // 追踪页面访问
        App.analytics.trackPageView('SeqMix Pro');

        console.log('[Analytics] 自定义统计系统已初始化');
    }

    // 生成会话ID
    function generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // 暴露到全局
    App.analyticsInit = initAnalytics;

    // 自动初始化（需要先配置 GA_ID）
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initAnalytics, 100);
        });
    } else {
        setTimeout(initAnalytics, 100);
    }
})();
