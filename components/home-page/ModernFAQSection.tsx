'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface ModernFAQSectionProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
  tagline?: string;
}

const ModernFAQSection: React.FC<ModernFAQSectionProps> = ({
  faqs,
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our insurance services.",
  tagline = "Got Questions?"
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
    <section ref={ref} className="relative py-24 bg-white overflow-hidden">
      {/* Background effects */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(54, 79, 107, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 backdrop-blur-sm rounded-full mb-6 shadow-lg border border-[#d4af37]/30"
          >
            <HelpCircle size={16} className="text-brand" />
            <span className="text-sm font-semibold text-brand">{tagline}</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-brand">
            {title}
          </h2>
          <p className="text-xl text-brand/80 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 bg-white backdrop-blur-md rounded-2xl border border-brand/20 hover:border-[#d4af37]/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon */}
                    <motion.div
                      className="flex-shrink-0 p-2 bg-brand rounded-lg shadow-lg"
                      animate={{
                        rotate: openIndex === index ? 360 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Sparkles size={20} className="text-white" />
                    </motion.div>

                    {/* Question */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-semibold text-brand group-hover:text-[#d4af37] transition-colors pr-4">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  {/* Chevron */}
                  <motion.div
                    animate={{
                      rotate: openIndex === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ChevronDown size={24} className="text-brand" />
                  </motion.div>
                </div>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pl-14">
                        <p className="text-brand/80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-brand/60 mb-4">Still have questions?</p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Contact Us</span>
            <ChevronDown size={18} className="rotate-[-90deg]" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernFAQSection;
