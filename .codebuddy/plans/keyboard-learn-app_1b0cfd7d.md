---
name: keyboard-learn-app
overview: 用 Vite + TypeScript 构建一个面向7岁儿童的键盘学习网页应用，包含键盘布局教学（带手指示意图）、键盘熟悉练习、英文单词打字练习等模块，具有游戏化元素。使用 HTML Canvas + DOM 混合方式实现，避免过度依赖重型游戏引擎。
design:
  architecture:
    framework: html
  styleKeywords:
    - 卡通可爱
    - 温暖明亮
    - 儿童友好
    - 渐变色
    - 圆角卡片
    - 动态反馈
  fontSystem:
    fontFamily: PingFang SC, Comic Sans MS, 微软雅黑
    heading:
      size: 36px
      weight: 700
    subheading:
      size: 24px
      weight: 600
    body:
      size: 18px
      weight: 400
  colorSystem:
    primary:
      - "#FF6B6B"
      - "#4ECDC4"
      - "#FFE66D"
    background:
      - "#FFF8E7"
      - "#FFFFFF"
    text:
      - "#2D3436"
      - "#FFFFFF"
    functional:
      - "#00B894"
      - "#FF6B6B"
      - "#FFE66D"
todos:
  - id: init-project
    content: 用 Vite + TypeScript 初始化工程，配置 package.json 和 tsconfig.json
    status: completed
  - id: keyboard-data
    content: 实现键盘布局数据和手指-键位映射模块 keyboard.ts 与 finger-map.ts
    status: completed
    dependencies:
      - init-project
  - id: canvas-render
    content: 实现 Canvas 渲染模块，绘制键盘布局和手指示意图
    status: completed
    dependencies:
      - keyboard-data
  - id: practice-modes
    content: 实现键盘熟习练习和英文单词打字练习两种模式逻辑
    status: completed
    dependencies:
      - canvas-render
  - id: ui-pages
    content: 实现主菜单、练习页面 UI，包括卡通风格 CSS 样式和动画反馈
    status: completed
    dependencies:
      - practice-modes
  - id: score-storage
    content: 实现计分系统、连击奖励和 LocalStorage 进度持久化
    status: completed
    dependencies:
      - ui-pages
---

## 产品概述

一款面向7岁左右儿童的键盘学习练习网页应用，帮助孩子掌握键盘布局、指法及打字技能。

## 核心功能

- **键盘布局认识**：在屏幕上展示标准键盘主键盘区，并显示手指放置位置示意图（用Canvas绘制手和手指指向对应键位）
- **键盘熟习练习**：随机出现字母/符号，提示用哪个手指按哪个键，孩子按对后得分并进入下一题
- **英文单词打字练习**：显示简单英文单词，孩子按顺序输入，实时反馈正确/错误
- **游戏化元素**：积分系统、连击奖励、可爱的动画反馈（如星星、烟花效果），增加趣味性
- **进度追踪**：本地记录练习成绩和进步情况

## 技术栈选择

- **构建工具**：Vite
- **开发语言**：TypeScript
- **前端框架**：原生 HTML + CSS + JavaScript（模块化通过 Vite + TypeScript 实现，不引入 React/Vue，减少复杂度，更适合游戏式交互）
- **渲染方式**：HTML DOM + CSS 动画为主，Canvas 2D 用于手指位置示意图渲染
- **状态管理**：TypeScript 模块级状态管理
- **持久化**：LocalStorage

## 实施方案

### 整体策略

采用 Vite + TypeScript 构建工程，以模块化 ES Module 组织代码。交互以 HTML DOM 为主，CSS 动画提供反馈；手指示意图和键盘可视化用 Canvas 2D 绘制，确保清晰直观。不引入 pixi.js / phaser.js，保持轻量，加载快，适合儿童使用。

### 关键决策

1. **不引入前端框架（React/Vue）**：本项目以游戏式交互和 Canvas 渲染为主，原生 DOM 操作更灵活，且减少依赖
2. **Canvas 用于手指示意图**：键盘布局 + 手指位置用 Canvas 绘制，可精确控制每个手指的指向和动画
3. **CSS 动画用于反馈**：打字正确/错误、得分、连击等用 CSS 动画，性能好且实现简单
4. **TypeScript 模块化**：将键盘布局、练习逻辑、游戏状态等分模块，便于维护

