import { useState } from 'react';
import { Plus, Video, Calendar, Clock, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Recording } from '../../types';

export function RecordingsList() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUpload = async (file: File) => {
    // Implementation will be added with Supabase storage integration
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Grabaciones de Clases</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowUploadModal(true)}
          className="bg-[#FF6B35] text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Subir Grabación
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recordings.map((recording) => (
          <motion.div
            key={recording.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ y: -2 }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Video className="h-6 w-6 text-[#FF6B35]" />
                  <h3 className="ml-2 text-lg font-medium text-gray-900">{recording.title}</h3>
                </div>
                <button
                  onClick={() => {/* Handle delete */}}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(recording.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  Expira: {new Date(recording.expiresAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-4">
                <a
                  href={recording.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-md"
                >
                  Ver Grabación
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}