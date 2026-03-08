# Checklist

## ESLint 和 Prettier 修复
- [ ] ESLint 配置文件正确加载，无 ESM/CommonJS 混用错误
- [ ] `pnpm lint` 命令成功运行，无配置错误
- [ ] `pnpm format` 命令成功运行，代码格式化正确
- [ ] ESLint 和 Prettier 规则无冲突

## Tailwind CSS 原子化 CSS 框架
- [ ] Tailwind CSS 依赖已安装
- [ ] vite.config.ts 中正确配置 Tailwind CSS
- [ ] tailwind.config.js 配置文件已创建
- [ ] main.ts 中已导入 Tailwind CSS 样式
- [ ] 生产构建中 CSS 文件大小显著减少
- [ ] 样式在浏览器中正确应用

## GitHub Actions CI/CD 工作流
- [ ] .github/workflows/ci.yml 文件已创建
- [ ] 工作流包含 lint 检查步骤
- [ ] 工作流包含 typecheck 步骤
- [ ] 工作流包含 build 步骤
- [ ] 代码推送后工作流自动运行
- [ ] 所有检查步骤通过

## Sentry 错误监控集成
- [ ] @sentry/vue 依赖已安装
- [ ] src/utils/sentry.ts 初始化文件已创建
- [ ] main.ts 中已集成 Sentry
- [ ] 环境变量已配置
- [ ] 错误捕获功能正常工作
- [ ] 错误能正确上报到 Sentry

## 完整验证
- [ ] `pnpm lint` 通过，无错误
- [ ] `pnpm typecheck` 通过，无类型错误
- [ ] `pnpm build` 成功完成
- [ ] 所有改进已正确应用
- [ ] 项目可正常运行
