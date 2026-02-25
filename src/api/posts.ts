// ============================================
// 🌐 API FUNCTIONS — Fetch wale functions
// ============================================

import type { Post, User, NewPost, GitaChapter, GitaSlok, CoffeeImage} from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Sabhi posts fetch karna
export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?_limit=10`);
  if (!res.ok) throw new Error('Posts fetch karne mein error!');
  return res.json();
}

// Single post fetch karna (id se)
export async function fetchPostById(id: number): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error(`Post #${id} nahi mili!`);
  return res.json();
}

// Sabhi users fetch karna
export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error('Users fetch karne mein error!');
  return res.json();
}

// Naya post banana (POST request)
export async function createPost(newPost: NewPost): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });
  if (!res.ok) throw new Error('Post banana failed!');
  return res.json();
}

// Post delete karna
export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Post #${id} delete nahi hui!`);
}

// Post update karna (PUT)
export async function updatePost(post: Post): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('Post update nahi hui!');
  return res.json();
}

// ── Bhagavad Gita ──────────────────────────────
const GITA_BASE = 'https://vedicscriptures.github.io';

export async function fetchGitaChapters(): Promise<GitaChapter[]> {
  const res = await fetch(`${GITA_BASE}/chapters`);
  if (!res.ok) throw new Error('Chapters fetch failed!');
  return res.json();
}

export async function fetchGitaSlok(chapter: number, verse: number): Promise<GitaSlok> {
  const res = await fetch(`${GITA_BASE}/slok/${chapter}/${verse}`);
  if (!res.ok) throw new Error('Slok fetch failed!');
  return res.json();
}

// ── Coffee Images ──────────────────────────────
export async function fetchCoffeeImage(): Promise<CoffeeImage> {
  const res = await fetch('https://coffee.alexflipnote.dev/random.json');
  if (!res.ok) throw new Error('Coffee image fetch failed!');
  return res.json();
}