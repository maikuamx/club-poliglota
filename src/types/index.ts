import { User as SupabaseUser } from '@supabase/supabase-js';

export interface User extends SupabaseUser {
  name: string;
  role: 'student' | 'teacher';
  language: 'english' | 'french';
}

export interface Course {
  id: string;
  title: string;
  language: 'english' | 'french';
  level: 'beginner' | 'intermediate' | 'advanced';
  teacherId: string;
  description: string;
  zoomLink?: string;
}

export interface Recording {
  id: string;
  title: string;
  url: string;
  courseId: string;
  createdAt: string;
  expiresAt: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  language: 'english' | 'french';
  authorId: string;
  createdAt: string;
  responses: ForumResponse[];
}

export interface ForumResponse {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  language: 'english' | 'french';
  level: 'beginner' | 'intermediate' | 'advanced';
  joinedAt: string;
}