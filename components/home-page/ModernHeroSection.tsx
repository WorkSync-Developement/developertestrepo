'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, Award, Users, Sparkles, TrendingUp } from 'lucide-react';
import Lottie from 'lottie-react';
import HeroCTAButton from './HeroCTAButton';

interface HeroContentBlock {
  tag?: string;
  type?: string;
  content: string;
  color?: string;
}

interface HeroImageBlock {
  url: string;
  type?: string;
  alt?: string;
}

interface HeroVideoBlock {
  url: string | null;
  type?: string;
}

interface HeroOverlay {
  color: string | null;
  opacity: number;
}

interface HeroSectionProps {
  heroContent?: {
    title?: HeroContentBlock;
    subtitle?: HeroContentBlock;
    description?: HeroContentBlock;
    background_image?: HeroImageBlock;
    background_video?: HeroVideoBlock;
    background_media_type?: 'image' | 'video';
    overlay?: HeroOverlay;
  };
  isMultiLocation?: boolean;
  locations?: any[];
}

type CardKey = 'front' | 'middle' | 'back';

const ModernHeroSection: React.FC<HeroSectionProps> = ({ 
  heroContent,
  isMultiLocation = false,
  locations = []
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardOrder, setCardOrder] = useState<CardKey[]>(['front', 'middle', 'back']);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Lottie animation data - insurance/protection themed
  const insuranceAnimation = {
    "v": "5.7.4",
    "fr": 60,
    "ip": 0,
    "op": 180,
    "w": 500,
    "h": 500,
    "nm": "Shield Protection",
    "ddd": 0,
    "assets": [],
    "layers": []
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const renderWithLineBreaks = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const title = heroContent?.title?.content || 'Your Trusted Local Insurance Partner';
  const description = heroContent?.description?.content || heroContent?.subtitle?.content || 
    'Expert guidance and dependable coverage tailored to your needs. Protecting what matters most.';

  const hasBackgroundMedia = (heroContent?.background_media_type === 'video' && heroContent?.background_video?.url) || 
                             (heroContent?.background_image?.url);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const cardData: Record<CardKey, {
    title: string;
    bullets: string[];
    icon: typeof Shield;
    className: string;
  }> = {
    front: {
      title: 'Comprehensive Coverage',
      bullets: ['Local Expertise', 'Best-in-Class Service', 'Easy Policy Management'],
      icon: Shield,
      className: 'bg-brand',
    },
    middle: {
      title: 'Licensed & Insured',
      bullets: ['Experienced Advisors', 'Fast Claims Support', 'Transparent Guidance'],
      icon: Award,
      className: 'bg-[#d4af37]',
    },
    back: {
      title: 'Trusted Partner',
      bullets: ['Personalized Policies', 'Multi-Carrier Options', 'Proven Results'],
      icon: Users,
      className: 'bg-brand',
    },
  };

  const slotVariants = {
    front: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 3 },
    middle: { x: -60, y: 16, rotate: -8, scale: 0.85, opacity: 0.5, zIndex: 2 },
    back: { x: 120, y: 16, rotate: 8, scale: 0.85, opacity: 0.5, zIndex: 1 },
  } as const;

  const bringToFront = (cardKey: CardKey) => {
    setCardOrder((prev) => [cardKey, ...prev.filter((key) => key !== cardKey)]);
  };


  return (
    <section 
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      aria-label="Agency introduction and welcome"
      role="banner"
    >
      {/* White Background with Subtle Accents */}
      <div className="absolute inset-0 bg-white">
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-white" />
        
        {/* Animated golden shimmer */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
          }}
        />
        
        {/* Subtle mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              radial-gradient(at 20% 30%, rgba(54, 79, 107, 0.12) 0px, transparent 50%),
              radial-gradient(at 80% 70%, rgba(54, 79, 107, 0.08) 0px, transparent 50%),
              radial-gradient(at 40% 80%, rgba(212, 175, 55, 0.12) 0px, transparent 50%)
            `,
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      {/* Background media - Image or Video */}
      {heroContent?.background_media_type === 'video' && heroContent?.background_video?.url ? (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src={heroContent.background_video.url} type="video/mp4" />
          </video>
        </div>
      ) : heroContent?.background_image?.url ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroContent.background_image.url}
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover opacity-30"
            alt={heroContent?.background_image?.alt || "Hero background image"}
          />
        </div>
      ) : null}

      {/* Configurable overlay */}
      {(heroContent?.overlay?.opacity ?? 0) > 0 && (
        <div 
          className="absolute inset-0 z-[2]"
          style={{
            backgroundColor: heroContent?.overlay?.color || '#000000',
            opacity: (heroContent?.overlay?.opacity ?? 0) / 100
          }}
        />
      )}

      {/* Floating Decorative Elements - Enhanced with parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 right-10 w-96 h-96 bg-brand/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl"
      />
      
      {/* Floating shapes with golden accents */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-16 h-16 border-4 border-[#d4af37]/30 rounded-lg"
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/3 right-1/3 w-12 h-12 border-4 border-brand/20 rounded-full"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-24 items-center"
        >
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d4af37]/15 backdrop-blur-sm rounded-full shadow-lg border border-[#d4af37]/30">
              <Sparkles size={16} className="text-[#d4af37]" />
              <span className="text-sm font-semibold text-brand">
                Trusted Insurance Partner
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-brand"
            >
              {renderWithLineBreaks(title)}
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-brand/80 leading-relaxed max-w-2xl"
            >
              {renderWithLineBreaks(description)}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <HeroCTAButton 
                isMultiLocation={isMultiLocation} 
                locations={locations} 
              />
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-brand/90 transition-all duration-300 group"
              >
                <span>Learn More</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { icon: Shield, label: 'Licensed & Insured', iconBgClass: 'bg-brand' },
                { icon: Award, label: '25+ Years Experience', iconBgClass: 'bg-[#d4af37]' },
                { icon: Users, label: 'Local Expertise', iconBgClass: 'bg-brand' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.08, y: -8, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center text-center p-5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#d4af37]/30"
                >
                  <motion.div 
                    className={`p-3 ${item.iconBgClass} rounded-xl mb-3 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon size={22} className="text-white" />
                  </motion.div>
                  <span className="text-xs font-semibold text-brand">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Visual Element */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block lg:translate-x-64"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Decorative Card Stack */}
              <div className="relative w-full h-[600px]">
                {cardOrder.map((cardKey) => {
                  const card = cardData[cardKey];
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={cardKey}
                      onClick={() => bringToFront(cardKey)}
                      initial={false}
                      animate={slotVariants[cardOrder.indexOf(cardKey) === 0 ? 'front' : cardOrder.indexOf(cardKey) === 1 ? 'middle' : 'back']}
                      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                      className={`absolute w-80 h-96 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/30 overflow-hidden cursor-pointer ${card.className}`}
                      style={{ transform: 'perspective(1000px) rotateY(6deg)' }}
                    >
                      <div className="h-full p-8 flex flex-col justify-between">
                        <div>
                          <div className="w-12 h-12 bg-white/20 rounded-xl mb-4 flex items-center justify-center">
                            <Icon size={24} className="text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">
                            {card.title}
                          </h3>
                          <ul className="space-y-2 text-white/90 text-xs leading-relaxed">
                            {card.bullets.map((item) => (
                              <li key={item} className="flex items-center gap-2 text-sm">
                                <span className="w-2 h-2 bg-white rounded-full" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {['Auto', 'Home', 'Life', 'Business'].map((type) => (
                            <div key={type} className="flex items-center gap-2 text-white/90">
                              <div className="w-2 h-2 bg-white rounded-full" />
                              <span className="text-xs font-medium">{type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-2xl p-6 border border-brand/15"
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-brand via-[#d4af37] to-brand bg-clip-text text-transparent mb-1">
                      5,000+
                    </div>
                    <div className="text-sm text-brand/80 font-semibold">
                      Happy Clients
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-brand/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-brand/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ModernHeroSection;
