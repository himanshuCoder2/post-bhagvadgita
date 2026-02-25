# ⚡ Post Bhagavad Gita

A demo project built with React, TypeScript, TanStack Query v5, and Redux Toolkit.

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@tanstack/react-query` | v5 | Core data fetching and caching |
| `@tanstack/react-query-devtools` | v5 | Cache inspection during development |
| `@reduxjs/toolkit` | latest | Global client-side state management |
| `react-redux` | latest | React bindings for Redux |
| `react` | v18 | UI framework |
| `react-dom` | v18 | React DOM renderer |
| `typescript` | v5 | Static type checking |
| `vite` | v5 | Development build tool |

---

## 🔄 Module Flow
```
main.tsx
├── Redux Provider          (wraps entire app — global client state)
│   └── QueryClientProvider (wraps entire app — server state + caching)
│       └── App.tsx
│           ├── ConceptSlider     (auto-sliding feature cards)
│           ├── Tab Navigation    (Redux manages active tab)
│           │
│           ├── PostsList.tsx
│           │   └── hooks/usePosts.ts → api/posts.ts → JSONPlaceholder API
│           │
│           ├── CreatePost.tsx
│           │   └── hooks/usePosts.ts → api/posts.ts → JSONPlaceholder API
│           │
│           ├── PostDetail.tsx
│           │   └── hooks/usePosts.ts → api/posts.ts → JSONPlaceholder API
│           │
│           ├── PaginatedPosts.tsx
│           │   └── hooks/usePosts.ts → api/posts.ts → JSONPlaceholder API
│           │
│           ├── GitaSection.tsx
│           │   ├── store/slices/uiSlice.ts  (chapter, verse, language)
│           │   └── hooks/usePosts.ts → api/posts.ts → Vedic Scriptures API
│           │
│           ├── CoffeeSection.tsx
│           │   └── Picsum Photos API (no cache)
│           │
│           └── Toast.tsx
│               └── store/slices/toastSlice.ts (global notifications)
│
store/
├── index.ts           (root Redux store)
├── hooks.ts           (typed useAppDispatch + useAppSelector)
└── slices/
    ├── uiSlice.ts     (activeTab, gitaLang, selectedChapter, selectedVerse)
    └── toastSlice.ts  (toasts array — add/remove)
```

---

## 🚀 Getting Started
```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.