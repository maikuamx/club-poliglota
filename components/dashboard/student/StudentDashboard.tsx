"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Video, MessageSquare, GraduationCap } from 'lucide-react';
import { Enrollment, Course } from '@/types';
import { supabase } from '@/lib/supabase';

type TabId = 'courses' | 'recordings' | 'forum' | 'materials';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('courses');
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tabs: Tab[] = [
    { id: 'courses', label: 'Mis Cursos', icon: GraduationCap },
    { id: 'recordings', label: 'Grabaciones', icon: Video },
    { id: 'forum', label: 'Foro', icon: MessageSquare },
    { id: 'materials', label: 'Material', icon: Book },
  ];

  useEffect(() => {
    fetchEnrollments();
    fetchAvailableCourses();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          course:courses(*)
        `)
        .eq('student_id', user.id)
        .eq('status', 'active');

      if (error) throw error;
      setEnrollments(data || []);
    } catch (err) {
      console.error('Error fetching enrollments:', err);
      setError('Error al cargar tus cursos');
    }
  };

  const fetchAvailableCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*, enrollments(count)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAvailableCourses(data || []);
    } catch (err) {
      console.error('Error fetching available courses:', err);
    }
  };

  const handleEnroll = async (courseId: string) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('enrollments')
        .insert([{
          student_id: user.id,
          course_id: courseId,
          status: 'active'
        }]);

      if (error) throw error;
      await fetchEnrollments();
      await fetchAvailableCourses();
    } catch (err) {
      console.error('Error enrolling in course:', err);
      setError('Error al inscribirte en el curso');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm
                      ${activeTab === tab.id
                        ? 'border-[#FF6B35] text-[#FF6B35]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 mx-auto mb-1" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'courses' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Mis Cursos</h2>
                  
                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {enrollments.map((enrollment) => (
                      <motion.div
                        key={enrollment.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                        whileHover={{ y: -2 }}
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {enrollment.course.title}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {enrollment.course.language === 'english' ? 'Inglés' : 'Francés'} - {
                                  enrollment.course.level === 'beginner' ? 'Principiante' :
                                  enrollment.course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'
                                }
                              </p>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Activo
                            </span>
                          </div>

                          <p className="mt-3 text-sm text-gray-600">
                            {enrollment.course.description}
                          </p>

                          {enrollment.course.schedule && (
                            <div className="mt-4 text-sm text-gray-500">
                              <GraduationCap className="inline-block h-4 w-4 mr-2" />
                              {enrollment.course.schedule}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mt-12 mb-6">
                    Cursos Disponibles
                  </h3>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {availableCourses
                      .filter(course => !enrollments.some(e => e.courseId === course.id))
                      .map((course) => (
                        <motion.div
                          key={course.id}
                          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                          whileHover={{ y: -2 }}
                        >
                          <div className="p-6">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  {course.title}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  {course.language === 'english' ? 'Inglés' : 'Francés'} - {
                                    course.level === 'beginner' ? 'Principiante' :
                                    course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'
                                  }
                                </p>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {course.enrollments?.[0]?.count || 0}/{course.maxStudents} estudiantes
                              </span>
                            </div>

                            <p className="mt-3 text-sm text-gray-600">
                              {course.description}
                            </p>

                            {course.schedule && (
                              <div className="mt-4 text-sm text-gray-500">
                                <GraduationCap className="inline-block h-4 w-4 mr-2" />
                                {course.schedule}
                              </div>
                            )}

                            <button
                              onClick={() => handleEnroll(course.id)}
                              disabled={loading || (course.enrollments?.[0]?.count || 0) >= (course.maxStudents || 0)}
                              className={`
                                mt-4 w-full px-4 py-2 rounded-md text-white font-medium
                                ${loading
                                  ? 'bg-gray-400 cursor-not-allowed'
                                  : (course.enrollments?.[0]?.count || 0) >= (course.maxStudents || 0)
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#FF6B35] hover:bg-opacity-90'
                                }
                              `}
                            >
                              {loading ? 'Inscribiendo...' :
                                (course.enrollments?.[0]?.count || 0) >= (course.maxStudents || 0)
                                  ? 'Curso Lleno'
                                  : 'Inscribirme'
                              }
                            </button>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === 'recordings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Grabaciones</h2>
                  <p className="text-gray-600">Próximamente: Acceso a las grabaciones de tus clases.</p>
                </div>
              )}

              {activeTab === 'forum' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Foro</h2>
                  <p className="text-gray-600">Próximamente: Participa en discusiones con tus compañeros.</p>
                </div>
              )}

              {activeTab === 'materials' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Material de Estudio</h2>
                  <p className="text-gray-600">Próximamente: Accede al material de tus cursos.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}