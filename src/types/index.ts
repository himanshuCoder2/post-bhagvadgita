// ============================================
// 📦 TYPES — Sab kuch TypeScript mein typed hai
// ============================================

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

export interface NewPost {
  title: string;
  body: string;
  userId: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Bhagavad Gita Types
export interface GitaChapter {
  chapter_number: number;
  name: string;
  translation: string;
  transliteration: string;
  meaning: { en: string; hi: string };
  summary: { en: string; hi: string };
  verses_count: number;
}

export interface GitaSlok {
  chapter: number;
  verse: number;
  slok: string;           // Sanskrit
  transliteration: string;
  tej: { author: string; ht: string };  // Hindi translation
  siva: { author: string; et: string }; // English translation
}

// Coffee Types
export interface CoffeeImage {
  file: string; // image URL
}