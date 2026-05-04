import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard = () => (
  <div className="relative rounded-md overflow-hidden bg-gray-800/50 aspect-video animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full skeleton-shimmer" />
  </div>
);

export const SkeletonHero = () => (
  <div className="w-full h-[70vh] md:h-[85vh] bg-gray-900 animate-pulse relative">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skeleton-shimmer" />
    <div className="absolute bottom-20 left-12 space-y-4">
      <div className="w-64 h-12 bg-gray-700 rounded" />
      <div className="w-96 h-4 bg-gray-700 rounded" />
      <div className="w-80 h-4 bg-gray-700 rounded" />
      <div className="flex space-x-4 mt-4">
        <div className="w-32 h-10 bg-gray-700 rounded" />
        <div className="w-32 h-10 bg-gray-700 rounded" />
      </div>
    </div>
  </div>
);

// Add to index.css or tailwind config for the shimmer effect
// .skeleton-shimmer {
//   transform: translateX(-100%);
//   animation: shimmer 1.5s infinite;
// }
// @keyframes shimmer {
//   100% { transform: translateX(100%); }
// }
