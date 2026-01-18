'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Users, TrendingUp, Award, ArrowRight, Sparkles, Heart, Target } from 'lucide-react';

interface CareersProps {
  locationPrefix?: string;
}

export default function ModernCareersSection({ locationPrefix }: CareersProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Continuous learning and advancement opportunities",
      iconBgClass: "bg-brand",
      overlayClass: "bg-brand",
      delay: 0.1
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible schedules and remote work options",
      iconBgClass: "bg-brand",
      overlayClass: "bg-brand",
      delay: 0.2
    },
    {
      icon: Award,
      title: "Competitive Pay",
      description: "Industry-leading compensation and bonuses",
      iconBgClass: "bg-brand",
      overlayClass: "bg-brand",
      delay: 0.3
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Collaborative and supportive work environment",
      iconBgClass: "bg-[#d4af37]",
      overlayClass: "bg-[#d4af37]",
      delay: 0.4
    }
  ];

  const positions = [
    {
      title: "Insurance Agent",
      type: "Full-time",
      location: "Multiple Locations",
      description: "Help clients find the perfect insurance coverage for their needs."
    },
    {
      title: "Customer Service Rep",
      type: "Full-time",
      location: "Remote Available",
      description: "Provide exceptional support to our valued clients."
    },
    {
      title: "Sales Manager",
      type: "Full-time",
      location: "On-site",
      description: "Lead and mentor our growing sales team to success."
    }
  ];

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-white">
      {/* Animated Background */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(54, 79, 107, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand rounded-full mb-6 shadow-lg"
          >
            <Briefcase size={16} className="text-white" />
            <span className="text-sm font-semibold text-white">Join Our Team</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-brand">
            Build Your Career With Us
          </h2>
          <p className="text-xl text-brand/80 leading-relaxed">
            Join a team that values growth, innovation, and making a real difference in people's lives.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: benefit.delay }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="relative h-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-brand/15 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 ${benefit.overlayClass} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div 
                  className={`inline-flex p-4 mb-4 ${benefit.iconBgClass} rounded-xl shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <benefit.icon size={24} className="text-white" />
                </motion.div>

                <h3 className="text-lg font-bold mb-2 text-brand group-hover:text-brand/90 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-brand/70 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-brand/15"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20 rounded-3xl overflow-hidden">
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(54, 79, 107, 0.2) 0%, transparent 50%)',
                backgroundSize: '200% 200%',
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-brand mb-2">Open Positions</h3>
                <p className="text-brand/70">Find your perfect role and join our growing team</p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="hidden md:block"
              >
                <Sparkles size={40} className="text-brand" />
              </motion.div>
            </div>

            <div className="space-y-4 mb-8">
              {positions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="p-6 bg-white backdrop-blur-sm rounded-2xl border border-brand/20 hover:border-brand/20 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-brand mb-2 group-hover:text-[#d4af37] transition-colors">
                        {position.title}
                      </h4>
                      <p className="text-brand/70 mb-3">{position.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-white text-brand text-sm rounded-full border border-brand/30">
                          {position.type}
                        </span>
                        <span className="px-3 py-1 bg-[#d4af37]/15 text-brand text-sm rounded-full border border-[#d4af37]/30">
                          {position.location}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <button className="flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all shadow-lg hover:shadow-xl">
                        <span>Apply Now</span>
                        <ArrowRight size={18} />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-center"
            >
              <Link href={`${locationPrefix || ''}/apply`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-brand font-bold rounded-xl hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl"
                >
                  <Target size={20} />
                  <span>View All Opportunities</span>
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
