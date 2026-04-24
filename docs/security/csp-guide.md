# Content-Security-Policy (CSP) 配置指南

## 概述

Content-Security-Policy (CSP) 是一个额外的安全层，用于检测和缓解某些类型的攻击，包括 XSS（跨站脚本）和数据注入攻击。

## 项目使用的外部资源

根据当前项目的 `index.html`，以下外部资源需要被 CSP 策略允许：

| 资源类型 | 域名 | 用途 |
|---------|------|------|
| JavaScript | `cdn.busuanzi.cc` | 不蒜子访问统计 |
| 字体 | `fonts.googleapis.com` | Google Fonts CSS |
| 字体 | `fonts.gstatic.com` | Google Fonts 字体文件 |
| JavaScript | `cdn.jsdelivr.net` | Iconify 图标库 |
| 图片 | `avatars.githubusercontent.com` | GitHub 用户头像 |
| 图片 | `cdn-icons-png.flaticon.com` | Flaticon 图标 |

## 推荐的 CSP 策略

### 1. Meta 标签方式（开发环境）

在 `index.html` 的 `<head>` 中添加：

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self';
           script-src 'self' 'unsafe-inline' 'unsafe-eval'
             https://cdn.busuanzi.cc
             https://cdn.jsdelivr.net;
           style-src 'self' 'unsafe-inline'
             https://fonts.googleapis.com;
           font-src 'self' https://fonts.gstatic.com;
           img-src 'self' data: blob:
             https://avatars.githubusercontent.com
             https://cdn-icons-png.flaticon.com;
           connect-src 'self';
           frame-ancestors 'none';" />
```

**说明：**
- `default-src 'self'`: 默认只允许加载同源资源
- `script-src`: 允许 busuanzi 统计脚本和 iconify CDN
- `style-src`: 允许 Google Fonts CSS 和内联样式（Tailwind 需要）
- `font-src`: 允许 Google Fonts 字体文件
- `img-src`: 允许 GitHub 头像、Flaticon 图标以及 data: URI（用于 SVG 等）
- `connect-src`: 限制 AJAX/WebSocket 连接
- `frame-anceors 'none'`: 防止被嵌入到 iframe 中（点击劫持防护）

### 2. HTTP 响应头方式（生产环境推荐）

通过服务器配置 CSP 头更安全，详见 [security-headers.md](./security-headers.md)

### 3. 严格模式策略（生产环境）

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.busuanzi.cc https://cdn.jsdelivr.net; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://avatars.githubusercontent.com https://cdn-icons-png.flaticon.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```

**注意：** 移除了 `'unsafe-inline'` 和 `'unsafe-eval'` 后，需要确保：
- 所有样式都通过外部 CSS 文件或 class 方式应用
- 不使用 `eval()` 或类似函数
- Vue 的模板编译在生产构建中已处理此问题

## 通过环境变量配置 CSP

### Vite 项目配置示例

创建 `.env.development` 和 `.env.production` 文件：

**`.env.development`:**
```env
VITE_CSP_MODE=meta
VITE_CSP_REPORT_ONLY=true
```

**`.env.production`:**
```env
VITE_CSP_MODE=header
VITE_CSP_REPORT_ONLY=false
```

**`vite.config.ts` 配置：**
```typescript
export default defineConfig({
  plugins: [
    vue(),
    // 开发环境可注入 CSP meta 标签
    process.env.VITE_CSP_MODE === 'meta' && {
      name: 'inject-csp',
      transformIndexHtml(html) {
        return html.replace(
          '<head>',
          `<head>
            <meta http-equiv="Content-Security-Policy"
              content="default-src 'self'; script-src 'self' 'unsafe-inline' ...">
          `
        )
      }
    }
  ].filter(Boolean)
})
```

## CSP 报告模式（Report-Only）

在正式部署前，建议先使用 Report-Only 模式测试：

```html
<meta http-equiv="Content-Security-Policy-Report-Only"
  content="...你的CSP策略..."
/>
```

或设置报告端点：

```http
Content-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /csp-report
report-to csp-endpoint
```

配合 `Reporting-Headers`:
```json
{
  "csp-endpoint": {
    "url": "/api/csp-reports",
    "max_age": 31536000
  }
}
```

## 常见问题排查

### 1. 内联样式被阻断

**错误信息：**
```
Refused to apply inline style because it violates the following Content Security Policy directive: ...
```

**解决方案：**
- 将内联样式移到 CSS 类中
- 或在 `style-src` 中添加 `'unsafe-inline'`（仅限开发环境）

### 2. 动态脚本加载失败

**场景：** 使用 `document.createElement('script')` 动态加载脚本

**解决方案：**
- 改用静态 `<script>` 标签
- 或将动态脚本的域名添加到 `script-src`

### 3. Google Fonts 无法加载

**确保以下两个域名都在白名单中：**
- `https://fonts.googleapis.com`（CSS 文件）
- `https://fonts.gstatic.com`（字体文件）

### 4. Busuanzi 统计不生效

**检查：**
1. `cdn.busuanzi.cc` 是否在 `script-src` 中
2. 是否使用了 HTTPS 协议（混合内容会被阻止）

## 测试 CSP 策略

### 浏览器开发者工具测试

1. 打开 Chrome DevTools → Console
2. 查找 CSP 相关的警告/错误信息
3. 使用 Network 面板查看被阻止的资源

### 在线工具

- [Google CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [Security Headers Scanner](https://securityheaders.com/)

### 命令行测试

```bash
# 使用 curl 检查响应头
curl -I https://your-domain.com | grep -i content-security-policy
```

## 最佳实践

1. **渐进式收紧**: 先从宽松策略开始，逐步移除 `'unsafe-*'`
2. **使用 nonce 或 hash**: 优先于 `'unsafe-inline'`
3. **定期审查**: 当添加新的外部依赖时更新 CSP
4. **监控违规**: 设置 report-uri 收集违规报告
5. **多环境配置**: 开发环境和生产环境使用不同严格程度的策略

## 参考链接

- [MDN CSP 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
- [CSP 快速参考](https://content-security-policy.com/)
- [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
