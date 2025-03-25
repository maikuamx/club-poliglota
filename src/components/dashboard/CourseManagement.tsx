import React from 'react';
import { Plus, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Course } from '../../types';

export function CourseManagement() {
  const [courses] = React.useState<Course[]>([]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Cursos</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#FF6B35] text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Curso
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ y: -2 }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 capitalize">
                  {course.language}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500 capitalize">
                Nivel: {course.level}
              </p>

              <p className="mt-4 text-gray-600">{course.description}</p>

              {course.zoomLink && (
                <a
                  href={course.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center text-[#FF6B35] hover:text-opacity-80"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Enlace de Zoom
                </a>
              )}

              <div className="mt-6 flex space-x-4">
                <button
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-md"
                >
                  Editar
                </button>
                <button
                  className="flex-1 bg-[#FF6B35] hover:bg-opacity-90 text-white font-medium py-2 rounded-md"
                >
                  Actualizar Zoom
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}