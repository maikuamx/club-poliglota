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
  schedule?: string;
  maxStudents?: number;
  enrollments?: { count: number }[];
}

export interface Recording {
  id: string;
  title: string;
  url: string;
  courseId: string;
  createdAt: string;
  expiresAt: string;
  course: Course;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  language: 'english' | 'french';
  authorId: string;
  createdAt: string;
  courseId: string;
  course: Course;
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
  enrollments: Enrollment[];
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'inactive' | 'completed';
  course: Course;
}