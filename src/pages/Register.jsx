import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm brightness-[0.3]"
          style={{ backgroundImage: 'url("https://image.tmdb.org/t/p/original/ggFHVNu6YYI5L9pCfOacjizRGt.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-black/60 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex justify-center mb-8">
            <h1 className="text-4xl font-black text-playfix-red tracking-tighter drop-shadow-[0_0_15px_rgba(229,9,20,0.6)]">
              PLAYFIX
            </h1>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setIsFocused('username')}
              onBlur={() => setIsFocused('')}
              className={`w-full p-4 rounded-xl bg-white/5 text-white border transition-all duration-300 outline-none
                ${isFocused === 'username' ? 'border-playfix-red ring-1 ring-playfix-red/50 bg-white/10' : 'border-white/10'}`}
              required 
            />
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused('email')}
              onBlur={() => setIsFocused('')}
              className={`w-full p-4 rounded-xl bg-white/5 text-white border transition-all duration-300 outline-none
                ${isFocused === 'email' ? 'border-playfix-red ring-1 ring-playfix-red/50 bg-white/10' : 'border-white/10'}`}
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused('password')}
              onBlur={() => setIsFocused('')}
              className={`w-full p-4 rounded-xl bg-white/5 text-white border transition-all duration-300 outline-none
                ${isFocused === 'password' ? 'border-playfix-red ring-1 ring-playfix-red/50 bg-white/10' : 'border-white/10'}`}
              required 
            />

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full bg-gradient-to-r from-playfix-red to-purple-600 hover:from-playfix-red-hover hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.4)]"
            >
              Get Started
            </motion.button>
          </form>
          
          <div className="mt-8 flex flex-col items-center">
            <p className="text-gray-400 text-sm">
              Already have an account? <Link to="/login" className="text-white font-bold hover:underline">Sign in</Link>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
