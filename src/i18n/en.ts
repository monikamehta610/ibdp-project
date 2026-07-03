const en = {
  // Header
  "app.title": "BIOME: IB ESS Exam Arena",
  "app.subtitle": "IB DP Environmental Systems & Societies Study Companion & Exam Simulator",

  // Empty state
  "empty.title": "BIOME: IB ESS Exam Arena",
  "empty.hint": "Welcome to your ultimate IB DP ESS Study Companion. I can analyze system boundaries, guide you through syllabus content, grade your exam answers against official markschemes, and coach you to a Level 7.",
  "empty.features": "Interactive Simulations · Level 7 Markscheme Grading · Syllabus Guides",

  // Chat input
  "chat.placeholder": "Type a message...  ⏎ Send · Shift+⏎ Newline",
  "chat.hint": "Coached by BIOME AI Tutor · Powered by EdgeOne Makers",

  // Preset questions
  "preset.1": "Explain the difference between ecocentrism and technocentrism with examples.",
  "preset.screenshotEdgeOne": "How do the Laws of Thermodynamics apply to energy flow in food webs?",
  "preset.skill.sandboxAlgorithms": "Discuss how the Salton Sea system feedback loop caused its ecological collapse.",

  // Tool indicators
  "tool.commands": "Commands",
  "tool.files": "Files",
  "tool.codeRunner": "Code Runner",
  "tool.browser": "Browser",

  // Web search activity (in-bubble chip)
  "webSearch.error.wsaMissing": "Web search unavailable — needs a {0} API key",
  "webSearch.error.wsaCta": "Get a key",

  // Skill indicators
  "skill.sandboxAlgorithms": "Sandbox Algorithms",

  // Debug panel
  "debug.title": "Trace",
  "debug.events": "events",
  "debug.clear": "Clear",
  "debug.empty": "Waiting for SSE events...",
  "debug.emptyHint": "After sending a message, all raw backend data will be displayed here.",

  // Status & errors
  "status.error": "Request failed. Please check if the backend service is running.",
  "status.stopped": "⏹ *Generation stopped*",
  "status.backendError": "Backend abort request failed. The server may still be running.",

  // Language toggle
  "lang.switch": "中文",

  // Sidebar
  "sidebar.label": "Conversation list",
  "sidebar.title": "Chats",
  "sidebar.newChat": "New chat",
  "sidebar.loading": "Loading conversations...",
  "sidebar.loadMore": "Load more",
  "sidebar.loadingMore": "Loading...",
  "sidebar.emptyTitle": "No conversations yet",
  "sidebar.emptyHint": "Click \"New chat\" to start your first conversation.",
  "sidebar.delete": "Delete conversation",
  "sidebar.deleteConfirm": "Permanently delete this conversation? This cannot be undone.",

  // Aria labels (button hover/screen-reader)
  "aria.send": "Send",
  "aria.clearHistory": "Clear history",
  "aria.stopGeneration": "Stop generation",

  // ─── Floating bottom-right action badges ─────────────────────────────
  "floatingLink.deploy": "Deploy",
  "floatingLink.github": "GitHub",
} as const;

export default en;
