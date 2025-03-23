import React from 'react';
import { motion } from 'framer-motion';
import { Users, Video, MessageSquare, BookOpen } from 'lucide-react';
import { StudentsList } from './StudentsList';
import { RecordingsList } from './RecordingsList';
import { Forum } from './Forum';
import { CourseManagement } from './CourseManagement';

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = React.useState<'students' | 'recordings' | 'forum' | 'courses'>('students');

  const tabs = [
    { id: 'students', label: 'Estudiantes', icon: Users },
    { id: 'recordings', label: 'Grabaciones', icon: Video },
    { id: 'forum', label: 'Foro', icon: MessageSquare },
    { id: 'courses', label: 'Cursos', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
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
              {activeTab === 'students' && <StudentsList />}
              {activeTab === 'recordings' && <RecordingsList />}
              {activeTab === 'forum' && <Forum />}
              {activeTab === 'courses' && <CourseManagement />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}