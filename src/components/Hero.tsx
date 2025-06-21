import  { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowDown, FaInstagram } from 'react-icons/fa';
import * as THREE from 'three';
import profileImg from '../assets/PHO.jpg';
import AnimatedText from './AnimatedText';
import { fadeIn, staggerContainer, scaleIn } from '../types/animations';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: '#ffffff',
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <motion.div
      id="home"
      className="w-full min-h-screen relative overflow-hidden bg-black text-white py-12"
      style={{ opacity, scale, y }}
    >
      <div ref={containerRef} className="absolute inset-0" />
      <motion.div
        className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-start min-h-screen relative z-10 gap-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Text */}
        <motion.div className="flex-1 w-full" variants={fadeIn}>
          <div className="space-y-6">
            <AnimatedText
              text="Hello, there I'm"
              type="paragraph"
              animation="slide"
              className="text-white text-lg md:text-xl font-mono"
            />
            <AnimatedText
              text="Thanushan"
              type="heading"
              animation="typing"
              className="text-5xl sm:text-8xl font-bold text-white"
            />
            <AnimatedText
              text="a Full Stack Developer."
              type="title"
              animation="bounce"
              className="text-3xl sm:text-4xl font-bold text-gray-300"
              delay={0.2}
            />
            <AnimatedText
              text="I'm a passionate full-stack developer specializing in building exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products."
              type="paragraph"
              animation="fade"
              className="text-gray-400 py-4 max-w-[700px] text-lg md:text-xl leading-relaxed"
              delay={0.4}
            />
            <motion.div variants={fadeIn} className="flex gap-6 mt-8">
              {[{
                icon: <FaGithub size={28} />,
                link: 'https://github.com/Thanushan1022'
              }, {
                icon: <FaLinkedin size={28} />,
                link: 'https://www.linkedin.com/in/mohamed-ihsas-2a928a2b7'
              }, {
                icon: <FaInstagram size={28} />,
                link: 'https://instagram.com/thanu_shan22'
              }].map(({ icon, link }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white hover:text-gray-300 transition-all duration-300 border border-gray-700 p-3 rounded-full hover:bg-white/10"
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Profile Image */}
        <motion.div className="flex-1 w-full flex justify-center items-center" variants={scaleIn}>
          <div className="relative group">
            <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
            <motion.img
              src={profileImg}
              alt="Profile"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-white shadow-lg bg-black relative z-10 transition-all duration-500 group-hover:shadow-white/20"
              draggable={false}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Scroll Down Arrow */}
        <motion.div
          variants={fadeIn}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white cursor-pointer border border-gray-700 p-3 rounded-full hover:bg-white/10 transition-all duration-300"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <FaArrowDown size={20} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
