# Homepage - 个人主页

本项目由trae使用ai编写，非作者手写，有问题请在issue中指出或提交pr，谢谢

一个基于 Vue 3 + TypeScript + Vite 构建的现代化个人主页。支持多主题切换、响应式设计，并完全由配置文件驱动

## 🚀 特性

- **多主题切换**：内置 6 种精美主题（浅色、深色、海洋、森林、紫罗兰、暖阳），并支持自定义背景
- **配置驱动**：所有个人信息、社交链接、友链和页脚信息均可通过 `src/config/site.config.json` 进行配置
- **现代化技术栈**：使用 Vue 3 (Composition API), TypeScript, Vite
- **响应式设计**：完美适配不同尺寸的屏幕
- **组件化开发**：清晰的项目结构，易于扩展和维护

## 🛠️ 技术栈

- **框架**: [Vue 3](https://vuejs.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **图标**: [Iconify](https://iconify.design/)
- **工具库**: [VueUse](https://vueuse.org/)

## 📂 项目结构

```text
src/
├── assets/          # 静态资源
├── components/      # UI 组件
│   ├── LeftSidebar.vue   # 左侧侧边栏 (个人信息)
│   ├── CenterPanel.vue   # 中间面板 (主要内容)
│   ├── RightPanel.vue    # 右侧面板 (额外信息)
│   ├── Footer.vue        # 页脚组件
│   └── SettingsModal.vue # 设置模态框 (主题切换)
├── composables/     # 组合式函数 (如 useTheme)
├── config/          # 配置文件 (site.config.json)
├── App.vue          # 根组件
└── main.ts          # 入口文件
```

## ⚙️ 配置指南

编辑 `src/config/site.config.json` 来定制你的主页：

- `profile`: 个人头像、名字、简介和社交链接
- `friendLinks`: 合作伙伴或朋友的链接列表
- `footer`: ICP 备案号、公安备案号和版权信息
- `themes`: 主题颜色配置

## 🛠️ 开发与构建

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览构建产物

```bash
pnpm preview
```

## 📄 开源协议

本项目采用 [GPL-v3](LICENSE) 协议开源
