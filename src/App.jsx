import React, { useEffect, useState } from 'react';
import TextType from './components/TextType';
import Dock from './components/Dock';
import DecryptedText from './components/DecryptedText';
import PixelTransition from './components/PixelTransition';
import AnimatedCard from './components/AnimatedCard';
import { VscHome, VscAccount, VscBook, VscGithub, VscMail } from 'react-icons/vsc';
import { motion } from 'framer-motion';
import './App.css';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import { FiMail } from 'react-icons/fi';
import { FaLinkedinIn } from "react-icons/fa";
import SplashCursor from './components/SplashCursor';
import ProjectShell from "./components/ProjectShell";

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const [showSplash, setShowSplash] = useState(false);
  useEffect(() => {
    const canShow =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer:fine)').matches &&
      window.innerWidth >= 768;
    setShowSplash(canShow);
  }, []);

  const projectCards = [
    {
      title: "Bus Tracker & Map",
      handle: "bus-tracker",
      description: [
        "Built a Java app to compute the shortest path between UW-Madison campus locations using a directed graph, Dijkstra’s Algorithm, and a priority queue for optimized pathfinding.",
        "Integrated the Madison Metro API to create a real-time bus tracker with delay alerts, detour monitoring, and optimized routes, serving 5,000+ users and reducing wait times by 30%.",
        "Designed an interactive JavaFX GUI mapping 35 routes and 1,500+ stops, leveraging a Binary Search Tree for efficient scheduling and dynamic updates.",
      ],
    },
    {
      title: "CO2, GDP, Population Analysis",
      handle: "data-analysis",
      url: "https://github.com/riyaubale/co2_gdp_analysis.git",
      description: [
        "Performed a comprehensive data analysis in R to explore relationships between CO2 emissions, GDP, and population across countries.",
        "Applied hypothesis testing to assess the statistical significance of correlations and trends among the variables.",
        "Wrangled, cleaned, and visualized data using dplyr, tidyr, and ggplot2.",
      ],
    },
    {
      title: "Face Emotion Classification",
      handle: "emotion-classifier",
      url: "https://github.com/riyaubale/face_classification.git",
      description: [
        "Built and trained a three-layer neural network to classify facial emotions, evaluating training accuracy and performance using 8-fold cross-validation; error rates ranged from 0.03125 to 0.05468 depending on the fold tested.",
        "Implemented and compared Ridge Regression and Singular Value Decomposition (SVD) for emotion prediction, analyzing error rates to evaluate model performance; SVD Error Rate: 11.16%, Ridge Regression Error Rate: 4.80%.",
      ],
    },
    {
      title: "Linux Terminal",
      handle: "linux-terminal",
      url: "https://github.com/riyaubale/linuxterminal.git",
      description: [
        "Developed a fully functional Linux terminal emulator in C, implementing core UNIX utilities and command processing.",
        "Engineered comprehensive shell functionality including local/export variables, variable substitution, command substitution, and multi-stage piping.",
      ],
    },
    {
      title: "Quantitative Finance Trading Algorithm Performance Analyzer ",
      handle: "quant-finance",
      url: "https://github.com/riyaubale/sw-challenge-spring-2025.git",
      description: [
        "Developed a high-frequency trading data processor in Python that efficiently loaded, cleaned, and transformed thousands of CSV files containing tick data through optimized multithreading techniques, reducing processing time.",
        "Implemented a robust data cleaning pipeline that identified and addressed four critical data anomalies including timestamp errors, price outliers, and volume irregularities, improving data integrity for subsequent analysis.",
        "Created a flexible data transformation interface that generates OHLCV (Open-High-Low-Close-Volume) bars for customizable time intervals (e.g., ”4s”, ”1h30m”, ”1d”), enabling accurate performance evaluation of algorithmic trading strategies.",
      ],
    }
  ];

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { icon: <VscAccount size={18} />, label: 'About', onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <VscBook size={18} />, label: 'Experience', onClick: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <VscGithub size={18} />, label: 'Projects', onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <VscMail size={18} />, label: 'Contact', onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {showSplash && (
        <SplashCursor
          TRANSPARENT
          BACK_COLOR={{ r: 0, g: 0, b: 0 }}
          DYE_RESOLUTION={720}   // desktop quality
          SIM_RESOLUTION={96}
          CURL={4}
          SPLAT_FORCE={5000}
          COLOR_UPDATE_SPEED={8}
        />
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full flex justify-center items-center">
          <div className="flex justify-center items-center w-full">
            <TextType
              text={['print("Hello World, I\'m Riya!")',]}
              typingSpeed={80}
              pauseDuration={1800}
              showCursor={true}
              cursorCharacter="|"
              className="text-4xl sm:text-5xl md:text-6xl font-semibold font-sans text-center w-full"
              cursorClassName="ml-2 text-[#7d2ff7]"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-black">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-10 items-stretch">
          <AnimatedCard className="w-full md:w-[22rem] h-[24rem]">
            <PixelTransition
              firstContent={
                <div className="w-full h-full grid place-items-center bg-[#111] rounded-2xl">
                  <p className="text-sm text-gray-400 italic lowercase">peekaboo!</p>
                </div>
              }
              secondContent={
                <img
                  src="/riya.jpg"
                  alt="Riya"
                  className="w-full h-full object-cover rounded-2xl"
                />
              }
              gridSize={12}
              pixelColor="#111"
              animationStepDuration={0.4}
              className="w-full h-full"
            />
          </AnimatedCard>

          <AnimatedCard className="w-full h-[24rem] flex-1 flex flex-col justify-center">
            <DecryptedText
              text="About Me"
              className="heading"
              encryptedClassName="text-white"
              animateOn="view"
              speed={150}
            />
            <motion.pre
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              className="code-snippet"
            >
              <code>
                <span className="code-keyword">const</span> <span className="code-variable">riya</span> = {'{\n'}
                &nbsp;&nbsp;<span className="code-property">pronouns</span>: <span className="code-string">'she/her/hers'</span>,{'\n'}
                &nbsp;&nbsp;<span className="code-property">school</span>: {'{\n'}
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">name</span>: <span className="code-string">'University of Wisconsin Madison'</span>,{'\n'}
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">major</span>: [<span className="code-string">'Computer Science'</span>, <span className="code-string">'Data Science'</span>],{'\n'}
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">minor</span>: [<span className="code-string">'Math'</span>, <span className="code-string">'3D Studio Art'</span>]{'\n'}
                &nbsp;&nbsp;{'};'}{'\n'}
                &nbsp;&nbsp;<span className="code-property">hobbies</span>: [<span className="code-string">'machineLearning'</span>, <span className="code-string">'glassBlowing'</span>, <span className="code-string">'hiking'</span>],{'\n'}
                {'};'}
              </code>
            </motion.pre>
          </AnimatedCard>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <DecryptedText
            text="Experience"
            className="heading"
            encryptedClassName="text-white"
            animateOn="view"
            speed={150}
          />
          <p className="text-sm text-gray-400 mt-4 italic text-center tech-text">
            scroll sideways →
          </p>
          <div className="w-full overflow-x-auto mt-12 px-4">
            <div className="min-w-max mx-auto">
              <Timeline />
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Projects */}
      <section id="projects" className="pt-12 pb-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="w-full flex flex-col md:flex-row gap-12">
            <div className="flex-1 w-full">
              <div className="mb-4">
                <DecryptedText text="Skills:" className="heading" encryptedClassName="text-white" animateOn="view" speed={150} />
              </div>
              <Skills />
            </div>

            <div className="flex-1 w-full flex flex-col">
              <div className="mb-4">
                <DecryptedText text="Projects:" className="heading" encryptedClassName="text-white" animateOn="view" speed={150} />
              </div>
              <ProjectShell projects={projectCards} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 bg-black">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedCard className="w-full contact-glow-card flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="relative z-10 bg-[#111]/80 border border-[#222] shadow-xl backdrop-blur-md rounded-2xl p-10 text-center w-full"
            >
              <h3 className="text-3xl font-semibold mb-2 text-white tech-heading">Let's Connect!</h3>
              <div className="flex justify-center items-center space-x-6">
                <a
                  href="mailto:riyaubale90@gmail.com"
                  className="flex items-center space-x-2 bg-[#7d2ff7] hover:bg-[#7d2ff7] text-white px-5 py-3 rounded-lg transition-all duration-300 shadow-md tech-button"
                >
                  <FiMail className="h-5 w-5" />
                  <span>Email</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/riyaubale/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-[#0077b5] hover:bg-[#005b8a] text-white px-5 py-3 rounded-lg transition-all duration-300 shadow-md tech-button"
                >
                  <FaLinkedinIn className="h-5 w-5" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </AnimatedCard>
        </div>
      </section>

      {/* Bottom Dock */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Dock items={items} panelHeight={68} baseItemSize={50} magnification={70} />
      </div>
    </div>
  );
}
