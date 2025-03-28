import  { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { useAuthStore } from './store/authStore';

function App() {
  const initialize = useAuthStore(state => state.initialize);

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
          <Route path="/" element={
            <main className="flex-grow">
              <Hero />
              <ContactForm />
            </main>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;