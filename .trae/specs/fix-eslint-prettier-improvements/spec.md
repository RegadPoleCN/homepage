# ESLint/Prettier 修复与后续改进规范

## Why
项目的 ESLint 和 Prettier 配置存在兼容性问题，需要修复。同时需要应用三项关键改进：使用原子化 CSS 框架优化样式、配置 GitHub Actions 自动化 CI/CD、以及集成 Sentry 错误监控。

## What Changes
- 修复 ESLint 配置兼容性问题（ESM/CommonJS 混用）
- 修复 Prettier 配置与 ESLint 的集成
- 添加 Tailwind CSS 原子化 CSS 框架以优化 CSS 大小
- 创建 GitHub Actions 工作流文件用于 CI/CD
- 集成 Sentry 进行生产环境错误监控

## Impact
- Affected specs: 代码质量、构建优化、部署流程、错误监控
- Affected code: 
  - ESLint 配置 (eslint.config.js)
  - Prettier 配置 (.prettierrc)
  - Vite 配置 (vite.config.ts)
  - package.json
  - 新增 GitHub Actions 工作流文件
  - 新增 Sentry 集成代码

## ADDED Requirements

### Requirement: ESLint 和 Prettier 正确集成
系统应提供正确的代码规范检查和格式化工具链。

#### Scenario: 开发者运行 lint 命令
- **WHEN** 开发者运行 `pnpm lint`
- **THEN** ESLint 正确检查所有文件，无配置错误

#### Scenario: 代码格式化
- **WHEN** 开发者运行 `pnpm format`
- **THEN** Prettier 正确格式化代码，与 ESLint 规则一致

### Requirement: UnoCSS 原子化 CSS 框架
系统应使用 UnoCSS 来优化 CSS 大小和性能。

#### Scenario: 构建优化
- **WHEN** 运行生产构建
- **THEN** CSS 文件大小显著减少，使用原子化类名

### Requirement: GitHub Actions CI/CD 工作流
系统应自动化代码检查、构建和部署流程。

#### Scenario: 代码推送
- **WHEN** 开发者推送代码到 GitHub
- **THEN** 自动运行 lint、typecheck、build 检查

### Requirement: Sentry 错误监控
系统应在生产环境中捕获和监控错误。

#### Scenario: 生产环境错误
- **WHEN** 用户在生产环境中遇到错误
- **THEN** 错误自动上报到 Sentry 进行分析

## MODIFIED Requirements

### Requirement: Vite 构建配置
优化 Vite 配置以支持 UnoCSS 和改进的代码分割。

- 添加 UnoCSS 插件
- 优化代码分割策略
- 配置 Sentry 初始化

## REMOVED Requirements

无需移除现有功能。
