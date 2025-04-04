"use client";

import React, { useState, useEffect } from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { ForumPost, Course } from '@/types';
import { supabase } from '@/lib/supabase';

interface PostFormData {
  title: string;
  content: string;
  courseId: string;
}

export function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    courseId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
    fetchCourses();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('forum_posts')
        .select(`
          *,
          course:courses(*),
          responses:forum_responses(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
    }
  };

  const fetchCourses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('teacher_id', user.id)
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('forum_posts')
        .insert([{
          ...formData,
          author_id: user.id,
          language: courses.find(c => c.id === formData.courseId)?.language || 'english'
        }]);

      if (error) throw error;

      await fetchPosts();
      setIsAddingPost(false);
      setFormData({
        title: '',
        content: '',
        courseId: '',
      });
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleAddResponse = async (postId: string, content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('forum_responses')
        .insert([{ 
          post_id: postId, 
          content,
          author_id: user.id
        }]);

      if (error) throw error;
      await fetchPosts();
    } catch (err) {
      console.error('Error adding response:', err);
      setError('Failed to add response');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Foro de Discusión</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingPost(true)}
          className="bg-[#FF6B35] text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nueva Publicación
        </motion.button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {isAddingPost && (
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
                Contenido
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingPost(false)}
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
                {loading ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()} - {post.course.title}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 capitalize">
                  {post.course.language === 'english' ? 'Inglés' : 'Francés'}
                </span>
              </div>

              <p className="mt-4 text-gray-600">{post.content}</p>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Respuestas ({post.responses.length})
                </h4>

                <div className="mt-4 space-y-4">
                  {post.responses.map((response) => (
                    <div key={response.id} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">{response.content}</p>
                      <p className="mt-2 text-xs text-gray-500">
                        {new Date(response.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}

                  <div className="mt-4">
                    <button
                      onClick={() => {
                        const content = prompt('Escribe tu respuesta:');
                        if (content) {
                          handleAddResponse(post.id, content);
                        }
                      }}
                      className="text-[#FF6B35] hover:text-opacity-80 text-sm font-medium"
                    >
                      Responder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}