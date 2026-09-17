# MoonRobots 项目申报书

## 一、项目概述

MoonRobots 是一个使用 MoonBit 实现的 RFC 9309 `robots.txt` 解析与访问决策引擎。项目面向搜索引擎、AI Agent、RAG 数据采集器、链接检查器和网站审计工具，帮助自动化客户端在访问网页前，以标准、可测试、可解释的方式理解网站声明的抓取规则。

## 二、问题与价值

许多爬虫只使用字符串前缀判断 `robots.txt`，容易错误处理同名 User-agent 分组合并、通配分组回退、最长规则、Allow 同长度优先、通配符、结尾锚点和百分号编码。错误实现可能抓取网站明确不希望被自动访问的内容，也难以向用户解释某次访问为何被拒绝。

MoonRobots 将这些规则封装为可复用 MoonBit API，并保留命中规则、源码行号和决策原因。项目既可作为其他 MoonBit 网络项目的依赖，也可作为独立 CLI 帮助开发者和网站管理员检查策略。

## 三、核心功能

1. 容错解析 User-agent、Allow、Disallow、Sitemap、注释和空行。
2. 精确选择 User-agent 分组，合并同名分组，并回退到通配分组。
3. 按 RFC 9309 执行最长匹配和 Allow 同长度优先。
4. 支持 `*`、`$`、UTF-8 及百分号编码规范化。
5. 返回可解释 Decision，而不只是 Bool。
6. 提供 check、inspect、lint、batch 命令及稳定 JSON 输出。
7. 检查重复规则、空分组、全站禁止和异常 Sitemap 等语义风险。
8. 在 Native、JavaScript、Wasm、Wasm-GC 后端执行同一套测试。
9. 提供浏览器策略实验台，实时编辑策略并展示每条候选规则的命中状态、标准化结果与特异度。

## 四、技术方案

核心库由四层组成：容错解析器、路径规范化器、线性通配符匹配器和可解释决策引擎。CLI 和浏览器实验台仅负责输入及结果展示，不承载规则语义，确保同一套核心逻辑可被浏览器、服务端和 Agent 工具复用。浏览器端通过稳定的字符串 JSON 边界调用 MoonBit 生成的 IIFE 模块，无需后端服务。

项目以 MoonBit 为主要实现语言，使用 Apache-2.0 许可证。唯一外部运行依赖 `moonbitlang/x/fs` 只用于 Native CLI 文件读取；核心决策库只依赖 MoonBit Core。

## 五、验收成果

- 可公开复现的源代码仓库
- MoonBit 核心库及公开 API
- Native CLI 与示例文件
- 可离线打开的浏览器策略实验台
- 候选规则覆盖与决策轨迹 API
- RFC 行为和边界测试
- 四后端构建与测试结果
- README、架构说明和验收清单
- Apache-2.0 许可证

## 六、后续计划

后续版本将增加站点级覆盖统计、HTTP 获取与缓存、Sitemap 解析，以及供 AI Agent 调用的 MCP Server。项目不会把 `robots.txt` 描述为安全或授权机制。
