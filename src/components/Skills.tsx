import  { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FaReact, FaNodeJs,  FaGitAlt,  FaHtml5, FaCss3Alt, FaJs, FaCode,
  FaFigma,
  FaJava,
} from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiExpress, SiKotlin } from 'react-icons/si';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const skills = [
    { name: 'React', icon: <FaReact size={50} />, level: 90, color: '#61DAFB', description: 'Building modern, responsive user interfaces with React and its ecosystem' },
    { name: 'TypeScript', icon: <SiTypescript size={50} />, level: 85, color: '#3178C6', description: 'Developing type-safe applications with TypeScript' },
    { name: 'JavaScript', icon: <FaJs size={50} />, level: 95, color: '#F7DF1E', description: 'Expert in modern JavaScript (ES6+) and its best practices'},
    { name: 'Node.js', icon: <FaNodeJs size={50} />, level: 88, color: '#339933', description: 'Building scalable backend services with Node.js' },
    { name: 'MongoDB', icon: <SiMongodb size={50} />, level: 85, color: '#47A248', description: 'Designing and optimizing NoSQL databases'},
    { name: 'Express', icon: <SiExpress size={50} />, level: 87, color: '#ffffff', description: 'Creating RESTful APIs and middleware with Express' },
    { name: 'HTML5', icon: <FaHtml5 size={50} />, level: 95, color: '#E34F26', description: 'Writing semantic and accessible HTML markup' },
     { name: 'Java', icon: <FaJava size={50} />, level: 60, color: '#764ABC', description: 'versatile, object-oriented programming language used globally'},
    { name: 'CSS3', icon: <FaCss3Alt size={50} />, level: 90, color: '#1572B6', description: 'Creating responsive and animated user interfaces'},
    { name: 'Git', icon: <FaGitAlt size={50} />, level: 85, color: '#F05032', description: 'Version control and collaborative development'},
    { name: 'Figma', icon: <FaFigma size={50} />, level: 80, color: '#2496ED', description: ' collaborative interface design and prototyping web tool'},
    { name: 'Kotlin', icon: <SiKotlin size={50} />, level: 75, color: '#FF9900', description: 'Android apps, web development, server-side, and multiplatform projects' },
    { name: 'Tailwind', icon: <SiTailwindcss size={50} />, level: 92, color: '#06B6D4', description: 'Building modern UIs with utility-first CSS' },
   
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      id="skills"
      className="w-full min-h-screen bg-black text-white py-20"
      style={{ opacity, scale }}
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold inline border-b-4 border-white mb-4">Skills</h2>
          <p className="py-4 text-gray-400 text-lg md:text-xl">These are the technologies I’ve worked with</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={skillVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="group relative bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div style={{ color: skill.color }} whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  {skill.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                  
                </div>
              </div>

              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  style={{ backgroundColor: skill.color }}
                  className="absolute top-0 left-0 h-full rounded-full"
                />
              </div>

              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-400">{skill.level}%</span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSkill === skill.name ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-white"
                >
                  <FaCode size={14} />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: hoveredSkill === skill.name ? 1 : 0,
                  height: hoveredSkill === skill.name ? 'auto' : 0,
                }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-sm text-gray-400 overflow-hidden"
              >
                {skill.description}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Skills;
