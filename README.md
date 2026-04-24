# Homepage - 现代化个人主页

一个基于 Vue 3 + TypeScript + Vite 构建的现代化、高性能个人主页。支持深度定制、多主题切换及实时服务监控，完全由配置文件驱动，无需修改代码即可快速搭建专属个人主页。

![License](https://img.shields.io/badge/license-GPL--v3-blue.svg)
![Vue](https://img.shields.io/badge/vue-3.x-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-latest-blue.svg)
![Vite](https://img.shields.io/badge/vite-7.x-purple.svg)

## 🌟 核心特性

### 设计与体验
- **玻璃拟态设计**：Glassmorphism 风格，流畅的动画交互
- **响应式布局**：完美适配手机、平板、桌面端（移动端触摸优化）
- **7 种主题预设**：浅色/深色/海洋/森林/紫罗兰/暖阳/自定义背景
- **平滑过渡动画**：尊重 `prefers-reduced-motion` 无障碍偏好
- **骨架屏加载**：多种布局模式 + shimmer 动画效果

### SEO 优化
- **多类型结构化数据**：JSON-LD 格式（Person + WebSite + BreadcrumbList）
- **Open Graph 协议**：支持自定义社交分享图片 (og:image)
- **Twitter Card**：优化 Twitter 分享展示
- **自动 Meta 生成**：从配置智能推导 title、description、keywords
- **站点地图 & robots.txt**：构建时自动生成

### PWA 支持
- **离线访问**：Service Worker 缓存关键资源
- **添加到主屏幕**：完整的 Apple Web App meta 标签
- **theme-color 响应式**：自动适配系统深色/浅色模式

### 可访问性（WCAG 2.1 AA）
- **语义化 HTML**：正确的 landmark 角色（header/nav/main/aside/footer）
- **完整 ARIA 支持**：role、aria-label、aria-live、aria-modal
- **焦点管理系统**：模态框焦点陷阱（useFocusTrap composable）
- **键盘导航优化**：skip-link + Tab 序列符合视觉流
- **高对比度模式**：`forced-colors` 媒体查询适配

### 性能优化
- **资源预加载**：DNS prefetch / preconnect / modulepreload
- **字体优化**：`display=swap` 避免 FOIT
- **SRI 完整性校验**：外部脚本防篡改
- **Web Vitals 监控**：开发环境实时 LCP/INP/CLS 指标输出
- **代码分割**：vendor chunks 独立打包

### 安全性
- **CSP 配置指南**：Content-Security-Policy 完整文档
- **安全头配置**：5 平台部署示例（nginx/Apache/Netlify/Vercel/Cloudflare）
- **Referrer Policy**：`strict-origin-when-cross-origin`
- **Subresource Integrity**：外部资源完整性校验

### 智能功能
- **智能图标识别**：自动识别 Iconify 图标或图片 URL
- **智能时间格式**：ISO 日期 / 时间戳 / 自定义文本 自动处理
- **实时服务监控**：Uptime Kuma 集成，状态卡片 + 心跳历史
- **站点统计**：运行天数、访问量（不蒜子）

---

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/RegadPoleCN/homepage.git
cd homepage
```

### 2. 安装依赖

```bash
pnpm install
# 或使用 npm install / yarn install
```

### 3. 配置个人信息

编辑 `src/config/site.config.json`：

```json
{
  "site": {
    "title": "{name} - 个人主页",
    "domain": "https://your-domain.com"
  },
  "profile": {
    "name": "你的名字",
    "avatar": "https://avatars.githubusercontent.com/u/0?v=4",
    "bio": "一句话介绍自己",
    "occupation": "你的职业/职位"
  }
}
```

### 4. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:5173` 预览效果。

### 5. 生产构建

```bash
pnpm build
```

构建产物位于 `dist/` 目录。

---

## 📖 配置指南

所有配置在 `src/config/site.config.json` 中完成。

### 配置结构概览

```json
{
  "site": { ... },
  "seo": { "ogImage": "", "twitterImage": "" },
  "profile": {
    "name", "avatar", "bio", "occupation",
    "description": [], "keywords": [],
    "socialLinks": [ { "key", "icon", "title", "url", "target" } ]
  },
  "friendLinks": [ { "name", "url", "avatar", "description" } ],
  "footer": { "icpBeian", "gonganBeian", "copyright", "startYear", "siteStartDate" },
  "themes": [ { "name", "key", 颜色配置... } ],
  "rightPanel": {
    "enableOrderConfig": true,
    "sections": [
      { "type": "personalWebsites", "enabled", "items": [...] },
      { "type": "uptimeKuma", "enabled", "url", "slug" },
      { "type": "activities", "enabled", "items": [...] },
      { "type": "skills", "enabled", "items": [...] },
      { "type": "projects", "enabled", "items": [...] }
    ]
  }
}
```

### 图标格式支持

| 格式 | 示例 | 说明 |
|------|------|------|
| Iconify | `"mdi:github"` | 推荐，自动渲染 SVG |
| 图片 URL | `"https://example.com/icon.png"` | 外部图片链接 |
| 对象格式 | `{ "src": "mdi:github" }` | 显式指定 |

### 时间格式支持（Activities）

| 格式 | 示例 | 输出 |
|------|------|------|
| ISO 日期 | `"2024-12-10T10:00:00Z"` | "5 分钟前" |
| 时间戳 | `1702800000000` | "3 天前" |
| 自定义文本 | `"上周"` | 直接显示 |

### 右栏区块顺序调整

只需在 `sections` 数组中调整对象顺序即可。设置 `"enabled": false` 可隐藏区块。

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Vue 3](https://vuejs.org/) | 3.x | 渐进式前端框架 |
| [TypeScript](https://www.typescriptlang.org/) | Latest | 类型安全 |
| [Vite](https://vitejs.dev/) | 7.x | 下一代构建工具 |
| [Pinia](https://pinia.vuejs.org/) | Latest | 状态管理 |
| [VueUse](https://vueuse.core/) | Latest | 组合式工具库 |
| [Iconify](https://iconify.design/) | Latest | 统一图标方案 |
| [Tailwind CSS](https://tailwindcss.dev/) | 4.x | 原子化 CSS |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | Latest | PWA 支持 |
| [web-vitals](https://github.com/GoogleChrome/web-vitals) | Latest | 性能指标监控 |

---

## 📂 项目结构

```
homepage/
├── public/                    # 静态资源
│   ├── 404.html              # 自定义 404 页面
│   ├── offline.html          # PWA 离线页面
│   └── vite.svg              # 站点图标
├── src/
│   ├── assets/               # 资源文件
│   ├── components/           # UI 组件
│   │   ├── CenterPanel.vue       # 中央面板（关于我、友链）
│   │   ├── Footer.vue            # 页脚（备案、版权）
│   │   ├── GitHubBadge.vue       # GitHub 徽章
│   │   ├── LeftSidebar.vue       # 左侧边栏（友情链接）
│   │   ├── LoadingSpinner.vue    # 加载指示器
│   │   ├── RightPanel.vue        # 右侧边栏（动态/技能/项目等）
│   │   ├── RightPanelSkeleton.vue # 右侧骨架屏
│   │   ├── SettingsModal.vue     # 设置弹窗（主题切换）
│   │   ├── Skeleton.vue          # 骨架屏组件（7 种布局模式）
│   │   ├── SiteStats.vue         # 站点统计
│   │   ├── SmartIcon.vue         # 智能图标组件
│   │   └── UptimeCard.vue        # 服务状态监控卡片
│   ├── composables/          # 组合式函数
│   │   ├── useFocusTrap.ts      # 焦点陷阱（无障碍）
│   │   ├── usePerformanceMonitor.ts # Web Vitals 监控
│   │   ├── useScrollToTop.ts    # 回到顶部（支持内部滚动容器）
│   │   ├── useSiteStats.ts      # 站点统计
│   │   ├── useStructuredData.ts # 结构化数据生成（JSON-LD）
│   │   ├── useTheme.ts          # 主题控制
│   │   └── useUptimeKuma.ts     # Uptime Kuma 数据抓取
│   ├── config/
│   │   ├── site.config.ts       # 配置类型定义
│   │   └── site.config.json     # 主配置文件
│   ├── stores/
│   │   └── theme.ts             # Pinia 主题状态
│   ├── utils/
│   │   ├── format.ts            # 时间格式化
│   │   ├── icon.ts              # 图标类型识别
│   │   ├── sentry.ts            # Sentry 错误监控
│   │   └── seoGenerator.ts      # SEO 元数据生成
│   ├── App.vue                 # 根组件
│   ├── main.ts                 # 入口文件
│   └── style.css               # 全局样式
├── docs/
│   └── security/              # 安全配置文档
│       ├── csp-guide.md        # CSP 配置指南
│       └── security-headers.md # 安全头配置（5 平台示例）
├── index.html                 # HTML 入口
├── vite.config.ts             # Vite 配置
├── tailwind.config.ts         # Tailwind 配置
├── package.json
└── README.md
```

---

## ⌨️ 开发命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器（热重载） |
| `pnpm build` | 生产环境构建 |
| `pnpm preview` | 预览构建结果 |
| `pnpm typecheck` | TypeScript 类型检查 |
| `pnpm lint` | ESLint 代码检查 |
| `pnpm format` | Prettier 代码格式化 |

---

## 🚀 部署指南

### Vercel / Netlify / Cloudflare Pages

直接连接 Git 仓库，构建设置：
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Node Version**: 18+

参考 `docs/security/security-headers.md` 配置安全响应头。

### Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    root /var/www/homepage/dist;
    index index.html;

    # 安全头
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### GitHub Pages

1. 修改 `vite.config.ts` 的 `base` 为 `/your-repo-name/`
2. `pnpm build` 后将 `dist` 推送到 `gh-pages` 分支
3. 在仓库 Settings → Pages 启用

### 部署检查清单

- [ ] 更新 `site.domain` 为实际域名
- [ ] 添加 PWA 图标 (`public/pwa-192x192.png`, `pwa-512x512.png`)
- [ ] 配置安全响应头（见 `docs/security/`）
- [ ] （可选）配置 Sentry DSN 用于错误监控
- [ ] （可选）配置 Uptime Kuma 状态页 URL

---

## ✨ 新增功能详情

### v2.0 深度优化更新

#### SEO 增强
- 新增 WebSite + BreadcrumbList JSON-LD 结构化数据
- 支持自定义 OG 分享图片 (`seo.ogImage`)
- robots.txt 细化规则（搜索引擎特定 + 恶意爬虫屏蔽）

#### 可访问性
- 完整 WCAG 2.1 Level AA 合规
- 模态框焦点陷阱（Tab 循环 + Escape 关闭）
- 动态内容 aria-live 通知（服务状态、统计数据变化）
- 高对比度模式（Windows 强制颜色）完美适配

#### 性能
- 内部滚动容器追踪（返回顶部按钮正确工作）
- 字体 display=swap 策略
- 外部资源 SRI 完整性校验
- Web Vitals 开发环境实时监控

#### 安全
- 完整 CSP 配置指南（开发/生产/Report-Only 三种模式）
- 5 大平台安全头配置示例
- Permissions-Policy 权限控制建议

---

## ❓ 常见问题

<details>
<summary><b>Q: 如何更换图标？</b></summary>

在 [Iconify](https://icon-sets.iconify.design/) 搜索图标，复制名称填入 `icon` 字段：
```json
{ "icon": "mdi:github" }
```
</details>

<details>
<summary><b>Q: 返回顶部按钮不显示？</b></summary>

桌面端需要滚动左侧边栏或右侧面板超过 500px 才会显示按钮。这是因为主容器使用 `overflow: hidden`，窗口本身不滚动。
</details>

<details>
<summary><b>Q: 如何隐藏某个右栏区块？</b></summary>

设置 `"enabled": false`：
```json
{ "type": "skills", "enabled": false }
```
</details>

<details>
<summary><b>Q: 如何配置 CSP？</b></summary>

参见 `docs/security/csp-guide.md`，提供完整的 Content-Security-Policy 配置示例和常见问题排查。
</details>

<details>
<summary><b>Q: 图标加载慢怎么办？</b></summary>

项目已配置 Iconify API DNS 预连接。如国内仍慢，可在 `index.html` 中将 API 地址替换为国内镜像。
</details>

---

## 📄 开源协议

本项目采用 [GPL-v3](LICENSE) 协议开源。

## 📮 问题反馈

如有问题或建议，欢迎提交 [Issue](https://github.com/RegadPoleCN/homepage/issues)。
