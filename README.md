# 键盘小达人

面向约 7 岁儿童的键盘学习网页。孩子可以认识标准键盘布局、对照手指位置练习按键，并完成简单的英文单词打字。界面用卡通风格，练习过程有计时、得分、连击和完成评价。

在线地址（GitHub Pages）：[https://dodio.github.io/keyboard-learn/](https://dodio.github.io/keyboard-learn/)

## 练习模式

| 模式 | 内容 | 题量 |
| --- | --- | --- |
| 键盘熟习练习 | 从字母键和空格键中随机出题，并提示该用哪根手指 | 20 题 |
| 按字母顺序练习 | 从 A 到 Z 依次认识字母键 | 26 题 |
| 数字键练习 | 练习数字行 `0`–`9` | 20 题 |
| 英文单词打字 | 逐字母输入简单英文单词 | 10 个单词 |
| 全键盘练习 | 覆盖主键盘区，含 Ctrl、Shift、Alt、空格等 | 30 题 |

练习时屏幕会同时显示：

- 当前要按的键，以及对应手指名称
- 手指位置示意图
- 键盘布局，并高亮目标键
- 用时、分数、连击和进度

答对得 10 分。单键练习里，每 5 连击会提高这一题的得分倍数。按错会清掉当前连击，并提示按到了哪个键。空格键或暂停按钮可以暂停；暂停时间不计入用时。

完成一轮后会显示分数、正确数、最长连击和用时，可以选择再练一次或返回菜单。

## 进度

成绩保存在浏览器本地（`localStorage`，键名 `keyboard-learn-progress`），包括累计分数、各模式最高分、练习次数和星星。每累计 100 分获得 1 颗星，主菜单会显示星星数和练习次数。清除站点数据后，进度会一起消失。

## 本地运行

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

常用命令：

```bash
npm run dev      # 启动开发服务器
npm run build    # 类型检查并构建到 dist/
npm run preview  # 预览构建结果
```

`vite.config.ts` 里的 `base` 是 `/keyboard-learn/`，与 GitHub Pages 的仓库路径一致。如果仓库名不同，需要改这个值后再构建。

## 部署

推送到 `master` 分支后，GitHub Actions 会执行 `npm ci` 和 `npm run build`，并把 `dist/` 发布到 GitHub Pages。

## 技术栈

- [Vite](https://vite.dev/) 构建
- TypeScript
- 原生 DOM 与 CSS 动画
- Canvas 2D 绘制键盘和手指示意图
- 不使用 React、Vue 或游戏引擎

## 目录

```
keyboard-learn/
├── index.html
├── vite.config.ts
├── src/
│   ├── main.ts                 # 入口：菜单、练习页、键盘事件
│   ├── styles/main.css         # 界面样式
│   ├── modules/
│   │   ├── keyboard.ts         # 键位与手指分配数据
│   │   ├── finger-map.ts       # 出题与指法判断
│   │   ├── practice.ts         # 练习状态与计时
│   │   ├── free-play.ts        # 单键练习（熟习 / 字母 / 数字 / 全键盘）
│   │   ├── word-play.ts        # 单词打字
│   │   └── score.ts            # 计分与本地进度
│   ├── canvas/
│   │   ├── keyboard-canvas.ts  # 键盘绘制
│   │   └── finger-canvas.ts    # 手指示意
│   └── ui/
│       ├── menu.ts             # 主菜单
│       └── feedback.ts         # 对错反馈与完成页
└── .github/workflows/deploy.yml
```

源码仓库：[github.com/dodio/keyboard-learn](https://github.com/dodio/keyboard-learn)
