import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, Clock, Plus, Share2,
  Check, Loader2, X
} from 'lucide-react';
import { useToast } from './Toast';

/* ─── localStorage helpers ─── */
const LS_LATER  = 'pf_watch_later';
const LS_MYLIST = 'pf_my_list';

const lsGet  = (key) => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } };
const lsHas  = (key, id) => lsGet(key).includes(id);
const lsAdd  = (key, id) => { const a = lsGet(key); if (!a.includes(id)) localStorage.setItem(key, JSON.stringify([...a, id])); };
const lsRem  = (key, id) => localStorage.setItem(key, JSON.stringify(lsGet(key).filter(x => x !== id)));
const lsToggle = (key, id) => { lsHas(key, id) ? lsRem(key, id) : lsAdd(key, id); };

/* ─── Download progress bar ─── */
const DownloadProgress = ({ onDone }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(onDone, 400);
      }
      setProgress(Math.min(p, 100));
    }, 200);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.95 }}
      className="absolute -top-14 left-1/2 -translate-x-1/2 w-44 px-3 py-2 rounded-xl
        bg-black/80 backdrop-blur-xl border border-blue-500/40 text-white text-xs shadow-2xl z-50"
    >
      <div className="flex items-center justify-between mb-1 gap-2">
        <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
        <span className="text-blue-300 font-semibold">Downloading…</span>
        <span className="text-gray-400">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 progress-bar-shimmer"
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'linear', duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

/* ─── Single action button ─── */
const GlassButton = ({ icon: Icon, activeIcon: ActiveIcon, label, activeLabel,
  isActive, isLoading, onClick, glowColor, borderColor, children }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.06, y: -2 }}
    whileTap={{ scale: 0.94 }}
    className={`relative group flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2
      px-4 sm:px-5 py-3 sm:py-2.5 rounded-2xl
      backdrop-blur-xl bg-white/5 border transition-all duration-300
      text-white font-semibold text-xs sm:text-sm select-none outline-none
      focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500
      ${isActive
        ? `border-transparent shadow-[0_0_18px_${glowColor}] bg-white/10`
        : `${borderColor} hover:bg-white/10 hover:shadow-[0_0_18px_${glowColor}]`
      }`}
    style={isActive ? {
      background: `linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))`,
      borderImage: `linear-gradient(135deg, ${glowColor}, ${glowColor}) 1`,
    } : {}}
  >
    {/* Gradient border overlay on hover */}
    <span className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
      pointer-events-none border border-transparent`}
      style={{
        background: `linear-gradient(#0000,#0000) padding-box, linear-gradient(135deg, ${glowColor}, transparent) border-box`
      }}
    />

    {children}

    {isLoading
      ? <Loader2 className="w-4 h-4 animate-spin relative z-10" />
      : isActive && ActiveIcon
        ? <ActiveIcon className="w-4 h-4 relative z-10" />
        : <Icon className="w-4 h-4 relative z-10" />
    }
    <span className="relative z-10 whitespace-nowrap">
      {isActive && activeLabel ? activeLabel : label}
    </span>
  </motion.button>
);

/* ─── Main HeroActions component ─── */
const HeroActions = ({ movie }) => {
  const { addToast } = useToast();

  const [downloading, setDownloading]       = useState(false);
  const [showProgress, setShowProgress]     = useState(false);
  const [watchLater, setWatchLater]         = useState(false);
  const [inMyList, setInMyList]             = useState(false);
  const [shareLoading, setShareLoading]     = useState(false);

  // Sync with localStorage on mount
  useEffect(() => {
    if (!movie?._id) return;
    setWatchLater(lsHas(LS_LATER, movie._id));
    setInMyList(lsHas(LS_MYLIST, movie._id));
  }, [movie?._id]);

  /* --- Download --- */
  const handleDownload = useCallback(() => {
    if (downloading) return;
    setDownloading(true);
    setShowProgress(true);
  }, [downloading]);

  const handleDownloadDone = useCallback(() => {
    setShowProgress(false);
    setDownloading(false);
    addToast({ message: `"${movie?.title}" downloaded successfully!`, type: 'download' });
  }, [movie?.title, addToast]);

  /* --- Watch Later --- */
  const handleWatchLater = useCallback(() => {
    const next = !watchLater;
    setWatchLater(next);
    lsToggle(LS_LATER, movie?._id);
    addToast({
      message: next ? `Added "${movie?.title}" to Watch Later` : `Removed from Watch Later`,
      type: 'watchlater',
    });
  }, [watchLater, movie, addToast]);

  /* --- My List --- */
  const handleMyList = useCallback(() => {
    const next = !inMyList;
    setInMyList(next);
    lsToggle(LS_MYLIST, movie?._id);
    addToast({
      message: next ? `"${movie?.title}" added to My List ❤️` : `Removed from My List`,
      type: 'mylist',
    });
  }, [inMyList, movie, addToast]);

  /* --- Share --- */
  const handleShare = useCallback(async () => {
    setShareLoading(true);
    const shareData = {
      title: movie?.title || 'PlayFix',
      text: `Watch "${movie?.title}" on PlayFix!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        addToast({ message: 'Shared successfully!', type: 'share' });
      } else {
        await navigator.clipboard.writeText(shareData.url);
        addToast({ message: 'Link copied to clipboard!', type: 'share' });
      }
    } catch {
      addToast({ message: 'Could not share. Link copied!', type: 'share' });
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    } finally {
      setShareLoading(false);
    }
  }, [movie, addToast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
      className="flex flex-row flex-wrap gap-2 sm:gap-3 mt-4"
    >
      {/* ── Download ── */}
      <div className="relative">
        <AnimatePresence>
          {showProgress && <DownloadProgress onDone={handleDownloadDone} />}
        </AnimatePresence>
        <GlassButton
          icon={Download}
          activeIcon={Check}
          label="Download"
          activeLabel="Downloaded"
          isActive={false}
          isLoading={downloading}
          onClick={handleDownload}
          glowColor="rgba(59,130,246,0.6)"
          borderColor="border-blue-500/30 hover:border-blue-400/60"
        />
      </div>

      {/* ── Watch Later ── */}
      <GlassButton
        icon={Clock}
        activeIcon={Check}
        label="Watch Later"
        activeLabel="Added"
        isActive={watchLater}
        isLoading={false}
        onClick={handleWatchLater}
        glowColor="rgba(251,191,36,0.6)"
        borderColor="border-amber-500/30 hover:border-amber-400/60"
      />

      {/* ── My List ── */}
      <GlassButton
        icon={Plus}
        activeIcon={Check}
        label="My List"
        activeLabel="Added"
        isActive={inMyList}
        isLoading={false}
        onClick={handleMyList}
        glowColor="rgba(244,63,94,0.6)"
        borderColor="border-pink-500/30 hover:border-pink-400/60"
      >
        {/* Pulse ring when active */}
        {inMyList && (
          <motion.span
            className="absolute inset-0 rounded-2xl border border-pink-500/50"
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </GlassButton>

      {/* ── Share ── */}
      <GlassButton
        icon={Share2}
        label="Share"
        isActive={false}
        isLoading={shareLoading}
        onClick={handleShare}
        glowColor="rgba(147,51,234,0.6)"
        borderColor="border-purple-500/30 hover:border-purple-400/60"
      />
    </motion.div>
  );
};

export default HeroActions;
