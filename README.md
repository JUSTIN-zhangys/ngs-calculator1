# 测序文库上机浓度计算工具

Illumina NGS 测序文库上机浓度与混合方案计算工具，支持多种机型一键切换，动态展示各平台特有的试剂配比和实验步骤。

## 功能特性

- **多平台支持** — NovaSeq / HiSeq 4000 / MiSeq / NextSeq / NovaSeq XP / PRO_P / EVO_P 等
- **自定义模式** — 自由设定上机浓度和体积
- **动态试剂输入** — 根据所选平台自动显示对应的试剂输入框
- **混合方案展示** — 按各平台实验规范展示添加顺序和体积
- **历史记录** — 保存本次会话的计算记录，支持删除
- **导出 PDF** — 生成单次计算报告
- **导出 CSV** — 导出全部历史记录
- **暗黑模式** — 一键切换护眼主题

## 快速开始

直接用浏览器打开 `index.html` 即可使用，无需任何后端服务。

```bash
# 或用任意 HTTP 服务器启动
npx http-server -p 8080
```

## 使用说明

1. **选择机型** — 点击顶部平台按钮切换
2. **输入参数** — 填写 Q 实测定量、片段长度等基础参数
3. **调整试剂** — 各平台试剂默认值自动填充，可按需修改
4. **点击计算** — 右侧实时显示结果与混合方案
5. **保存/导出** — 可将结果保存至历史记录或导出 PDF/CSV

## 项目结构

```
tes/
├── index.html                   # 主页面（HTML 结构）
├── README.md                    # 本文件
├── css/
│   └── style.css                # 样式表
├── js/
│   ├── platforms-config.js      # 平台配置数据（维护入口）
│   ├── platform.js              # 平台选择与动态渲染
│   ├── calculator.js            # 核心计算逻辑
│   ├── history.js               # 历史记录管理
│   ├── export.js                # PDF / CSV 导出
│   ├── theme.js                 # 暗黑模式切换
│   └── app.js                   # 应用初始化与重置
└── index1.html                  # 原始单文件备份
```

## 如何维护

### 新增平台

编辑 `js/platforms-config.js`，在 `PLATFORMS` 数组中添加一个配置对象：

```javascript
{
  id: 'new_platform',             // 唯一标识
  name: '新平台名称',              // 显示名称
  targetPM: 125,                  // 上机浓度 (pM)
  loadVolume: 1500,               // 上机体积 (μL)
  reagents: [                     // 试剂列表
    { id: 'rmp1', label: 'RMP1 (μL)', defaultValue: 750 },
    { id: 'rmp2', label: 'RMP2 (μL)', defaultValue: 600 }
  ],
  mixProtocol: [                  // 混合步骤（类型: reagent / sample / buffer）
    { type: 'reagent', ref: 'rmp1', component: 'RMP1',
      stepLabel: '第1步', description: 'Read Mix Primer 1（先加）' },
    { type: 'buffer',  component: 'RMP4',
      stepLabel: '第2步', description: '补足缓冲液/水' },
    { type: 'sample',  component: '文库原液',
      stepLabel: '第3步', description: '根据稀释倍数计算' },
    { type: 'reagent', ref: 'rmp2', component: 'RMP2',
      stepLabel: '第4步', description: 'Read Mix Primer 2（最后加）' }
  ],
  bufferComponent: 'RMP4'         // 补足液显示名称
}
```

然后在 `index.html` 的平台按钮区添加对应按钮即可。

### 修改现有平台

直接修改 `platforms-config.js` 中对应配置项的参数即可，无需改动其他模块。

## 计算原理

```
定量浓度 (nM)     = (Q值 × 10⁶) / (660 × 片段长度)
上机浓度 (nM)     = 上机浓度 (pM) / 1000
文库原液体积 (μL) = (上机浓度(nM) × 上机体积) / 定量浓度(nM)
补足体积 (μL)     = 上机体积 - 原液体积 - Σ(各试剂体积)
稀释倍数          = 定量浓度(nM) / 上机浓度(nM)
```

## 技术栈

- 纯原生 HTML / CSS / JavaScript
- [jsPDF](https://github.com/parallax/jsPDF) — PDF 导出
- 模块化 IIFE 模式，通过全局 `App` 命名空间共享状态