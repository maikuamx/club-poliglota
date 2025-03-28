import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { TeacherDashboard } from './components/dashboard/TeacherDashboard';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { useAuthStore } from './store/authStore';

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole: 'teacher' | 'student' }) {
  const user = useAuthStore(state => state.user);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  const initialize = useAuthStore(state => state.initialize);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/teacher-dashboard" element={
            <ProtectedRoute allowedRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          } />
          <Route path="/student-dashboard" element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            user?.role === 'teacher' ? (
              <Navigate to="/teacher-dashboard" replace />
            ) : user?.role === 'student' ? (
              <Navigate to="/student-dashboard" replace />
            ) : (
              <main className="flex-grow">
                <Hero />
                <ContactForm />
              </main>
            )
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;