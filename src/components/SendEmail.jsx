import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is installed

const SendEmail = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('');
      setError('Please enter your email address.');
      return;
    }

    // try {
    //   const response = await axios.post(
    //     'http://localhost:5000/api/users/forgot-password', // Change to your actual API endpoint
    //     { email }
    //   );

    //   setMessage(response.data.message);
    //   setError('');
    //   setEmail('');
    // //   navigate("/forgetPassword"); // Navigate if you have a "check your email" page
    // } catch (err) {
    //   setMessage('');
    //   setError(
    //     err.response?.data?.message || 'Something went wrong. Try again.'
    //   );
    // }
  };

  const goToSignUp = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Send Email
        </h2>

        {message && (
          <p className="text-sm text-center mb-4 text-green-600 font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="text-sm text-center mb-4 text-red-600 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSend} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Send
          </button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an Account{' '}
            <button
              type="button"
              onClick={goToSignUp}
              className="text-blue-600 hover:underline font-medium"
            >
              SignIn
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SendEmail;