"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff, User, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { signIn, signUp, getUserRole } from '@/lib/auth';

const formSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(data.email, data.password);
        const role = await getUserRole();
        
        if (role === 'teacher') {
          router.push('/dashboard/teacher');
        } else {
          router.push('/dashboard/student');
        }
      } else {
        if (!data.name) {
          throw new Error('El nombre es requerido para el registro');
        }

        await signUp(data.email, data.password, data.name);
        setIsLogin(true);
        setError('Registro exitoso. Por favor inicia sesión.');
        reset();
        return;
      }

      reset();
      router.refresh();
    } catch (err) {
      console.error('Auth error:', err);
      if (err instanceof Error) {
        if (err.message.includes('Email rate limit exceeded')) {
          setError('Has intentado registrarte demasiadas veces. Por favor, espera unos minutos.');
        } else if (err.message.includes('Invalid login credentials')) {
          setError('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
        } else if (err.message.includes('User already registered')) {
          setError('Este correo electrónico ya está registrado.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Ha ocurrido un error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-accent flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                {isLogin ? (
                  <LogIn className="w-8 h-8 text-primary" />
                ) : (
                  <UserPlus className="w-8 h-8 text-primary" />
                )}
              </motion.div>
              <h2 className="text-2xl font-bold text-primary">
                {isLogin ? 'Iniciar Sesión' : 'Registro de Estudiante'}
              </h2>
              <p className="text-gray-600 mt-2">
                {isLogin 
                  ? 'Ingresa tus credenciales para acceder'
                  : 'Crea tu cuenta de estudiante'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      {...register('name')}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-sm text-center ${error.includes('exitoso') ? 'text-green-500' : 'text-red-500'}`}
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`
                  w-full bg-accent text-white py-3 px-6 rounded-lg font-medium
                  flex items-center justify-center
                  ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'}
                  transition-colors duration-200
                `}
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? (
                      <LogIn className="h-5 w-5 mr-2" />
                    ) : (
                      <UserPlus className="h-5 w-5 mr-2" />
                    )}
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                  </>
                )}
              </motion.button>

              <p className="text-center text-sm text-gray-600">
                {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-accent hover:underline font-medium"
                >
                  {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
                </button>
              </p>
            </form>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}