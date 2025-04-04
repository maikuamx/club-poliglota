"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Video, MessageSquare, BookOpen, GraduationCap } from 'lucide-react';
import { StudentsList } from '@/components/dashboard/teacher/StudentsList';
import { GroupManagement } from '@/components/dashboard/teacher/GroupManagement';
import { Forum } from './Forum';

type TabId = 'students' | 'recordings' | 'forum' | 'courses' | 'groups';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('students');

  const tabs: Tab[] = [
    { id: 'students', label: 'Estudiantes', icon: Users },
    { id: 'groups', label: 'Grupos', icon: GraduationCap },
    { id: 'recordings', label: 'Grabaciones', icon: Video },
    { id: 'forum', label: 'Foro', icon: MessageSquare },
    { id: 'courses', label: 'Material', icon: BookOpen },
  ];

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
              {activeTab === 'students' && <StudentsList />}
              {activeTab === 'groups' && <GroupManagement />}
              {activeTab === 'recordings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Grabaciones</h2>
                  <p className="text-gray-600">
                    Próximamente: Gestión de grabaciones de clases.
                  </p>
                </div>
              )}
              {activeTab === 'forum' && <Forum />}
              {activeTab === 'courses' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Material de Estudio</h2>
                  <p className="text-gray-600">
                    Próximamente: Gestión de material didáctico.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}