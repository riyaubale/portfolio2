import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Skills.css';

const skillLogos = [
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'R', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
  { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Bash', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Hadoop', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg' },
  { name: 'Spark', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
]
const containerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } },
};

export default function Skills() {
  const [showSkills, setShowSkills] = useState(false);

  return (
    <section id="skills" className="pt-2 pb-8 bg-black">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Toggle Button */}
        <button
          onClick={() => setShowSkills(prev => !prev)}
          className="bg-[#7d2ff7] hover:bg-[#7d2ff7] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 mb-10"
        >
          {showSkills ? 'Hide' : 'Show'}
        </button>

        {/* Animated Skill Grid */}
        <AnimatePresence initial={false}>
          {showSkills && (
            <motion.div
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {skillLogos.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col items-center group"
                >
                  <div className="p-1">
                    <div className="skill-icon-wrapper w-15 h-15">
                      <div className="bg-[#1a1a1a] w-full h-full rounded-full flex items-center justify-center shadow-md relative z-10">
                        <img src={skill.logo} alt={skill.name} className="w-7 h-7" />
                      </div>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-gray-300 group-hover:text-purple-400 transition-colors duration-300">
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
