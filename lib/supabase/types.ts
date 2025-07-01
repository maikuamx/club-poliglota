export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_status: 'free' | 'premium'
          subscription_expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_status?: 'free' | 'premium'
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_status?: 'free' | 'premium'
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      languages: {
        Row: {
          id: string
          name: string
          code: string
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          color: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          color?: string
          created_at?: string
        }
      }
      levels: {
        Row: {
          id: string
          name: string
          order_index: number
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          order_index: number
          color: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          order_index?: number
          color?: string
          created_at?: string
        }
      }
      instructors: {
        Row: {
          id: string
          full_name: string
          bio: string | null
          avatar_url: string | null
          specialties: string[]
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          bio?: string | null
          avatar_url?: string | null
          specialties?: string[]
          rating?: number
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          bio?: string | null
          avatar_url?: string | null
          specialties?: string[]
          rating?: number
          created_at?: string
        }
      }
      live_classes: {
        Row: {
          id: string
          title: string
          description: string | null
          instructor_id: string
          language_id: string
          level_id: string
          scheduled_at: string
          duration_minutes: number
          max_students: number
          meeting_url: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          instructor_id: string
          language_id: string
          level_id: string
          scheduled_at: string
          duration_minutes?: number
          max_students?: number
          meeting_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          instructor_id?: string
          language_id?: string
          level_id?: string
          scheduled_at?: string
          duration_minutes?: number
          max_students?: number
          meeting_url?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      recorded_classes: {
        Row: {
          id: string
          title: string
          description: string | null
          instructor_id: string
          language_id: string
          level_id: string
          video_url: string
          thumbnail_url: string | null
          duration_minutes: number
          view_count: number
          is_premium: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          instructor_id: string
          language_id: string
          level_id: string
          video_url: string
          thumbnail_url?: string | null
          duration_minutes?: number
          view_count?: number
          is_premium?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          instructor_id?: string
          language_id?: string
          level_id?: string
          video_url?: string
          thumbnail_url?: string | null
          duration_minutes?: number
          view_count?: number
          is_premium?: boolean
          created_at?: string
        }
      }
      class_enrollments: {
        Row: {
          id: string
          user_id: string
          live_class_id: string
          enrolled_at: string
        }
        Insert: {
          id?: string
          user_id: string
          live_class_id: string
          enrolled_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          live_class_id?: string
          enrolled_at?: string
        }
      }
      weekly_activities: {
        Row: {
          id: string
          title: string
          description: string
          language_id: string
          level_id: string
          due_date: string
          max_file_size_mb: number
          allowed_file_types: string[]
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          language_id: string
          level_id: string
          due_date: string
          max_file_size_mb?: number
          allowed_file_types?: string[]
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          language_id?: string
          level_id?: string
          due_date?: string
          max_file_size_mb?: number
          allowed_file_types?: string[]
          is_active?: boolean
          created_at?: string
        }
      }
      activity_submissions: {
        Row: {
          id: string
          user_id: string
          activity_id: string
          file_url: string
          file_name: string
          file_size_bytes: number
          comments: string | null
          grade: number | null
          feedback: string | null
          submitted_at: string
          graded_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          activity_id: string
          file_url: string
          file_name: string
          file_size_bytes: number
          comments?: string | null
          grade?: number | null
          feedback?: string | null
          submitted_at?: string
          graded_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          activity_id?: string
          file_url?: string
          file_name?: string
          file_size_bytes?: number
          comments?: string | null
          grade?: number | null
          feedback?: string | null
          submitted_at?: string
          graded_at?: string | null
        }
      }
      forum_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          color: string
          order_index: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          color: string
          order_index: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          color?: string
          order_index?: number
          is_active?: boolean
          created_at?: string
        }
      }
      forum_topics: {
        Row: {
          id: string
          title: string
          content: string
          author_id: string
          category_id: string
          language_id: string | null
          is_pinned: boolean
          is_locked: boolean
          view_count: number
          reply_count: number
          last_reply_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          author_id: string
          category_id: string
          language_id?: string | null
          is_pinned?: boolean
          is_locked?: boolean
          view_count?: number
          reply_count?: number
          last_reply_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author_id?: string
          category_id?: string
          language_id?: string | null
          is_pinned?: boolean
          is_locked?: boolean
          view_count?: number
          reply_count?: number
          last_reply_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      forum_replies: {
        Row: {
          id: string
          content: string
          author_id: string
          topic_id: string
          parent_reply_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          author_id: string
          topic_id: string
          parent_reply_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          author_id?: string
          topic_id?: string
          parent_reply_id?: string | null
          created_at?: string
          updated_at?: string
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
      subscription_status: 'free' | 'premium'
    }
  }
}