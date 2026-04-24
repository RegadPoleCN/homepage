# 安全响应头配置指南

## 概述

安全响应头是保护 Web 应用免受常见攻击的重要防线。本文档提供了在主流部署平台上配置推荐安全头的完整指南。

## 推荐的安全头列表

| 安全头 | 推荐值 | 作用 |
|--------|--------|------|
| **X-Content-Type-Options** | `nosniff` | 防止 MIME 类型嗅探攻击 |
| **X-Frame-Options** | `DENY` 或 `SAMEORIGIN` | 防止点击劫持（Clickjacking） |
| **Strict-Transport-Security** | `max-age=31536000; includeSubDomains` | 强制 HTTPS，防止协议降级攻击 |
| **Permissions-Policy** | 见下方配置 | 控制浏览器功能权限 |
| **Content-Security-Policy** | 见 [csp-guide.md](./csp-guide.md) | 防止 XSS 和数据注入 |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | 控制 Referer 头信息泄露 |
| **X-XSS-Protection** | `0` | 禁用旧版 XSS 过滤器（现代浏览器已内置） |

---

## 1. Nginx 配置示例

### 基础配置文件

编辑 Nginx 配置文件（通常位于 `/etc/nginx/nginx.conf` 或 `/etc/nginx/sites-available/your-site`）：

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    # HTTP 重定向到 HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL 证书配置
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # ===== 安全响应头配置 =====

    # 防止 MIME 类型嗅探
    add_header X-Content-Type-Options "nosniff" always;

    # 防止点击劫持
    add_header X-Frame-Options "SAMEORIGIN" always;

    # 强制 HTTPS（1年有效期）
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Referrer 策略
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # 权限策略（禁用不必要的浏览器功能）
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;

    # Content Security Policy
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://cdn.busuanzi.cc https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://avatars.githubusercontent.com https://cdn-icons-png.flaticon.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;

    # 禁用旧版 XSS 保护（现代浏览器不需要）
    add_header X-XSS-Protection "0" always;

    # 静态资源缓存
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 使用 include 文件（推荐）

创建独立的安全头配置文件 `/etc/nginx/snippets/security-headers.conf`：

```nginx
# 安全响应头通用配置
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
add_header X-XSS-Protection "0" always;
```

然后在主配置中引用：

```nginx
server {
    # ... 其他配置 ...

    # 引入安全头配置
    include snippets/security-headers.conf;

    # CSP 单独配置（因为较长）
    add_header Content-Security-Policy "..." always;
}
```

---

## 2. Apache 配置示例

### 方法一：使用 .htaccess 文件

在项目根目录或 public 目录下创建 `.htaccess`：

```apache
<IfModule mod_headers.c>
    # 防止 MIME 类型嗅探
    Header always set X-Content-Type-Options "nosniff"

    # 防止点击劫持
    Header always set X-Frame-Options "SAMEORIGIN"

    # 强制 HTTPS
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

    # Referrer 策略
    Header always set Referrer-Policy "strict-origin-when-cross-origin"

    # 权限策略
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"

    # Content Security Policy
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' https://cdn.busuanzi.cc https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://avatars.githubusercontent.com https://cdn-icons-png.flaticon.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"

    # 禁用旧版 XSS 保护
    Header always set X-XSS-Protection "0"
</IfModule>

# HTTP 重定向到 HTTPS
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

### 方法二：虚拟主机配置

编辑 Apache 配置文件（如 `/etc/apache2/sites-available/your-site.conf`）：

```apache
<VirtualHost *:443>
    ServerName your-domain.com
    DocumentRoot /var/www/html/dist

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/your-domain.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/your-domain.com/privkey.pem

    <Directory /var/www/html/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted

        # 安全头配置
        Header always set X-Content-Type-Options "nosniff"
        Header always set X-Frame-Options "SAMEORIGIN"
        Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        Header always set Referrer-Policy "strict-origin-when-cross-origin"
        Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
        Header always set Content-Security-Policy "default-src 'self'; ..."
        Header always set X-XSS-Protection "0"
    </Directory>

    # SPA 重写规则
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</VirtualHost>
```

**启用必要模块：**
```bash
sudo a2enmod headers rewrite ssl
sudo systemctl restart apache2
```

---

## 3. Netlify 配置示例

### 方法一：使用 netlify.toml 文件

在项目根目录创建 `netlify.toml`：

```toml
[[headers]]
  for = "/*"
  [headers.values]
    # 安全响应头
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "0"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=(), payment=()"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"

    # Content Security Policy
    Content-Security-Policy = "default-src 'self'; script-src 'self' https://cdn.busuanzi.cc https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://avatars.githubusercontent.com https://cdn-icons-png.flaticon.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"

    # 缓存控制
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.woff2"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 方法二：通过 Netlify UI 配置

1. 登录 Netlify Dashboard
2. 选择你的站点 → **Site settings** → **Build & deploy** → **Post processing**
3. 在 **HTTP headers** 部分添加自定义头信息

---

## 4. Vercel 配置示例

### 使用 vercel.json 文件

在项目根目录创建 `vercel.json`：

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "0"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), payment=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' https://cdn.busuanzi.cc https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://avatars.githubusercontent.com https://cdn-icons-png.flaticon.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)\\.(js|css|woff2)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 5. Cloudflare 配置示例（可选）

如果使用 Cloudflare CDN，可以在 **Rules** → **Transform Rules** → **Modify Response Head** 中添加：

