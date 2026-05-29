# SeqMix Pro 统计功能设置指南

## 概述

SeqMix Pro 现在集成了完整的使用统计功能，可以追踪：

- 页面访问
- 平台选择
- 语言切换
- 计算操作（含参数和结果）
- PDF/CSV 导出

## 快速开始

### 1. 配置 Google Analytics

1. 访问 [Google Analytics](https://analytics.google.com)
2. 创建一个新的媒体资源（Web）
3. 获取您的 Measurement ID（格式：G-XXXXXXXXXX）
4. 打开 `js/config.js` 文件
5. 将 ID 填入 `GA_ID` 字段：

```javascript
GA_ID: 'G-YOUR-ID-HERE',
```

### 2. 部署到 GitHub Pages

1. 将代码推送到 GitHub
2. 在仓库设置中启用 GitHub Pages
3. 访问您的应用，统计数据将自动发送到 Google Analytics

## 功能说明

### 本地统计（无需配置）

即使不配置 Google Analytics，应用也会在浏览器本地记录统计数据：

```javascript
// 在浏览器控制台中执行
App.analytics.getSessionStats()  // 获取当前会话统计
App.analytics.exportLocalStats()  // 导出本地统计为 JSON
```

### 追踪的事件

| 事件类型 | 描述 | 参数 |
|---------|------|------|
| pageview | 页面访问 | page, userAgent, language, screenSize |
| platform_switch | 平台切换 | platform |
| language_switch | 语言切换 | language |
| calculation | 计算操作 | platform, qValue, fragmentLength, targetPM, result |
| export | 导出操作 | format (PDF/CSV) |

## Google Analytics 查看

1. 登录 Google Analytics
2. 进入 "报告" → "事件"
3. 查看所有追踪的事件
4. 可以按日期、平台、语言等维度筛选

## 隐私说明

- IP 地址已匿名化（anonymize_ip）
- 不收集个人身份信息
- 仅收集使用统计数据
- 用户可以通过浏览器禁用追踪

## 配置选项

在 `js/config.js` 中可以调整：

```javascript
ENABLE_ANALYTICS: true,    // 是否启用统计
ENABLE_GA: true,          // 是否启用 Google Analytics
ENABLE_LOCAL_STATS: true, // 是否启用本地统计
DEBUG_MODE: false,        // 调试模式（控制台输出）
```

## 故障排除

### 统计数据没有显示？

1. 检查 GA_ID 是否正确配置
2. 打开浏览器控制台查看错误信息
3. 确保没有被广告拦截器阻止
4. 等待 24-48 小时让数据显示在 GA 中

### 如何禁用统计？

在 `js/config.js` 中设置：
```javascript
ENABLE_ANALYTICS: false
```

## 技术细节

- 使用 Google Analytics 4 (GA4)
- 通过 gtag.js 发送事件
- 本地统计存储在内存中（会话级别）
- 所有事件在浏览器控制台有日志输出

## 示例：查看统计数据

在浏览器控制台中：

```javascript
// 查看当前会话统计
console.log(App.analytics.getSessionStats());

// 导出统计数据
App.analytics.exportLocalStats();
```

## 下一步

- 配置自定义仪表板
- 设置转化追踪
- 创建报告
