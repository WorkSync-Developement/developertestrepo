'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Award, Users, TrendingUp, CheckCircle2, Star } from 'lucide-react';

interface IntroSectionProps {
  title?: string;
  tagline?: string;
  description?: string;
  imageUrl?: string;
}

const ModernIntroSection: React.FC<IntroSectionProps> = ({
  title = "Why Choose Us",
  tagline = "Excellence in Insurance",
  description = "We're committed to providing exceptional service and comprehensive coverage that protects what matters most to you.",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Shield,
      title: "Comprehensive Protection",
      description: "Full coverage across auto, home, life, and business insurance.",
      iconBgClass: "bg-brand",
      overlayClass: "bg-brand"
    },
    {
      icon: Award,
      title: "Award-Winning Service",
      description: "Recognized for excellence in customer satisfaction.",
      iconBgClass: "bg-[#d4af37]",
      overlayClass: "bg-[#d4af37]"
    },
    {
      icon: Users,
      title: "Personalized Approach",
      description: "Tailored solutions that fit your unique needs and budget.",
      iconBgClass: "bg-brand",
      overlayClass: "bg-brand"
    },
    {
      icon: TrendingUp,
      title: "Competitive Rates",
      description: "Best value coverage without compromising on quality.",
      iconBgClass: "bg-[#d4af37]",
      overlayClass: "bg-[#d4af37]"
    }
  ];

  const benefits = [
    "24/7 Claims Support",
    "Fast Quote Processing",
    "Multiple Carrier Options",
    "No Hidden Fees",
    "Easy Policy Management",
    "Local Expert Guidance"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden" id="services">
      {/* Light background with animated blue/golden accents */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(54, 79, 107, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d4af37]/15 backdrop-blur-sm rounded-full mb-6 shadow-lg border border-[#d4af37]/30"
          >
            <Star size={16} className="text-[#d4af37]" />
            <span className="text-sm font-semibold text-brand">{tagline}</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-brand">
            {title}
          </h2>
          <p className="text-xl text-brand/80 leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <div className="h-full p-8 bg-white backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl hover:shadow-[#d4af37]/20 transition-all duration-500 border border-[#d4af37]/20 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 ${feature.overlayClass} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                
                {/* Icon */}
                <motion.div 
                  className={`inline-flex p-4 mb-6 ${feature.iconBgClass} rounded-xl shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon size={28} className="text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-brand group-hover:text-[#d4af37] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-brand/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative bg-white rounded-3xl p-12 shadow-xl overflow-hidden border border-brand/15"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(54,79,107,0.25),transparent_50%)]" />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-brand mb-6">
                What Sets Us Apart
              </h3>
              <p className="text-brand/80 text-lg mb-8 leading-relaxed">
                Experience the difference of working with a dedicated insurance partner who puts your needs first.
              </p>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid sm:grid-cols-2 gap-4"
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#d4af37]/10 transition-all"
                  >
                    <CheckCircle2 size={20} className="text-[#d4af37] mt-0.5 flex-shrink-0" />
                    <span className="text-brand font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "5,000+", label: "Happy Clients" },
                { value: "25+", label: "Years Experience" },
                { value: "98%", label: "Satisfaction Rate" },
                { value: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="bg-brand/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#d4af37]/20"
                >
                  <motion.div 
                    className="text-4xl font-bold bg-gradient-to-r from-white to-[#d4af37] bg-clip-text text-transparent mb-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-white/80 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernIntroSection;
