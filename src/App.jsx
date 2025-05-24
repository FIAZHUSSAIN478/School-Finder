import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Contact from './components/contact';
import About from './components/About';
import Header from './components/Header';
import Footer from './components/Footer';
import SchoolFinder from './pages/SchoolFinder';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgetPassword from './components/ForgetPassword';
import SendEmail from './components/SendEmail';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Automatically update token when user logs in
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Header />
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={!token ? <SignIn onLogin={() => setToken(localStorage.getItem('token'))} /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!token ? <SignUp /> : <Navigate to="/" />}
          />

          {/* Protected Routes */}
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/reset-password/:token" element={<ForgetPassword />} />
          <Route path="/sendemail" element={<SendEmail />} />
          <Route path="/contact" element={token ? <Contact /> : <Navigate to="/login" />} />
          <Route path="/about" element={token ? <About /> : <Navigate to="/login" />} />
          <Route path="/search-school" element={token ? <SchoolFinder /> : <Navigate to="/login" />} />
        </Routes>
        
      </div>
      <Footer />
    </Router>
  );
}

export default App;
