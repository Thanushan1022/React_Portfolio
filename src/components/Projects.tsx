import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCode } from 'react-icons/fa';
import financialTrackerImg from '../assets/CoinCave.png';
import freshConImg from '../assets/Grocery.jpg';

// Placeholder images
const bloodDonationImg = 'https://placehold.co/800x600/2563eb/ffffff?text=Blood+Donation+System';
const portfolioReactImg = 'https://placehold.co/800x600/0284c7/ffffff?text=Portfolio+React';

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const projects = [
    {
      id: '1',
      title: 'Advanced Blood Donation System',
      description:
        'A comprehensive MERN stack application for managing blood donations and requests. Features include donor registration, blood inventory management, real-time blood request tracking, and automated matching system for blood types.',
      image: bloodDonationImg,
      github: 'https://github.com/Thanushan1022/Advanced-Blood-Donation-System',
      demo: 'https://blood-donation-system.vercel.app',
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Redux', 'JWT', 'Socket.io'],
      featured: true,
      stats: { stars: 145, forks: 38 },
    },
    {
      id: '2',
      title: 'FreshCoN Online Grocery',
      description:
        'A full-featured online grocery ordering system built with Java and MySQL. Features include product management, shopping cart, order processing, delivery tracking, and an admin dashboard for inventory management.',
      image: freshConImg,
      github: 'https://github.com/Thanushan1022/Online-Grocery-Ordering-System',
      demo: 'https://freshco-grocery.000webhostapp.com',
      technologies: ['Java', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      featured: true,
      stats: { stars: 98, forks: 25 },
    },
    {
      id: '3',
      title: 'Portfolio Website (React)',
      description:
        'A modern portfolio website built with React. Features component-based architecture, smooth transitions, and responsive design.',
      image: portfolioReactImg,
      github: 'https://github.com/yourusername/portfolio-react',
      demo: 'https://your-portfolio-react.vercel.app',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      featured: false,
      stats: { stars: 42, forks: 10 },
    },
    {
      id: '4',
      title: 'Financial Tracker App',
      description:
        'A comprehensive financial management Android application that helps users track expenses, manage budgets, and visualize spending patterns. Features include expense categorization, budget planning, and financial reports.',
      image: financialTrackerImg,
      github: 'https://github.com/Ihsas01/PersonalFinanceTrackerApp',
      demo: 'https://play.google.com/store/apps/details?id=com.yourusername.financialtracker',
      technologies: ['Kotlin', 'XML', 'Android SDK', 'Room Database', 'MPAndroidChart'],
      featured: true,
      stats: { stars: 112, forks: 28 },
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const projectVariants = {
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
      id="projects"
      className="w-full min-h-screen bg-white text-black py-20"
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
          <h2 className="text-4xl md:text-5xl font-bold inline border-b-4 border-black mb-4">
            Projects
          </h2>
          <p className="py-4 text-gray-600 text-lg md:text-xl">Check out some of my recent work</p>
        </motion.div>

        {/* Project Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-300" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded" />
                      <div className="h-4 bg-gray-300 rounded w-5/6" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={projectVariants}
                  whileHover="hover"
                  layout
                  className="group relative bg-gray-100 rounded-xl overflow-hidden border border-gray-300 hover:border-black transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-black">{project.title}</h3>
                      {project.featured && (
                        <span className="text-xs bg-black/10 text-black px-2 py-1 rounded-full flex items-center gap-1">
                          <FaStar size={12} />
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-black/10 text-black rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                        <motion.a
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:text-gray-900 transition-colors"
                        >
                          <FaGithub size={20} />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:text-gray-900 transition-colors"
                        >
                          <FaExternalLinkAlt size={20} />
                        </motion.a>
                      </div>

                      <div className="flex items-center gap-4 text-gray-600 text-sm">
                        <span className="flex items-center gap-1">
                          <FaStar size={14} />
                          {project.stats.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCode size={14} />
                          {project.stats.forks}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
