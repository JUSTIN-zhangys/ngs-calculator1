# SeqMix Pro

测序文库上机浓度计算工具 - 专业版

## 功能特性

### 📊 核心计算
- 支持多种测序平台（Nimbo, pro_1000M-S/T, EVO_3000M-S/T）
- 自动计算文库定量浓度
- 动态计算文库体积和缓冲液体积
- 智能稀释倍数计算

### 🌐 国际化
- 中英文双语切换
- 自动保存语言偏好
- 完整的翻译系统

### 📄 导出功能
- 专业 PDF 报告导出
- CSV 历史记录导出
- 支持中英文报告

### 📈 使用统计（新增）
- Google Analytics 集成
- 本地会话统计
- 事件追踪（计算、导出、平台切换等）
- 详细使用记录

### 📱 响应式设计
- 完美适配移动端
- 美观的界面设计
- 流畅的用户体验

## 快速开始

### 1. 基本使用
直接在浏览器打开 `index.html` 即可使用

### 2. 配置统计（可选）
编辑 `js/config.js`，填入您的 Google Analytics ID：
```javascript
GA_ID: 'G-YOUR-ID-HERE',
```

### 3. 部署到 GitHub
1. Fork 或克隆此仓库
2. 推送到 GitHub
3. 启用 GitHub Pages

## 文件结构

```
tes/
├── index.html              # 主页面
├── css/
│   └── style.css          # 样式文件
├── js/
│   ├── config.js          # 配置文件（新增）
│   ├── i18n.js            # 国际化模块
│   ├── platforms-config.js # 平台配置
│   ├── platform.js        # 平台管理
│   ├── calculator.js      # 计算引擎
│   ├── history.js         # 历史记录
│   ├── export.js          # 导出功能
│   ├── analytics.js       # 统计模块（新增）
│   ├── theme.js           # 主题管理
│   └── app.js             # 应用入口
├── ANALYTICS_SETUP.md     # 统计设置指南（新增）
└── README.md              # 本文件
```

## 统计功能说明

详细设置请查看 [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md)

### 追踪的事件
- 页面访问
- 平台选择
- 语言切换
- 计算操作（含参数）
- PDF/CSV 导出

### 查看本地统计
在浏览器控制台执行：
```javascript
App.analytics.getSessionStats()  // 查看统计
App.analytics.exportLocalStats()  // 导出统计
```

## 平台配置

已启用的平台：
- Nimbo（默认）
- pro_1000M-S
- pro_1000M-T
- EVO_3000M-S
- EVO_3000M-T

其他平台（NovaSeq, MiSeq, NovaSeq XP）已注释，可在 `index.html` 中取消注释启用。

## 作者

- **制作人**: zhangyuanshen (justin)
- **版本**: v1.0.0

## 许可证

本项目仅供学习和研究使用。

## 更新日志

### v1.0.0
- ✨ 新增完整的统计追踪系统
- ✨ 集成 Google Analytics
- ✨ 优化移动端响应式设计
- ✨ 添加中英文双语支持
- ✨ 新增 Nimbo 平台支持
- ✨ 专业 PDF 报告导出
- 📱 完美适配移动设备
