export interface Student {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    created_at: string;
    updated_at: string;
    enrollments: Enrollment[];
  }
  
  export interface Course {
    id: string;
    title: string;
    description: string;
    language: 'english' | 'french';
    level: 'beginner' | 'intermediate' | 'advanced';
    teacher_id: string;
    schedule: string;
    maxStudents: number;
    created_at: string;
    updated_at: string;
    enrollments?: { count: number }[];
  }
  
  export interface Enrollment {
    id: string;
    studentId: string;
    courseId: string;
    enrolledAt: string;
    status: 'active' | 'completed' | 'cancelled';
    course: Course;
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
    language: string;
    authorId: string;
    createdAt: string;
    course: Course;
    responses: ForumResponse[];
  }
  
  export interface ForumResponse {
    id: string;
    content: string;
    postId: string;
    authorId: string;
    createdAt: string;
  }