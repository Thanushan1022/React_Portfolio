import { useState } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const menuItems = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-black text-white z-50 shadow-md">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Portfolio</h1>
      </motion.div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex">
        {menuItems.map((item) => (
          <motion.li
            key={item.name}
            whileHover={{ scale: 1.1 }}
            className="px-4 cursor-pointer text-white hover:text-gray-400 transition duration-200"
          >
            <Link
              to={item.to}
              smooth={true}
              duration={500}
              className="text-white"
            >
              {item.name}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Hamburger */}
      <div onClick={handleClick} className="md:hidden z-10 cursor-pointer text-white">
        {nav ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Mobile Menu */}
      <motion.ul
        className={`${
          nav ? 'flex' : 'hidden'
        } absolute top-0 left-0 w-full h-screen bg-black flex-col justify-center items-center z-40`}
        initial={{ opacity: 0 }}
        animate={{ opacity: nav ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {menuItems.map((item) => (
          <motion.li
            key={item.name}
            whileHover={{ scale: 1.1 }}
            className="py-6 text-4xl cursor-pointer text-white hover:text-gray-400 transition duration-200"
          >
            <Link
              onClick={handleClick}
              to={item.to}
              smooth={true}
              duration={500}
              className="text-white"
            >
              {item.name}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Navbar;
