import React, { useState, useEffect, useContext } from 'react';
import {
  FaSchool,
  FaHeart,
  FaGlobe,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/ContextProvider';
import { Badge, Box, Button, Modal, Typography } from '@mui/material';

const Header = () => {

  const { favorites, removeFavorite } = useContext(Context)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <header className="bg-white shadow-md fixed top-0 w-full z-50">
        <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-[5%] py-3 md:py-4 max-w-[1200px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <FaSchool className="text-xl md:text-2xl mr-2 text-blue-600" />
              <h1 className="text-lg md:text-xl font-semibold text-gray-800">School Finder</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 lg:gap-8">
            <Link to="/" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Icons - Desktop */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <div
              className="p-2 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <FaHeart className="text-lg text-gray-700" />
            </div>
            {/* <FaGlobe className="text-lg text-gray-700 cursor-pointer hover:text-blue-600 transition-colors" /> */}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="hidden lg:inline text-sm">Logout</span>
              </button>
            ) : (
              <Link to="/login" className="flex items-center gap-1">
                <FaUser className="text-lg text-gray-700 hover:text-blue-600 transition-colors" />
                <span className="text-sm font-medium hidden lg:inline">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-xl text-gray-700" />
            ) : (
              <FaBars className="text-xl text-gray-700" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white py-2 px-4 shadow-md animate-slideDown">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>
              <div className="flex items-center justify-between py-2 px-3">
                <Badge
                  badgeContent={favorites.length}
                  color="error"
                  overlap="circular"
                  className="cursor-pointer border border-red-500"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FaHeart className="text-lg text-gray-700" />
                </Badge>



                <FaGlobe className="text-lg text-gray-700 cursor-pointer hover:text-blue-600 transition-colors" />
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      toggleMobileMenu();
                      handleLogout();
                    }}
                  >
                    <FaSignOutAlt className="text-lg text-red-600 hover:text-red-700" />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-1"
                  >
                    <FaUser className="text-lg text-gray-700 hover:text-blue-600 transition-colors" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modal for Favorites */}
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          BackdropProps={{
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity here (0.5 = 50% visible)
            }
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{
            width: '80%',
            maxWidth: '800px', // Optional: set a max-width
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            {/* Your modal content here */}
            <Typography variant="h6" gutterBottom>
              Favorite Schools
            </Typography>
            {favorites.length === 0 ? (
              <Typography>No favorite schools yet.</Typography>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {favorites.map((school) => (
                  <li key={school.id} style={{ borderBottom: '1px solid #eee', paddingBottom: 16, marginBottom: 16 }}>
                    <Typography variant="subtitle1"><strong>{school.name}</strong></Typography>
                    <Typography variant="body2" color="text.secondary">{school.address}</Typography>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => removeFavorite(school.id)}
                      sx={{ mt: 1 }}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Box>
        </Modal>
      )}
    </>
  );
};
export default Header;