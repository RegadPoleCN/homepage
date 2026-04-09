# Homepage - 现代化个人主页

本项目基于ai编写,如有问题请在issue中指出,欢迎pr

一个基于 Vue 3 + TypeScript + Vite 构建的现代化、高性能个人主页。支持深度定制、多主题切换及实时服务监控，完全由配置文件驱动，无需修改代码即可快速搭建专属个人主页。

![License](https://img.shields.io/badge/license-GPL--v3-blue.svg)
![Vue](https://img.shields.io/badge/vue-3.x-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-latest-blue.svg)
![Vite](https://img.shields.io/badge/vite-7.x-purple.svg)

## 🌟 效果预览

- **现代化设计**：玻璃拟态（Glassmorphism）风格，流畅的动画交互
- **响应式布局**：完美适配手机、平板、桌面端
- **多主题支持**：7 种精美主题一键切换
- **实时监控**：集成 Uptime Kuma 展示服务状态
- **智能图标**：自动识别图片链接或 Iconify 图标
- **SEO 优化**：自动生成 meta 标签、结构化数据和站点地图
- **PWA 支持**：支持添加到主屏幕和离线访问
- **无障碍功能**：符合 WCAG AA 标准的可访问性设计
- **性能优化**：图片懒加载、资源预加载

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/RegadPoleCN/homepage.git
cd homepage
```

### 2. 安装依赖

```bash
pnpm install
# 或使用
npm install
# 或使用
yarn install
```

### 3. 配置个人信息

编辑 `src/config/site.config.json` 文件，修改以下内容：

```json
{
  "site": {
    "title": "{name} - 个人主页",
    "domain": "https://your-domain.com"
  },
  "profile": {
    "name": "你的名字",
    "avatar": "你的头像 URL",
    "bio": "一句话介绍自己",
    "occupation": "你的职业/职位",
    "description": [
      "这里是详细的个人简介，可以写多行内容。",
      "介绍你的技能、兴趣爱好、工作经历等。"
    ],
    "socialLinks": [
      {
        "key": "github",
        "icon": "mdi:github",
        "title": "GitHub",
        "url": "https://github.com/yourusername",
        "target": "_blank"
      }
    ]
  }
}
```

### 4. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:5173` 预览效果。

### 5. 生产环境构建

```bash
pnpm build
```

构建产物位于 `dist/` 目录，可直接部署到任意静态托管服务。

---

## 📖 配置指南

所有配置都在 `src/config/site.config.json` 文件中完成。

### 1. 站点配置 (Site)

```json
"site": {
  "title": "{name} - 个人主页",  // 支持模板变量 {name}, {bio}, {occupation}
  "domain": "https://your-domain.com"  // 用于 SEO 和站点地图
}
```

**模板变量说明**：
- `{name}` - 自动替换为你的名字
- `{bio}` - 自动替换为你的个人简介
- `{occupation}` - 自动替换为你的职业

### 2. 个人信息 (Profile)

```json
"profile": {
  "name": "你的名字",
  "avatar": "https://avatars.githubusercontent.com/u/0?v=4",
  "bio": "一句话介绍自己",
  "occupation": "你的职业/职位",
  "description": [
    "支持多行文本的简介内容",
    "每行会自动换行显示"
  ],
  "socialLinks": [
    {
      "key": "github",
      "icon": "mdi:github",          // 支持 Iconify 图标或图片 URL
      "title": "GitHub",
      "url": "https://github.com/yourusername",
      "target": "_blank"              // _blank 新窗口打开，_self 当前窗口
    }
  ]
}
```

**图标格式说明**：
- **Iconify 图标**：`"mdi:github"`、`"logos:vue"` 等（推荐）
- **图片链接**：`"https://example.com/icon.png"`
- **对象格式**：`{ "src": "mdi:github" }`

系统会**自动识别**图标类型并正确渲染。

### 3. 友情链接 (Friend Links)

```json
"friendLinks": [
  {
    "name": "友链名称",
    "url": "https://example.com",
    "avatar": "https://example.com/avatar.png",
    "description": "友链描述"
  }
]
```

### 4. 右栏区块配置 (Right Panel)

右栏的所有区块都可以通过 `sections` 数组自由调整顺序：

```json
"rightPanel": {
  "enableOrderConfig": true,
  "sections": [
    {
      "type": "personalWebsites",    // 个人网站
      "enabled": true,
      "title": "个人网站",
      "icon": "mdi:web",
      "items": [
        {
          "name": "个人博客",
          "url": "https://blog.example.com",
          "icon": "logos:blogger",
          "description": "我的技术博客"
        }
      ]
    },
    {
      "type": "uptimeKuma",          // 服务监控
      "enabled": true,
      "title": "服务状态",
      "icon": "mdi:server-heartbeat",
      "url": "https://status.example.com",
      "slug": "index"
    },
    {
      "type": "activities",          // 最新动态
      "enabled": true,
      "title": "最新动态",
      "icon": "mdi:post-outline",
      "items": [
        {
          "icon": "mdi:code-braces",
          "title": "开始了一个新项目",
          "time": "2024-12-10T10:00:00Z"  // 智能时间识别
        }
      ]
    },
    {
      "type": "skills",              // 技能专长
      "enabled": true,
      "title": "技能专长",
      "icon": "mdi:lightbulb-on",
      "items": [
        {
          "icon": "logos:vue",
          "name": "Vue.js"
        }
      ]
    },
    {
      "type": "projects",            // 精选项目
      "enabled": true,
      "title": "精选项目",
      "icon": "mdi:folder-multiple",
      "items": [
        {
          "icon": "logos:vue",
          "name": "项目名称",
          "description": "项目描述",
          "url": "https://github.com/yourname/project"
        }
      ]
    }
  ]
}
```

**调整顺序**：只需在 `sections` 数组中调整对象的顺序即可改变右栏卡片的显示顺序。

**启用/禁用**：设置 `"enabled": false` 可隐藏对应区块。

#### 4.1 智能时间格式 (Activities)

`time` 字段支持多种格式，系统会**自动识别**：

```json
{
  "icon": "mdi:rocket-launch",
  "title": "即将发布新版本",
  "time": "2026-12-31T23:59:59Z"    // ISO 日期字符串 → 自动计算相对时间
}
```

```json
{
  "icon": "mdi:code-tags",
  "title": "代码提交突破 1000 次",
  "time": 1702800000000             // 时间戳（毫秒）→ 自动计算相对时间
}
```

```json
{
  "icon": "mdi:trophy",
  "title": "获得开源贡献奖",
  "time": "上周"                     // 自定义文本 → 直接显示
}
```

**支持的格式**：
- **ISO 日期**：`"2024-12-10T10:00:00Z"` → "5 分钟前"、"2 小时前"
- **时间戳**：`1702800000000` → "3 天前"、"1 个月前"
- **自定义文本**：`"上周"`、`"2024 年 12 月"` → 直接显示
- **未来时间**：自动显示为 "5 分钟后"、"2 小时后"

#### 4.2 Uptime Kuma 配置

```json
{
  "type": "uptimeKuma",
  "enabled": true,
  "title": "服务状态",
  "icon": "mdi:server-heartbeat",
  "url": "https://status.example.com",  // 你的 Uptime Kuma 状态页 URL
  "slug": "index"                        // 状态页标识符
}
```

**获取配置方法**：
1. 部署 [Uptime Kuma](https://github.com/louislam/uptime-kuma)
2. 创建公开状态页（Status Page）
3. 复制状态页 URL 和 slug 填入配置

### 5. 主题配置 (Themes)

内置 7 种主题预设，用户可通过界面切换：

```json
"themes": [
  {
    "name": "浅色",
    "key": "light",
    "leftBg": "#e2e8f0",
    "centerBg": "#f1f5f9",
    "rightBg": "#f1f5f9",
    "primaryColor": "#3b82f6",
    "backgroundColor": "#f8fafc",
    "textColor": "#1e293b",
    "cardBackground": "#ffffff",
    "accentColor": "#6366f1"
  },
  {
    "name": "深色",
    "key": "dark",
    // ... 其他主题配置
  }
]
```

**自定义主题**：复制现有主题对象，修改颜色值并添加新的 `key` 即可。

### 6. 页脚信息 (Footer)

```json
"footer": {
  "icpBeian": "京 ICP 备 XXXXXXXX 号",
  "gonganBeian": "京公网安备 XXXXXXXXXXX 号",
  "gonganBeianCode": "XXXXXXXXXXX",
  "copyright": "你的名字",
  "startYear": 2024,
  "siteStartDate": "2024-01-01"
}
```

- `siteStartDate`：用于计算站点运行天数
- `startYear`：版权起始年份

---

## 🛠️ 技术栈

| 技术 | 用途 | 版本 |
|------|------|------|
| [Vue 3](https://vuejs.org/) | 前端框架 | 3.x |
| [TypeScript](https://www.typescriptlang.org/) | 开发语言 | Latest |
| [Vite](https://vitejs.dev/) | 构建工具 | 7.x |
| [Pinia](https://pinia.vuejs.org/) | 状态管理 | Latest |
| [VueUse](https://vueuse.org/) | 工具库 | Latest |
| [Iconify](https://iconify.design/) | 图标库 | Latest |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | PWA 支持 | Latest |
| [vite-plugin-sitemap](https://github.com/jbaubree/vite-plugin-sitemap) | 站点地图生成 | Latest |

---

## 📂 项目结构

```
src/
├── assets/              # 静态资源（图片、字体等）
├── components/          # UI 组件
│   ├── LeftSidebar.vue       # 左侧边栏（个人信息）
│   ├── CenterPanel.vue       # 中央内容区（关于我、朋友链接）
│   ├── RightPanel.vue        # 右侧边栏（动态、技能、项目等）
│   ├── SmartIcon.vue         # 智能图标组件（自动识别类型）
│   ├── UptimeCard.vue        # Uptime Kuma 监控卡片
│   ├── SettingsModal.vue     # 设置弹窗（主题切换）
│   ├── Skeleton.vue          # 骨架屏组件
│   ├── SiteStats.vue         # 站点统计
│   ├── GitHubBadge.vue       # GitHub 徽章
│   └── Footer.vue            # 页脚组件
├── composables/         # 组合式函数（逻辑复用）
│   ├── useTheme.ts           # 主题控制
│   ├── useUptimeKuma.ts      # Uptime Kuma 数据抓取
│   ├── useScrollToTop.ts     # 回到顶部功能
│   ├── useSiteStats.ts       # 站点统计
│   └── useStructuredData.ts  # 结构化数据生成
├── config/              # 配置文件
│   ├── site.config.ts        # 配置类型定义
│   └── site.config.json      # 主要配置文件
├── stores/              # Pinia 状态仓库
│   └── theme.ts              # 主题状态管理
├── utils/               # 工具函数
│   ├── icon.ts               # 图标类型识别
│   ├── format.ts             # 时间格式化
│   ├── sentry.ts             # Sentry 错误监控
│   └── seoGenerator.ts       # SEO 元数据生成
├── App.vue              # 根组件
└── main.ts              # 入口文件
```

---

## ⌨️ 开发命令

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器（热重载）
```bash
pnpm dev
```

### 类型检查
```bash
pnpm type-check
```

### 生产环境构建
```bash
pnpm build
```

### 预览构建结果
```bash
pnpm preview
```

**注意**：构建产物使用相对路径 (`./`)，支持直接部署在子目录下。

---

## 🚀 部署指南

### 方式一：Vercel 部署

1. 安装 Vercel CLI：
   ```bash
   npm i -g vercel
   ```

2. 在项目根目录执行：
   ```bash
   vercel
   ```

3. 按提示操作即可完成部署

### 方式二：GitHub Pages

1. 修改 `vite.config.ts` 中的 `base` 为你的仓库名：
   ```typescript
   base: '/your-repo-name/',
   ```

2. 构建项目：
   ```bash
   pnpm build
   ```

3. 将 `dist` 目录推送到 `gh-pages` 分支

4. 在 GitHub 仓库设置中启用 GitHub Pages

### 方式三：任意静态托管

构建后的 `dist` 目录可部署到：
- Nginx / Apache
- Netlify
- Cloudflare Pages
- 阿里云 OSS
- 腾讯云 COS

### 部署注意事项

1. **SEO 配置**：确保 `site.domain` 配置为你的实际域名
2. **PWA 图标**：建议在 `public/` 目录添加 `pwa-192x192.png` 和 `pwa-512x512.png` 图标
3. **站点地图**：构建时会自动生成 `sitemap.xml` 和 `robots.txt`

---

## ✨ 新功能特性

### SEO 优化
- **自动生成 meta 标签**：title、description、keywords 等
- **Open Graph 协议**：支持社交媒体分享
- **Twitter Card**：优化 Twitter 分享
- **结构化数据**：JSON-LD 格式的 Schema.org 数据
- **站点地图**：自动生成 sitemap.xml
- **robots.txt**：自动生成爬虫规则

### PWA 支持
- **离线访问**：添加到主屏幕后可离线使用
- **推送通知**：支持推送通知（需配置）
- **缓存策略**：智能缓存静态资源
- **响应式图标**：自动适配不同设备

### 无障碍功能
- **语义化 HTML**：使用正确的 HTML 标签
- **ARIA 标签**：增强屏幕阅读器支持
- **跳过导航**：支持键盘导航快捷方式
- **焦点管理**：清晰的键盘焦点状态
- **颜色对比度**：符合 WCAG AA 标准

### 性能优化
- **图片懒加载**：自动延迟加载图片
- **资源预加载**：预加载关键资源
- **代码分割**：按需加载组件
- **骨架屏**：提供加载状态反馈
- **错误处理**：优雅的错误边界

### 智能功能
- **自动 SEO 生成**：从配置中智能推导 SEO 内容
- **智能时间格式**：自动计算相对时间
- **智能图标识别**：自动识别 Iconify 图标和图片链接
- **智能错误处理**：Uptime Kuma 数据抓取的错误重试

---

## ❓ 常见问题

### Q: 如何更换图标？
A: 在 [Iconify](https://icon-sets.iconify.design/) 网站搜索喜欢的图标，复制图标名称（如 `mdi:github`）填入配置的 `icon` 字段。

### Q: 可以使用自己的图片作为图标吗？
A: 可以！直接填入图片 URL 即可，系统会自动识别：
```json
"icon": "https://example.com/my-icon.png"
```

### Q: 如何让最新动态显示自定义文字而不是时间？
A: 在 `time` 字段填入非日期格式的文本即可：
```json
"time": "上周"  // 或 "2024 年 12 月"、"昨天" 等
```

### Q: 如何隐藏某个右栏区块？
A: 设置 `"enabled": false`：
```json
{
  "type": "skills",
  "enabled": false,  // 隐藏技能区块
  "title": "技能专长"
}
```

### Q: 如何调整右栏区块的顺序？
A: 在 `rightPanel.sections` 数组中调整对象的顺序即可，排在前面的会先显示。

### Q: 站点运行天数如何计算？
A: 根据 `footer.siteStartDate` 配置自动计算，格式为 `YYYY-MM-DD`。

### Q: 如何配置 SEO 信息？
A: SEO 信息会从 `profile` 配置中自动生成，包括：
- `title`：从 `site.title` 模板生成
- `description`：从 `bio`、`description` 和 `skills` 生成
- `keywords`：从 `occupation` 和 `skills` 生成

### Q: PWA 功能如何使用？
A: 构建后部署到 HTTPS 环境，浏览器会提示添加到主屏幕。

---

## 📄 开源协议

本项目采用 [GPL-v3](LICENSE) 协议开源。

---

## 📮 问题反馈

如有问题或建议，欢迎提交 [Issue](https://github.com/RegadPoleCN/homepage/issues)。