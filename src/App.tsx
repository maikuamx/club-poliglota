import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { LoginForm } from './components/auth/LoginForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
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