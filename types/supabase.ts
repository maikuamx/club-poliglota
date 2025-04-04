export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          name: string
          role: 'student' | 'teacher' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          password_hash: string
          name?: string
          role?: 'student' | 'teacher' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          password_hash?: string,
          email?: string
          name?: string
          role?: 'student' | 'teacher' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          language: string
          level: 'beginner' | 'intermediate' | 'advanced'
          teacher_id: string
          schedule: string
          max_students: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          language: string
          level: 'beginner' | 'intermediate' | 'advanced'
          teacher_id: string
          schedule: string
          max_students?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          language?: string
          level?: 'beginner' | 'intermediate' | 'advanced'
          teacher_id?: string
          schedule?: string
          max_students?: number
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          enrolled_at: string
          status: 'active' | 'completed' | 'cancelled'
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          enrolled_at?: string
          status?: 'active' | 'completed' | 'cancelled'
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string
          enrolled_at?: string
          status?: 'active' | 'completed' | 'cancelled'
        }
      }
      recordings: {
        Row: {
          id: string
          title: string
          url: string
          course_id: string
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          title: string
          url: string
          course_id: string
          created_at?: string
          expires_at: string
        }
        Update: {
          id?: string
          title?: string
          url?: string
          course_id?: string
          created_at?: string
          expires_at?: string
        }
      }
      forum_posts: {
        Row: {
          id: string
          title: string
          content: string
          language: string
          author_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          language: string
          author_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          language?: string
          author_id?: string
          created_at?: string
        }
      }
      forum_responses: {
        Row: {
          id: string
          content: string
          post_id: string
          author_id: string
          created_at: string
        }
        Insert: {
          id?: string
          content: string
          post_id: string
          author_id: string
          created_at?: string
        }
        Update: {
          id?: string
          content?: string
          post_id?: string
          author_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      course_level: 'beginner' | 'intermediate' | 'advanced'
      enrollment_status: 'active' | 'completed' | 'cancelled'
      user_role: 'student' | 'teacher' | 'admin'
    }
  }
}