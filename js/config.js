// =============================================
// SeqMix Pro 配置文件
// =============================================
// 在使用前，请配置您的 Google Analytics ID
// =============================================

(function() {
    'use strict';

    App.config = {
        // ==================== Google Analytics 配置 ====================
        // 请在此处填写您的 Google Analytics ID (格式: G-XXXXXXXXXX)
        // 如果没有，可以留空，系统将只记录本地统计
        GA_ID: 'G-5450PM18V3',

        // ==================== 应用信息 ====================
        APP_NAME: 'SeqMix Pro',
        VERSION: '1.0.0',
        AUTHOR: 'zhangyuanshen (justin)',

        // ==================== 统计配置 ====================
        ENABLE_ANALYTICS: true,  // 是否启用统计
        ENABLE_GA: true,         // 是否启用 Google Analytics
        ENABLE_LOCAL_STATS: true,// 是否启用本地统计存储

        // ==================== 其他配置 ====================
        DEBUG_MODE: false,       // 调试模式（会在控制台输出更多信息）
    };

    console.log('[Config] 配置已加载');
})();
