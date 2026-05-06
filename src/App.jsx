import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import AdminDashboard from './pages/AdminDashboard';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import NavBar from './components/NavBar';
import BottomNav from './components/BottomNav';
import Particles from './components/Particles';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="animated-bg min-h-screen text-white relative">
      <Particles count={40} />
      <Router>
        {user && <NavBar />}
        <div className={`min-h-screen ${user ? 'pt-16 pb-20 md:pb-0' : 'flex items-center justify-center'} relative z-10`}>
          <Routes>
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/" /> : <Login />
              } 
            />
            <Route 
              path="/register" 
              element={
                user ? <Navigate to="/" /> : <Register />
              } 
            />
            <Route 
              path="/movie/:id" 
              element={
                <ProtectedRoute>
                  <MovieDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/movies" 
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tv-shows" 
              element={
                <ProtectedRoute>
                  <TVShows />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/downloads" 
              element={
                <ProtectedRoute>
                  <DownloadsPlaceholder />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        {user && <BottomNav />}
      </Router>
    </div>
  );
}

// Simple placeholder for Downloads page
const DownloadsPlaceholder = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center text-white mt-10">
    <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-6 border border-gray-700 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
      <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold mb-3 drop-shadow-md">Movies and TV Shows You Download Appear Here</h2>
    <p className="text-gray-400 max-w-sm mb-8">Download your favorite movies and shows so you can watch them anywhere, even without an internet connection.</p>
    <a href="/" className="bg-white text-black px-6 py-3 rounded-md font-bold hover:bg-gray-200 transition shadow-lg">
      Find Something to Download
    </a>
  </div>
);

export default App;
