import React from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { ForumPost } from '../../types';

export function Forum() {
  const [posts] = React.useState<ForumPost[]>([]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Foro de Discusión</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#FF6B35] text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nueva Publicación
        </motion.button>
      </div>

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
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 capitalize">
                  {post.language}
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
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}