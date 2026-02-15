# Homepage - 现代化个人主页

本项目由 Trae 使用 AI 协作开发，是一个基于 Vue 3 + TypeScript + Vite 构建的现代化、高性能个人主页。支持深度定制、多主题切换及实时服务监控。

## 🚀 核心特性

- **✨ 现代化 UI/UX**：基于玻璃拟态（Glassmorphism）风格设计，拥有流畅的进入动画与交互效果。
- **🌓 深度主题系统**：内置 7 种精美主题预设，支持一键切换并实时持久化存储。
- **📊 实时服务监控**：深度集成 [Uptime Kuma](https://uptime.kuma.pet/) API，实时展示服务在线率及 24 小时运行历史。
- **📈 站点数据统计**：自动统计页面访问量（PV）并基于配置的起始时间实时计算站点运行天数。
- **📱 完美移动端适配**：针对手机端进行深度优化，确保在各种屏幕尺寸下均能获得最佳浏览体验。
- **⚙️ 全面配置驱动**：无需修改代码，通过 `src/config/site.config.json` 即可定制个人信息、社交链接、友链及监控项。
- **⌨️ 开发者友好**：基于 TypeScript 编写，提供完善的类型检查与代码补全。

## 🛠️ 技术栈

- **框架**: [Vue 3 (Composition API)](https://vuejs.org/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **构建工具**: [Vite 7](https://vitejs.dev/)
- **工具库**: [VueUse](https://vueuse.org/)
- **图标库**: [Iconify](https://iconify.design/)
- **开发语言**: [TypeScript](https://www.typescriptlang.org/)

## 📂 项目结构

```text
src/
├── assets/          # 静态资源 (图片、字体等)
├── components/      # UI 组件
│   ├── LeftSidebar.vue   # 个人基本信息侧边栏
│   ├── CenterPanel.vue   # 核心内容区 (自我介绍、关于我)
│   ├── RightPanel.vue    # 动态信息区 (监控卡片、友链)
│   ├── UptimeCard.vue    # Uptime Kuma 监控组件
│   ├── SiteStats.vue     # 站点统计组件 (PV、运行时长)
│   └── SettingsModal.vue # 全局设置与主题切换
├── composables/     # 逻辑封装 (主题控制、监控数据抓取等)
├── config/          # 核心配置文件 (site.config.json)
├── stores/          # Pinia 状态仓库 (主题状态等)
├── App.vue          # 根容器与布局控制
└── main.ts          # 入口文件
```

## ⚙️ 快速配置

编辑 `src/config/site.config.json` 即可快速上线：

- **Profile**: 设置姓名、头像、简介。`description` 字段支持数组格式以实现**自动换行**。
- **friendLinks**: 可扩展的友链列表
- **Uptime Kuma**: 配置 `url` 和 `slug` 即可启用实时服务监控。
- **Site Stats**: 设置 `siteStartDate`（格式：`YYYY-MM-DD`）来显示站点运行时间。
- **Footer**: ICP 备案、公安备案及版权声明信息。

## 🛠️ 开发与构建

### 安装依赖
```bash
pnpm install
```

### 启动开发环境
```bash
pnpm dev
```

### 生产环境构建
```bash
pnpm build
```
*注：构建产物默认使用相对路径 (`./`)，支持直接部署在子目录下。*

## 📄 开源协议

本项目采用 [GPL-v3](LICENSE) 协议开源。
