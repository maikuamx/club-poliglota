/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Plus, Link as LinkIcon, Book } from 'lucide-react';
import { motion } from 'framer-motion';
import { Course } from '../../types';
import { supabase } from '../../lib/supabase';

interface MaterialFormData {
  title: string;
  description: string;
  url: string;
  courseId: string;
}

export function CourseManagement() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [formData, setFormData] = useState<MaterialFormData>({
    title: '',
    description: '',
    url: '',
    courseId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMaterials();
    fetchCourses();
  }, []);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('course_materials')
        .select('*, course:courses(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (err) {
      console.error('Error fetching materials:', err);
      setError('Failed to load materials');
    }
  };

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('title');

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
      const { error } = await supabase
        .from('course_materials')
        .insert([formData]);

      if (error) throw error;

      await fetchMaterials();
      setIsAddingMaterial(false);
      setFormData({
        title: '',
        description: '',
        url: '',
        courseId: '',
      });
    } catch (err) {
      console.error('Error creating material:', err);
      setError('Failed to create material');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este material?')) return;

    try {
      const { error } = await supabase
        .from('course_materials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchMaterials();
    } catch (err) {
      console.error('Error deleting material:', err);
      setError('Failed to delete material');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Material de Estudio</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingMaterial(true)}
          className="bg-[#FF6B35] text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Agregar Material
        </motion.button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {isAddingMaterial && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gray-50 p-6 rounded-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grupo
              </label>
              <select
                required
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              >
                <option value="">Selecciona un grupo</option>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL del Material
              </label>
              <input
                type="url"
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                placeholder="https://..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingMaterial(false)}
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
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {materials.map((material) => (
          <motion.div
            key={material.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ y: -2 }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Book className="h-6 w-6 text-[#FF6B35]" />
                  <h3 className="ml-2 text-lg font-medium text-gray-900">{material.title}</h3>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {material.course.language === 'english' ? 'Inglés' : 'Francés'}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">{material.course.title}</p>
              <p className="mt-2 text-sm text-gray-600">{material.description}</p>

              <div className="mt-4 flex justify-between items-center">
                <a
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#FF6B35] hover:text-opacity-80"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Ver Material
                </a>
                <button
                  onClick={() => handleDelete(material.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}