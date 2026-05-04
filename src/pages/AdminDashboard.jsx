import React, { useState } from 'react';

const AdminDashboard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    thumbnail: null,
    video: null
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mock upload
    setTimeout(() => {
      alert('Movie uploaded successfully! (Mock)');
      setStep(1);
      setFormData({ title: '', description: '', genre: '', thumbnail: null, video: null });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 drop-shadow-md">Admin Dashboard - Upload Movie</h1>
      
      <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-xl backdrop-blur-md border border-white/10 shadow-2xl">
        {/* Progress Bar */}
        <div className="flex mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-2 rounded-full mx-1 ${step >= s ? 'bg-playfix-red shadow-[0_0_10px_rgba(229,9,20,0.5)]' : 'bg-gray-700/50'}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-200">Step 1: Movie Details</h2>
              <input type="text" placeholder="Movie Title" required
                className="w-full p-3 rounded bg-black/40 text-white focus:outline-none focus:border-playfix-red focus:ring-1 focus:ring-playfix-red border border-gray-600/50 transition-all"
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <textarea placeholder="Description" required rows="4"
                className="w-full p-3 rounded bg-black/40 text-white focus:outline-none focus:border-playfix-red focus:ring-1 focus:ring-playfix-red border border-gray-600/50 transition-all"
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              <input type="text" placeholder="Genre (e.g., Action, Sci-Fi)" required
                className="w-full p-3 rounded bg-black/40 text-white focus:outline-none focus:border-playfix-red focus:ring-1 focus:ring-playfix-red border border-gray-600/50 transition-all"
                value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})} />
              <div className="flex justify-end">
                <button type="button" onClick={handleNext} className="bg-playfix-red px-6 py-2 rounded font-bold hover:bg-playfix-red-hover transition shadow-[0_0_10px_rgba(229,9,20,0.4)]">Next</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-200">Step 2: Thumbnail</h2>
              <input type="file" accept="image/*" required
                className="w-full p-3 rounded bg-black/40 text-white focus:outline-none focus:border-playfix-red focus:ring-1 focus:ring-playfix-red border border-gray-600/50 transition-all"
                onChange={e => setFormData({...formData, thumbnail: e.target.files[0]})} />
              <div className="flex justify-between">
                <button type="button" onClick={handlePrev} className="bg-gray-600 px-6 py-2 rounded font-bold hover:bg-gray-500 transition">Back</button>
                <button type="button" onClick={handleNext} className="bg-playfix-red px-6 py-2 rounded font-bold hover:bg-playfix-red-hover transition shadow-[0_0_10px_rgba(229,9,20,0.4)]">Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-200">Step 3: Video File</h2>
              <input type="file" accept="video/*" required
                className="w-full p-3 rounded bg-black/40 text-white focus:outline-none focus:border-playfix-red focus:ring-1 focus:ring-playfix-red border border-gray-600/50 transition-all"
                onChange={e => setFormData({...formData, video: e.target.files[0]})} />
              <div className="flex justify-between">
                <button type="button" onClick={handlePrev} className="bg-gray-600 px-6 py-2 rounded font-bold hover:bg-gray-500 transition">Back</button>
                <button type="submit" className="bg-playfix-red px-6 py-2 rounded font-bold hover:bg-playfix-red-hover transition shadow-[0_0_10px_rgba(229,9,20,0.4)]">Upload Movie</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
