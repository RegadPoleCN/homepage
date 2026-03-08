# Checklist

## 代码审查检查

### Vue 组件审查
- [ ] 所有组件使用 Composition API 和 `<script setup>`
- [ ] 所有 props 和 emits 有完整的 TypeScript 类型定义
- [ ] 没有 XSS 安全漏洞（特别是 v-html 使用）
- [ ] 没有不必要的重新渲染
- [ ] 没有硬编码的敏感信息

### Composables 审查
- [ ] 所有 composables 有完整的类型定义
- [ ] 副作用处理正确（cleanup 函数）
- [ ] 没有内存泄漏风险
- [ ] 可复用性良好

### Store 审查
- [ ] Pinia store 实现正确
- [ ] 响应式系统工作正常
- [ ] 类型定义完整

## CSS 迁移检查

### Tailwind CSS 迁移
- [ ] 所有 scoped CSS 已迁移到 Tailwind CSS
- [ ] 响应式设计使用 Tailwind CSS 前缀
- [ ] 没有遗留的 CSS 规则
- [ ] 样式在所有屏幕尺寸上正确显示

### 样式验证
- [ ] 所有组件样式正确应用
- [ ] 颜色、间距、排版一致
- [ ] 动画和过渡正常工作
- [ ] 深色模式支持正常

## 性能检查
- [ ] 构建大小未增加
- [ ] 没有未使用的 CSS
- [ ] Tailwind CSS 配置优化

## 最终验证
- [ ] pnpm lint 通过
- [ ] pnpm typecheck 通过
- [ ] pnpm build 成功
- [ ] 所有功能正常工作
- [ ] 没有控制台错误或警告
