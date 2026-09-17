# MoonRobots 验收清单

## 核心功能

- [x] 解析 User-agent、Allow、Disallow 和 Sitemap
- [x] 保留合法规则并报告局部语法问题
- [x] 精确、大小写不敏感地匹配 product token
- [x] 合并同名分组并支持 `*` 回退
- [x] 最长规则优先，同长度 Allow 优先
- [x] 支持 `*` 和 `$`
- [x] 处理 UTF-8 与百分号编码
- [x] 隐式允许 `/robots.txt`
- [x] 返回命中规则、行号、匹配长度和原因
- [x] 返回全部候选规则的标准化、匹配状态和特异度

## 可运行成果

- [x] `check` 单 URL 判断
- [x] `inspect` 文档结构检查
- [x] `lint` 解析诊断
- [x] `batch` 批量 URL 判断
- [x] `check`、`lint`、`batch` JSON 输出
- [x] 重复规则、空分组、全站禁止和 Sitemap 语义 lint
- [x] 正常及异常示例文件
- [x] 可离线打开的浏览器策略实验台
- [x] 基础、通配符、风险策略三种交互场景

## 质量门槛

- [x] `moon fmt`
- [x] `moon check --target all --deny-warn`
- [x] `moon test --target all`
- [x] 浏览器四状态点击测试与控制台错误检查
- [x] 桌面和移动端布局截图检查
- [ ] GitHub Actions 首次公开运行
- [ ] 发布 Mooncakes v0.1.0
- [ ] 录制 2–3 分钟演示视频

## 提交前人工确认

- [ ] 将 `moon.mod` 中的模块名改为实际 Mooncakes 用户名
- [ ] 将 repository URL 改为实际公开仓库
- [ ] 在全新环境执行 README 快速开始
- [ ] 在报名材料中注明 RFC 范围和非目标
- [ ] 加入赛事交流群并提交公开仓库链接
