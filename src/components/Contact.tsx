import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUser, FaComment, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  useEffect(() => {
    emailjs.init('mXKWDY9ESIHAUk0XG');
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'thanushan1022@gmail.com',
      };

      await emailjs.send(
        'service_umi3zrj',
        'template_ff95d0r',
        templateParams,
        'GXqBPaZQgFqTOPR8o'
      );

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send message. Please try again or contact me directly at thanushan1022@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl text-white" />,
      title: "Email",
      content: "thanushan1022@gmail.com",
      link: "mailto:thanushan1022@gmail.com"
    },
    {
      icon: <FaPhone className="text-2xl text-white" />,
      title: "Phone",
      content: "0743187254",
      link: "tel:+743187254"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-white" />,
      title: "Location",
      content: "Srilanka, Colombo",
      link: "https://maps.google.com"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold inline border-b-4 border-white mb-4">
            Let's Collaborate
          </h2>
          <p className="text-gray-400 text-lg">
            Get in touch with me for any questions or opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm"
                >
                  {info.icon}
                  <div>
                    <h4 className="font-semibold">{info.title}</h4>
                    <p className="text-gray-400">{info.content}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className={`text-lg ${focusedField === 'name' ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your Name"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className={`text-lg ${focusedField === 'email' ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your Email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FaComment className={`text-lg ${focusedField === 'message' ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your Message"
                  required
                  rows={6}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>

              {success && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center"
                >
                  Your message has been sent successfully!
                </motion.p>
              )}

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center"
                >
                  {error}
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
