import React from 'react';
import { FaLaptopCode, FaBriefcase, FaCogs, FaRobot, FaChartLine } from 'react-icons/fa';

const experiences = [
  {
    role: 'Data Solutions Intern',
    company: 'Spaulding Ridge',
    date: 'Jun 2025 – Aug 2025',
    description: [
      '* Designed and implemented automated workflows to clean and manage log files, improving data quality and efficiency for a Fortune 500 client.',
      '* Worked with middleware platforms including Boomi, MuleSoft, and Fivetran to support seamless data integration and migration processes.',
      '* Utilized Snowflake and SQL to perform data warehousing tasks to support scalable and secure data architecture.',
    ],
    icon: <FaLaptopCode />,
  },
  {
    role: 'Data Science Intern',
    company: 'Soundscape & Audiology Research Lab - UWMadison',
    date: 'Sep 2024 – Jan 2025',
    description: [
      '* Developed and refined speech classification systems using advanced machine learning techniques, including recurrent neural networks (RNNs), convolutional neural networks (CNNs), transfer learning, decision trees, and random forests.',
      '* Wrote Python scripts and utilized TensorFlow and MATLAB to adapt and optimize the YAMNet sound classification model.',
      '* Integrated generative AI techniques and large language models (LLMs) to advance sound and speech classification, exploring convolutional recurrent neural networks (CRNNs) for improved accuracy.',
    ],
    icon: <FaBriefcase />,
  },
  {
    role: 'Frontend Software Lead',
    company: 'The Wisconsin Messenger',
    date: 'May 2024 – Dec 2024',
    description: [
      '* Led a 10-member front-end team to develop Wisconsin Messenger website using TypeScript and React enabling users to efficiently access past newsletters.',
      '* Designed a newsletter layout in Figma, HTML, and CSS with a focus on enhancing user experience (UX).',
      '* Collaborated with the backend lead on SQL integration and natural language processing (NLP) tasks for search functionality.',
    ],
    icon: <FaRobot />,
  },
  {
    role: 'Software Engineer Intern',
    company: 'Marine Robotics Lab - UWMadison',
    date: 'May 2024 – Aug 2024',
    description: [
      '* Developed SLAM (Simultaneous Localization and Mapping) algorithms to enhance localization and navigation of autonomous underwater robots, integrating sensors and improving reliability in dynamic aquatic environments.',
      '* Explored deep reinforcement learning techniques, attending weekly strategy meetings to discuss software enhancements.',
    ],
    icon: <FaChartLine />,
  },
  {
    role: 'Machine Learning Intern',
    company: 'Tangerine.ai',
    date: 'Jun 2023 – Aug 2023',
    description: [
      '* Developed classification algorithms for detecting anomalies in dash camera footage using machine learning and image analysis techniques.',
      '* Improved real-time data processing to enhance public safety and mobility.',
    ],
    icon: <FaCogs />,
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-700 z-0 transform -translate-y-1/2" />

      <div className="flex space-x-10 relative z-10 overflow-x-auto pb-6 scrollbar-hide">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="w-72 h-72 perspective shrink-0"
          >
            <div className="relative w-full h-full transition-transform duration-700 transform-style preserve-3d hover:rotate-y-180">
              {/* Front */}
              <div className="absolute inset-0 bg-[#111] rounded-xl shadow-md border border-gray-700 p-6 flex flex-col items-center justify-start text-center z-10 backface-hidden">
                <div className="w-12 h-12 bg-[#1f1f1f] rounded-full flex items-center justify-center border border-gray-600 text-white mb-4">
                  {exp.icon}
                </div>
                <h4 className="text-xl font-semibold">{exp.role}</h4>
                <p className="text-sm text-[#ba90fc]">{exp.company}</p>
                <p className="text-xs text-gray-400">{exp.date}</p>
              </div>

              {/* Back */}
              <div className="absolute inset-0 bg-[#1a1a1a] rounded-xl shadow-md border border-gray-700 
                p-6 text-sm text-gray-200 rotate-y-180 backface-hidden flex">
                <ul className="list-disc list-outside pl-5 space-y-2 w-full text-left overflow-y-auto">
                  {(Array.isArray(exp.description)
                    ? exp.description
                    : String(exp.description).split(/\r?\n|[•\u2022]|(?:\s*-\s*)/g)
                  )
                    .map(s => s.replace(/^[\s*•\-]+/, '').trim())
                    .filter(Boolean)
                    .map((point, i) => (
                      <li key={i} className="leading-snug">
                        {point}
                      </li>
                    ))}
                </ul>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