或者使用 Cloudflare Workers：

```javascript
export default {
  async fetch(request) {
    const response = await fetch(request);

    const newHeaders = new Headers(response.headers);
    newHeaders.set('X-Content-Type-Options', 'nosniff');
    newHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    newHeaders.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    newHeaders.set('X-XSS-Protection', '0');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
};
```

---

## 各安全头详细说明

### X-Content-Type-Options: nosniff

**作用：** 防止浏览器对响应内容进行 MIME 类型嗅探。

**风险：** 如果服务器返回的 Content-Type 与实际内容不符，攻击者可能利用此漏洞执行恶意代码。

**推荐值：**
- `nosniff`: 严格遵循服务器声明的 Content-Type

### X-Frame-Options

**作用：** 控制页面是否可以被嵌入到 `<frame>`、`<iframe>`、`<embed>` 或 `<object>` 中。

**推荐值：**
- `DENY`: 完全禁止嵌入（最严格）
- `SAMEORIGIN`: 只允许同源页面嵌入

**注意：** 已被 `frame-ancestors` CSP 指令取代，但为了兼容旧浏览器仍建议设置。

### Strict-Transport-Security (HSTS)

**作用：** 告诉浏览器只能通过 HTTPS 访问该站点，并在一定时间内记住此规则。

**参数：**
- `max-age=31536000`: 有效期（秒），建议至少 1 年
- `includeSubDomains`: 同时应用于所有子域名
- `preload`: 允许被加入浏览器预加载列表（需提交至 hstspreload.org）

**重要：** 启用前确保 HTTPS 配置正确且证书有效！

### Permissions-Policy

**作用：** 控制浏览器 API 和功能的可用性。

**常用指令：**

| 功能 | 说明 | 建议 |
|------|------|------|
| `camera` | 摄像头访问 | 禁用（`=()`） |
| `microphone` | 麦克风访问 | 禁用 |
| `geolocation` | 地理位置 | 禁用 |
| `payment` | 支付请求 API | 禁用 |
| `usb` | USB 设备访问 | 禁用 |
| `magnetometer` | 磁力计 | 禁用 |
| `gyroscope` | 陀螺仪 | 禁用 |
| `fullscreen` | 全屏模式 | 允许（默认） |
| `speaker` | 音频输出选择 | 根据需要 |

**完整示例：**
```
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()
```

### Referrer-Policy

**作用：** 控制 HTTP Referer 头的发送策略。

**推荐值：**
- `strict-origin-when-cross-origin`: 同源发送完整 URL，跨域只发送来源（不含路径）
- `no-referrer`: 不发送任何 Referer 信息（最隐私）

### X-XSS-Protection: 0

**作用：** 控制浏览器内置的 XSS 过滤器。

**为什么设置为 0：**
- 现代浏览器已内置更强大的 XSS 防护
- 旧的 XSS Filter 可能被绕过并用于攻击
- 设置为 0 表示禁用此过时功能

---

## 测试和验证

### 1. 在线工具测试

- **[securityheaders.com](https://securityheaders.com/)**: 综合评分
- **[observatory.mozilla.org](https://observatory.mozilla.org/)**: Mozilla 安全评估
- **[cspscanner.com](https://cspscanner.com/)**: CSP 专项测试

### 2. 命令行测试

```bash
# 使用 curl 检查所有安全头
curl -I https://your-domain.com | grep -E "(X-Content|X-Frame|Strict-Transport|Permissions|Referrer|CSP)"

# 使用 curl 检查特定头
curl -I -s https://your-domain.com | grep -i "content-security-policy"
```

### 3. 浏览器开发者工具

1. 打开 DevTools → Network 面板
2. 刷新页面，点击主请求
3. 查看 **Response Headers** 部分

### 4. 自动化测试脚本

```javascript
// test-security-headers.js
const https = require('https');

const url = 'https://your-domain.com';
const requiredHeaders = {
  'x-content-type-options': 'nosniff',
  'x-frame-options': /DENY|SAMEORIGIN/,
  'strict-transport-security': /max-age=/,
  'permissions-policy': /.+/,
  'referrer-policy': /.+/
};

https.get(url, (res) => {
  console.log('\n=== 安全头检查结果 ===\n');

  for (const [header, expected] of Object.entries(requiredHeaders)) {
    const value = res.headers[header];
    if (!value) {
      console.log(`❌ ${header}: 未设置`);
    } else if (expected instanceof RegExp ? expected.test(value) : value === expected) {
      console.log(`✅ ${header}: ${value}`);
    } else {
      console.log(`⚠️  ${header}: ${value} (期望: ${expected})`);
    }
  }
});
```

运行：
```bash
node test-security-headers.js
```

---

## 部署检查清单

部署前请确认以下事项：

- [ ] 所有安全头已在对应平台正确配置
- [ ] SSL/TLS 证书有效且使用 TLS 1.2+
- [ ] HSTS 的 `max-age` 设置合理（首次部署可设为较短时间测试）
- [ ] CSP 策略经过测试，不会阻断必要资源
- [ ] 已提交域名至 [HSTS Preload List](https://hstspreload.org/)（可选）
- [ ] 使用在线工具验证安全头得分 > A

---

## 参考链接

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN HTTP Headers Reference](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
- [Google Web Fundamentals - Security](https://developers.google.com/web/fundamentals/security)
- [HSTS Preload Submission](https://hstspreload.org/)