### 性能与可靠性

- Canvas 渲染仅在需要更新时重绘，避免不必要的性能消耗
- 键盘事件监听采用事件委托，减少内存占用
- LocalStorage 读写采用防抖，避免频繁 I/O

## 架构设计

### 系统架构

采用模块化分层架构：

- **UI 层**：DOM 元素 + CSS 动画，负责界面展示和用户交互
- **渲染层**：Canvas 模块，负责键盘布局和手指示意图的绘制
- **逻辑层**：练习模式、游戏状态、评分逻辑
- **数据层**：LocalStorage 封装，负责进度持久化

### 数据流

用户按键 → 键盘事件监听 → 逻辑层判断（正确/错误）→ 更新游戏状态 → UI 层反馈（动画/音效）+ Canvas 更新手指位置

## 目录结构

```
f:/keyboard-learn/
├── index.html              # 入口页面
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
├── src/
│   ├── main.ts            # 入口脚本
│   ├── styles/
│   │   └── main.css       # 全局样式（卡通风格，适合儿童）
│   ├── modules/
│   │   ├── keyboard.ts    # 键盘布局数据（键位、手指分配）
│   │   ├── finger-map.ts  # 手指-键位映射逻辑
│   │   ├── practice.ts    # 练习模式基类
│   │   ├── free-play.ts   # 键盘熟习练习模式
│   │   ├── word-play.ts   # 英文单词打字练习模式
│   │   └── score.ts       # 计分与进度管理
│   ├── canvas/
│   │   ├── keyboard-canvas.ts  # Canvas 键盘渲染
│   │   └── finger-canvas.ts   # Canvas 手指示意图渲染
│   ├── ui/
│   │   ├── menu.ts        # 主菜单界面
│   │   ├── hud.ts         # 游戏 HUD（分数、连击）
│   │   └── feedback.ts    # 视觉反馈动画（正确/错误）
│   └── utils/
│       ├── storage.ts     # LocalStorage 封装
│       └── sound.ts       # 音效管理（可选）
└── public/
    └── assets/            # 静态资源（图片、音效）
```

## 关键代码结构

### 手指-键位映射接口

```typescript
// 手指编号：0-9 代表左右手各手指
// 左手：0-小指, 1-无名指, 2-中指, 3-食指, 4-拇指
// 右手：5-拇指, 6-食指, 7-中指, 8-无名指, 9-小指
interface FingerKeyMap {
  finger: number;
  key: string;
  row: number; // 0=功能行, 1=主行, 2=下行
}

interface PracticeQuestion {
  key: string;
  expectedFinger: number;
  hint: string;
}
```

## 设计风格

采用卡通可爱风格，适合7岁儿童使用。整体色调温暖明亮，界面简洁直观。

## 页面规划（共3个核心页面）

### 1. 主菜单页面

- **顶部标题区**：应用名称"键盘小达人"，搭配卡通键盘图标，大字号，渐变色标题
- **模式选择区**：两个大按钮卡片，"键盘熟习练习"和"英文单词打字"，每个卡片有对应图标，悬停有放大动画
- **底部区域**：进度展示（星星数量），设置按钮

### 2. 键盘熟习练习页面

- **顶部 HUD**：当前分数、连击数、返回按钮
- **中央提示区**：大号字母显示当前要按的键，配文字提示"请用左手食指按下 F 键"
- **手指示意图区（Canvas）**：屏幕下方展示键盘和手，高亮当前手指和对应键位，手指用不同颜色区分
- **底部键盘区**：虚拟键盘，按下的键有动画反馈

### 3. 英文单词打字练习页面

- **顶部 HUD**：分数、计时器、返回按钮
- **单词显示区**：当前单词每个字母分开显示，已输入字母变绿色，当前字母高亮，未输入灰色
- **手指示意图区（Canvas）**：同练习模式，但跟随当前字母动态更新手指提示
- **底部键盘区**：虚拟键盘，实时高亮应该用哪个手指按的键

## 交互设计

- 按键正确：绿色闪光 + 上升星星动画 + 正确音效
- 按键错误：红色抖动 + 提示正确手指
- 连击奖励：每5次连击显示特殊动画（烟花/彩虹）
- 手指示意图：Canvas 绘制左右手，手指用不同颜色，当前激活手指有脉冲动画