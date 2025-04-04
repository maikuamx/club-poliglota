import React, { useState, useEffect } from 'react';
import { Search, UserPlus, GraduationCap, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Student, Course } from '../../../types';
import { supabase } from '../../../lib/supabase';

interface EnrollmentFormData {
  email: string;
  courseId: string;
}

export function StudentsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [formData, setFormData] = useState<EnrollmentFormData>({
    email: '',
    courseId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select(`
          *,
          student:users!student_id(*),
          course:courses(*)
        `)
        .eq('status', 'active');

      if (enrollmentsError) throw enrollmentsError;

      // Group enrollments by student
      const studentsMap = new Map();
      enrollmentsData?.forEach((enrollment) => {
        const student = enrollment.student;
        if (!studentsMap.has(student.id)) {
          studentsMap.set(student.id, {
            ...student,
            enrollments: [],
          });
        }
        studentsMap.get(student.id).enrollments.push({
          id: enrollment.id,
          studentId: enrollment.student_id,
          courseId: enrollment.course_id,
          enrolledAt: enrollment.enrolled_at,
          status: enrollment.status,
          course: enrollment.course,
        });
      });

      setStudents(Array.from(studentsMap.values()));
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load students');
    }
  };

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, check if the user exists
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, role')
        .eq('email', formData.email)
        .single();

      if (userError) {
        throw new Error('Usuario no encontrado');
      }

      if (userData.role !== 'student') {
        throw new Error('El usuario no es un estudiante');
      }

      // Check if the student is already enrolled in this course
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('id')
        .eq('student_id', userData.id)
        .eq('course_id', formData.courseId)
        .eq('status', 'active')
        .single();

      if (existingEnrollment) {
        throw new Error('El estudiante ya está inscrito en este curso');
      }

      // Create the enrollment
      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .insert([{
          student_id: userData.id,
          course_id: formData.courseId,
          status: 'active',
        }]);

      if (enrollmentError) throw enrollmentError;

      await fetchStudents();
      setIsAddingStudent(false);
      setFormData({
        email: '',
        courseId: '',
      });
    } catch (err) {
      console.error('Error enrolling student:', err);
      setError(err instanceof Error ? err.message : 'Error al inscribir al estudiante');
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async (enrollmentId: string) => {
    if (!confirm('¿Estás seguro de que quieres dar de baja al estudiante de este curso?')) return;

    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ status: 'inactive' })
        .eq('id', enrollmentId);

      if (error) throw error;
      await fetchStudents();
    } catch (err) {
      console.error('Error unenrolling student:', err);
      setError('Error al dar de baja al estudiante');
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Estudiantes</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingStudent(true)}
          className="bg-[#FF6B35] text-white px-4 py-2 rounded-md flex items-center"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Inscribir Estudiante
        </motion.button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {isAddingStudent && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gray-50 p-6 rounded-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email del Estudiante
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                placeholder="estudiante@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Curso
              </label>
              <select
                required
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              >
                <option value="">Selecciona un curso</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title} - {course.language === 'english' ? 'Inglés' : 'Francés'} ({
                      course.level === 'beginner' ? 'Principiante' :
                      course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'
                    })
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingStudent(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`
                  px-4 py-2 bg-[#FF6B35] text-white rounded-md
                  ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'}
                `}
              >
                {loading ? 'Inscribiendo...' : 'Inscribir'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar estudiantes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredStudents.map((student) => (
          <motion.div
            key={student.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ y: -2 }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Cursos Inscritos
                </h4>

                <div className="mt-2 space-y-2">
                  {student.enrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {enrollment.course.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {enrollment.course.language === 'english' ? 'Inglés' : 'Francés'} - {
                            enrollment.course.level === 'beginner' ? 'Principiante' :
                            enrollment.course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'
                          }
                        </p>
                      </div>
                      <button
                        onClick={() => handleUnenroll(enrollment.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}