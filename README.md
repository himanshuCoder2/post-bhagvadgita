# ⚡ TanStack Query Demo — TypeScript + React

## 🚀 Kaise Chalao

```bash
# 1. Dependencies install karo
npm install

# 2. Dev server start karo
npm run dev

# 3. Browser mein kholo
# http://localhost:5173
```

## 📁 Project Structure

```
src/
├── types/
│   └── index.ts          # TypeScript types (Post, User etc.)
├── api/
│   └── posts.ts          # Fetch functions (fetchPosts, createPost etc.)
├── hooks/
│   └── usePosts.ts       # Custom hooks (usePosts, useCreatePost etc.)
├── components/
│   ├── PostsList.tsx     # Posts list + delete + edit
│   ├── CreatePost.tsx    # New post form (useMutation)
│   ├── PostDetail.tsx    # Single post (dynamic queryKey)
│   └── PaginatedPosts.tsx # Pagination (keepPreviousData)
├── App.tsx               # Main app with tabs
├── main.tsx              # Entry point (QueryClientProvider)
└── index.css             # Styles
```

## 🎯 Kya Kya Sikha

| Feature | File |
|---------|------|
| `useQuery` — basic fetch | `PostsList.tsx` |
| `useMutation` — POST | `CreatePost.tsx` |
| `useMutation` — DELETE with Optimistic Update | `PostsList.tsx` |
| `useMutation` — PUT/update | `PostsList.tsx` |
| Dynamic queryKey `['posts', id]` | `PostDetail.tsx` |
| Dependent queries (`enabled`) | `PostDetail.tsx` |
| `keepPreviousData` — smooth pagination | `PaginatedPosts.tsx` |
| Custom hooks (best practice) | `hooks/usePosts.ts` |
| Centralized query keys | `hooks/usePosts.ts` |
| `invalidateQueries` vs `setQueryData` | `hooks/usePosts.ts` |
| TanStack Query DevTools | `main.tsx` |

## 🛠️ DevTools

App chalao aur bottom-right corner mein TanStack logo dikhega.
Uspe click karo aur poora cache status dekho — kaafi helpful hai!

## 📦 Dependencies

- `@tanstack/react-query` v5 — main library
- `@tanstack/react-query-devtools` v5 — debugging
- `react` + `react-dom` v18
- `typescript` v5
- `vite` v5
