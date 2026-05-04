import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
      <form onSubmit={handleSubmit} className="bg-white/10 dark:bg-black/50 p-8 rounded-xl backdrop-blur-md w-96 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-playfix-red">Sign In</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-playfix-red"
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-playfix-red"
          required 
        />
        <button type="submit" className="w-full bg-playfix-red hover:bg-playfix-red-hover text-white font-bold py-3 rounded transition-colors duration-300">
          Sign In
        </button>
        <p className="mt-4 text-center text-sm text-gray-400">
          New to Playfix? <Link to="/register" className="text-white hover:underline">Sign up now</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
