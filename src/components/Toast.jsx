import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Download, Clock, Heart, Share2, X, AlertCircle } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle,
  download: Download,
  watchlater: Clock,
  mylist: Heart,
  share: Share2,
  error: AlertCircle,
};

const COLORS = {
  success:    'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300',
  download:   'from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-300',
  watchlater: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300',
  mylist:     'from-pink-500/20 to-rose-500/20 border-pink-500/40 text-pink-300',
  share:      'from-purple-500/20 to-violet-500/20 border-purple-500/40 text-purple-300',
  error:      'from-red-500/20 to-rose-500/20 border-red-500/40 text-red-300',
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'success', duration = 3500 }) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast Portal */}
      <div className="fixed top-6 right-4 z-[9999] flex flex-col gap-3 pointer-events-none max-w-xs w-full">
        <AnimatePresence>
          {toasts.map(toast => {
            const Icon = ICONS[toast.type] || CheckCircle;
            const colorClass = COLORS[toast.type] || COLORS.success;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 80, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.85 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl 
                  border backdrop-blur-xl bg-gradient-to-r shadow-2xl ${colorClass}`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium text-white leading-snug flex-1">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
};
