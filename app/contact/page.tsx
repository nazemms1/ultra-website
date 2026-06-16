'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import FAQSection from '@/components/FAQSection';
import Button from '@mui/material/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 60, damping: 12 },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="bg-[#121212] min-h-screen text-white pt-[140px] pb-12 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0DF1D9]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[300px] left-1/4 w-[400px] h-[400px] bg-[#0DF1D9]/3 rounded-full blur-[110px] pointer-events-none" />

      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          maxWidth: '1280px',
          mx: 'auto',
          px: { xs: 3, lg: '40px' },
          width: '100%',
          position: 'relative',
          zIndex: 10,
          mb: 16,
        }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#0DF1D9] bg-[#0DF1D9]/10 border border-[#0DF1D9]/20 uppercase mb-4">
            Get In Touch
          </div>
          <h1 className="font-ethnocentric text-3xl md:text-5xl uppercase tracking-wide leading-tight mb-4">
            LET&apos;S BUILD SOMETHING <span className="text-shimmer">ULTRA</span>
          </h1>
          <p className="max-w-[620px] mx-auto text-gray-400 font-rajdhani text-lg uppercase tracking-wider">
            Contact us now to talk about your product, users, and how we can scale your systems.
          </p>
        </motion.div>

        {/* Contact Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Info Columns (5 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <Typography variant="h3" className="font-rajdhani text-2xl font-bold text-[#0DF1D9] tracking-wider uppercase">
                Contact Information
              </Typography>
              <p className="text-gray-400 font-rajdhani text-[15px] normal-case leading-relaxed">
                Reach out to us through any channel or use the form to send us a direct message. Our technical team is available to answer your queries within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl border border-[#0DF1D9]/20 bg-[#0DF1D9]/5 text-[#0DF1D9]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-rajdhani text-sm font-bold text-gray-400 uppercase tracking-widest">Email</h4>
                  <a href="mailto:hello@ultrawares.com" className="font-rajdhani text-lg text-white hover:text-[#0DF1D9] transition-colors">
                    hello@ultrawares.com
                  </a>
                </div>
              </div>

              {/* Syria Office */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl border border-[#0DF1D9]/20 bg-[#0DF1D9]/5 text-[#0DF1D9]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-rajdhani text-sm font-bold text-gray-400 uppercase tracking-widest">Syria Office</h4>
                  <p className="font-rajdhani text-base text-white normal-case">
                    Damascus, Free Zone Area, Engineering Labs
                  </p>
                </div>
              </div>

              {/* UAE Office */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl border border-[#0DF1D9]/20 bg-[#0DF1D9]/5 text-[#0DF1D9]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-rajdhani text-sm font-bold text-gray-400 uppercase tracking-widest">UAE Office</h4>
                  <p className="font-rajdhani text-base text-white normal-case">
                    Dubai, Internet City, Building 12
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Column (7 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="glass card-surface p-8 md:p-10 border border-white/10 relative">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#0DF1D9]/3 rounded-full blur-[40px] pointer-events-none" />
              
              <Typography variant="h4" className="font-rajdhani text-xl font-bold uppercase tracking-wider text-white mb-6">
                Send a Message
              </Typography>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-[#0DF1D9] flex items-center justify-center text-[#0DF1D9] mb-4 shadow-[0_0_20px_rgba(13,241,217,0.3)]">
                    <Send className="w-7 h-7" />
                  </div>
                  <h3 className="font-rajdhani text-xl font-bold text-white uppercase tracking-wider mb-2">Message Sent!</h3>
                  <p className="text-gray-400 font-rajdhani text-sm normal-case">Thank you. We will get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-rajdhani text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#121212]/80 border border-white/10 rounded-xl px-4 py-3 font-rajdhani text-sm text-white focus:outline-none focus:border-[#0DF1D9] focus:shadow-[0_0_15px_rgba(13,241,217,0.15)] transition-all normal-case placeholder-gray-600"
                        placeholder="e.g. Nazem"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="font-rajdhani text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#121212]/80 border border-white/10 rounded-xl px-4 py-3 font-rajdhani text-sm text-white focus:outline-none focus:border-[#0DF1D9] focus:shadow-[0_0_15px_rgba(13,241,217,0.15)] transition-all normal-case placeholder-gray-600"
                        placeholder="e.g. you@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="font-rajdhani text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-[#121212]/80 border border-white/10 rounded-xl px-4 py-3 font-rajdhani text-sm text-white focus:outline-none focus:border-[#0DF1D9] focus:shadow-[0_0_15px_rgba(13,241,217,0.15)] transition-all normal-case placeholder-gray-600"
                      placeholder="e.g. Infrastructure Scoping"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="font-rajdhani text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-[#121212]/80 border border-white/10 rounded-xl px-4 py-3 font-rajdhani text-sm text-white focus:outline-none focus:border-[#0DF1D9] focus:shadow-[0_0_15px_rgba(13,241,217,0.15)] transition-all normal-case placeholder-gray-600 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      borderRadius: '9999px',
                      bgcolor: '#0DF1D9',
                      color: '#060E10',
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: '16px',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      py: 1.5,
                      boxShadow: '0 0 25px rgba(13,241,217,0.6)',
                      '&:hover': {
                        bgcolor: '#0CE0CB',
                        boxShadow: '0 0 25px rgba(13,241,217,0.6)',
                      },
                      '&:active': { transform: 'scale(0.98)' },
                    }}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Box>

      {/* FAQ Section */}
      <FAQSection />
    </main>
  );
}
