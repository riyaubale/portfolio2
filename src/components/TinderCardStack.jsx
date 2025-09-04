import React, { useState } from 'react';
import CustomTinderCard from './TinderCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function TinderCardStack({ projects }) {
  const [cards, setCards] = useState([
    {
      title: '__intro__',
      subtitle: '',
      description: '',
      gradient: 'linear-gradient(145deg, #1f2937, #111827)',
      borderColor: '#4b5563',
      isIntroCard: true,
    },
    ...projects,
  ]);

  const [swipeEffect, setSwipeEffect] = useState(null);
  const [hasSwiped, setHasSwiped] = useState(false);

  const handleSwipe = (dir, title) => {
    setSwipeEffect(dir === 'right' ? 'like' : dir === 'left' ? 'nope' : null);
    setHasSwiped(true);
    setTimeout(() => setSwipeEffect(null), 400);
    setCards((prev) => prev.filter((card) => card.title !== title));
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[700px] bg-[#0d0d0d]">
      <div className="bg-black border-[12px] border-gray-900 rounded-[3rem] shadow-2xl w-[380px] h-[720px] flex flex-col items-center relative">

        {/* Notch */}
        <div className="w-[140px] h-[30px] bg-gray-800 rounded-b-2xl mt-[-12px] mb-2 z-10 flex justify-center items-center">
          <div className="w-[8px] h-[8px] bg-black rounded-full" />
        </div>

        {/* Screen */}
        <div
          className={`relative w-full flex-1 px-2 pb-6 pt-2 overflow-hidden rounded-[2rem] transition-all duration-300
            ${
              swipeEffect === 'like'
                ? 'bg-green-600/20 shadow-[0_0_40px_#22c55e]'
                : swipeEffect === 'nope'
                ? 'bg-red-600/20 shadow-[0_0_40px_#ef4444]'
                : 'bg-[#101010]'
            }`}
        >
          {/* Instructional overlay */}
          {!hasSwiped && cards.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute z-20 top-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm shadow"
            >
              Swipe left or right to begin →
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {cards.length > 0 ? (
              [...cards].reverse().map((project) => (
                <CustomTinderCard
                  key={project.title}
                  project={project}
                  isIntro={project.isIntroCard}
                  onSwipe={handleSwipe}
                />
              ))
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center"
              >
                <h2 className="text-2xl font-bold mb-2">You're all caught up 🎉</h2>
                <p className="text-sm text-gray-400">No more cards to swipe.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home button */}
        <div className="w-16 h-16 rounded-full bg-gray-800 mt-2 mb-3 border-[4px] border-gray-600 shadow-inner" />
      </div>
    </div>
  );
}
