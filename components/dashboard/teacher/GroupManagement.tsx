"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Users, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Course } from '@/types';
import { supabase } from '@/lib/supabase';

interface GroupFormData {
  title: string;
  description: string;
  language: 'english' | 'french';
  level: 'beginner' | 'intermediate' | 'advanced';
  schedule: string;
  maxStudents: number;
}

export function GroupManagement() {
  const [groups, setGroups] = useState<Course[]>([]);
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [formData, setFormData] = useState<GroupFormData>({
    title: '',
    description: '',
    language: 'english',
    level: 'beginner',
    schedule: '',
    maxStudents: 10,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*, enrollments(count)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGroups(data || []);
    } catch (err) {
      console.error('Error fetching groups:', err);
      setError('Error al cargar los grupos');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('No se encontró el usuario');

      const { error } = await supabase
        .from('courses')
        .insert([{
          ...formData,
          teacher_id: userData.user.id
        }]);

      if (error) throw error;

      await fetchGroups();
      setIsAddingGroup(false);
      setFormData({
        title: '',
        description: '',
        language: 'english',
        level: 'beginner',
        schedule: '',
        maxStudents: 10,
      });
    } catch (err) {
      console.error('Error creating group:', err);
      setError('Error al crear el grupo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Grupos</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingGroup(true)}
          className="bg-[#FF6B35] text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Grupo
        </motion.button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {isAddingGroup && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gray-50 p-6 rounded-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Grupo
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Idioma
                </label>
                <select
                  required
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value as 'english' | 'french' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                >
                  <option value="english">Inglés</option>
                  <option value="french">Francés</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel
                </label>
                <select
                  required
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                >
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Horario
              </label>
              <input
                type="text"
                required
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                placeholder="Ej: Lunes y Miércoles 18:00 - 19:30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Máximo de Estudiantes
              </label>
              <input
                type="number"
                required
                min={1}
                value={formData.maxStudents}
                onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingGroup(false)}
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
                {loading ? 'Creando...' : 'Crear Grupo'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <motion.div
            key={group.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ y: -2 }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{group.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {group.language === 'english' ? 'Inglés' : 'Francés'} - {
                      group.level === 'beginner' ? 'Principiante' :
                      group.level === 'intermediate' ? 'Intermedio' : 'Avanzado'
                    }
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {group.enrollments?.[0]?.count || 0} estudiantes
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-600">{group.description}</p>

              <div className="mt-4 flex items-center text-sm text-gray-500">
                <GraduationCap className="h-4 w-4 mr-2" />
                {group.schedule}
              </div>

              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                Máximo {group.maxStudents} estudiantes
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}