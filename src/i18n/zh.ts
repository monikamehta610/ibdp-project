const zh = {
  // Header
  "app.title": "BIOME: IB ESS Exam Arena",
  "app.subtitle": "IB DP 环境系统与社会 (ESS) 学习助手与模拟考试平台",

  // Empty state
  "empty.title": "BIOME: IB ESS Exam Arena",
  "empty.hint": "欢迎来到你的 IB DP ESS 学习助手。我可以帮助你分析系统边界、引导你学习大纲内容、根据官方评分标准为你的考试答案打分，并辅导你取得 7 分满分。",
  "empty.features": "互动模拟 · 7分评分标准打分 · 教学大纲指南",

  // Chat input
  "chat.placeholder": "发消息…  ⏎ 发送 · Shift+⏎ 换行",
  "chat.hint": "由 BIOME AI 导师辅导 · 由 EdgeOne Makers 驱动",

  // Preset questions
  "preset.1": "解释生态中心主义和技术中心主义的区别并举例。",
  "preset.screenshotEdgeOne": "热力学定律如何应用于食物网中的能量流动？",
  "preset.skill.sandboxAlgorithms": "讨论索尔顿湖系统的反馈回路如何导致其生态崩溃。",

  // Tool indicators
  "tool.commands": "终端命令",
  "tool.files": "文件操作",
  "tool.codeRunner": "代码解释器",
  "tool.browser": "浏览器",

  // Web search activity (in-bubble chip)
  "webSearch.error.wsaMissing": "搜索不可用，需配置 {0} API Key",
  "webSearch.error.wsaCta": "获取 Key",

  // Skill indicators
  "skill.sandboxAlgorithms": "沙箱算法执行",

  // Debug panel
  "debug.title": "传输流",
  "debug.events": "事件",
  "debug.clear": "清除",
  "debug.empty": "等待 SSE 事件...",
  "debug.emptyHint": "发送消息后，所有原始后端数据将在此处显示。",

  // Status & errors
  "status.error": "⚠️ 请求失败，请检查后端服务是否启动。",
  "status.stopped": "⏹ *已停止生成*",
  "status.backendError": "⚠️ 后端中断请求失败，服务端可能仍在运行。",

  // Language toggle
  "lang.switch": "English",

  // Sidebar
  "sidebar.label": "会话列表",
  "sidebar.title": "会话",
  "sidebar.newChat": "新建聊天",
  "sidebar.loading": "正在加载会话...",
  "sidebar.loadMore": "加载更多",
  "sidebar.loadingMore": "加载中...",
  "sidebar.emptyTitle": "暂无会话",
  "sidebar.emptyHint": "点击「新建聊天」开始第一段对话。",
  "sidebar.delete": "删除会话",
  "sidebar.deleteConfirm": "确定要永久删除这个会话吗？此操作不可恢复。",

  // Aria labels (button hover/screen-reader)
  "aria.send": "发送",
  "aria.clearHistory": "清除历史",
  "aria.stopGeneration": "停止生成",

  // ─── Floating bottom-right action badges ─────────────────────────────
  "floatingLink.deploy": "一键部署",
  "floatingLink.github": "GitHub",
} as const;

export default zh;
