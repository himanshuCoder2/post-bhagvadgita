// ============================================
// 🪝 CUSTOM HOOKS — Best Practice!
// Sab TanStack Query logic yahan alag rakho
// ============================================

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import {
  fetchPosts,
  fetchPostById,
  fetchUsers,
  createPost,
  deletePost,
  updatePost,
  fetchGitaChapters, fetchGitaSlok, fetchCoffeeImage,
} from '../api/posts';
import type { NewPost, Post,GitaChapter, GitaSlok, CoffeeImage } from '../types';

// 🔑 Query Keys — centralized rakhna best practice hai
export const queryKeys = {
  posts: ['posts'] as const,
  post: (id: number) => ['posts', id] as const,
  users: ['users'] as const,
};

// ─────────────────────────────────────────────
// 📋 Sabhi Posts fetch karna
// ─────────────────────────────────────────────
export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 2, // 2 minute fresh rahega
    gcTime:    1000 * 60 * 10, 
  });
}

// ─────────────────────────────────────────────
// 📄 Single Post fetch karna (id se)
// ─────────────────────────────────────────────
export function usePost(id: number) {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => fetchPostById(id),
    enabled: id > 0, // sirf valid id par chalega
  });
}

// ─────────────────────────────────────────────
// 👥 Users fetch karna
// ─────────────────────────────────────────────
export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5 min fresh
    gcTime:    1000 * 60 * 20, 
  });
}

// ─────────────────────────────────────────────
// ✏️ Post banana (Mutation)
// ─────────────────────────────────────────────
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost: NewPost) => createPost(newPost),

    onSuccess: (createdPost) => {
      // Cache mein naya post add karo bina refetch ke — super fast!
      queryClient.setQueryData<Post[]>(queryKeys.posts, (oldPosts) => {
        return oldPosts ? [createdPost, ...oldPosts] : [createdPost];
      });
    },

    onError: (error: Error) => {
      console.error('Post create error:', error.message);
    },
  });
}

// ─────────────────────────────────────────────
// 🗑️ Post delete karna (Mutation)
// ─────────────────────────────────────────────
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),

    // Optimistic Update — pehle UI update karo, phir server se confirm
    onMutate: async (deletedId: number) => {
      // Pending queries cancel karo
      await queryClient.cancelQueries({ queryKey: queryKeys.posts });

      // Purana data save karo (rollback ke liye)
      const previousPosts = queryClient.getQueryData<Post[]>(queryKeys.posts);

      // Turant UI se hata do
      queryClient.setQueryData<Post[]>(queryKeys.posts, (old) =>
        old ? old.filter((p) => p.id !== deletedId) : []
      );

      return { previousPosts };
    },

    onError: (_err, _id, context) => {
      // Error aaya toh wapas puraana data restore karo
      if (context?.previousPosts) {
        queryClient.setQueryData(queryKeys.posts, context.previousPosts);
      }
    },

    onSettled: () => {
      // Confirm ke liye refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });
}

// ─────────────────────────────────────────────
// ✏️ Post update karna (Mutation)
// ─────────────────────────────────────────────
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: Post) => updatePost(post),

    onSuccess: (updatedPost) => {
      // List mein update karo
      queryClient.setQueryData<Post[]>(queryKeys.posts, (old) =>
        old ? old.map((p) => (p.id === updatedPost.id ? updatedPost : p)) : []
      );
      // Individual post cache bhi update karo
      queryClient.setQueryData(queryKeys.post(updatedPost.id), updatedPost);
    },
  });
}

// ─────────────────────────────────────────────
// 📃 Pagination Hook
// ─────────────────────────────────────────────
export function usePagedPosts(page: number) {
  return useQuery({
    queryKey: ['posts', 'paged', page],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`
      );
      if (!res.ok) throw new Error('Paged posts fetch failed!');
      return res.json() as Promise<Post[]>;
    },
    placeholderData: keepPreviousData, // page change par purana dikhao
    staleTime: 1000 * 30,
    gcTime:    1000 * 60 * 5,
  });
}



// Gita chapters
export function useGitaChapters() {
  return useQuery<GitaChapter[]>({
    queryKey: ['gita', 'chapters'],
    queryFn: fetchGitaChapters,
    staleTime: Infinity,   // Gita kabhi change nahi hoti!
    gcTime: Infinity,
  });
}

// Single slok (chapter + verse se)
export function useGitaSlok(chapter: number, verse: number) {
  return useQuery<GitaSlok>({
    queryKey: ['gita', 'slok', chapter, verse],
    queryFn: () => fetchGitaSlok(chapter, verse),
    enabled: chapter > 0 && verse > 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

// Coffee image — random fetch
export function useCoffeeImage() {
  return useQuery<CoffeeImage>({
    queryKey: ['coffee', Math.random()], // har baar naya key = naya fetch
    queryFn: async (): Promise<CoffeeImage> => ({
      file: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/800/500`
    }),
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });
}