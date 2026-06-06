'use client';

import { motion } from 'framer-motion';
import { Coffee, Award, Sparkles, Clock, Heart, Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

export default function AboutPage() {
  const stats = [
    { label: 'Artisan Blends', value: '12+', icon: Coffee },
    { label: 'Michelin Standards', value: '100%', icon: Award },
    { label: 'Premium Experience', value: '5-Star', icon: Sparkles },
  ];

  const highlights = [
    {
      title: 'Our Signature Beans',
      description: 'We source only the finest single-origin Gesha and Bourbon arabica beans directly from the high-altitude volcanic soils of Ethiopia and Panama.',
      icon: Coffee,
    },
    {
      title: 'Sartorial Roasting',
      description: 'Our beans are micro-roasted in-house weekly using a custom state-of-the-art drum roaster, capturing the ultimate complexity and velvety aroma.',
      icon: Clock,
    },
    {
      title: 'Culinary Masterpieces',
      description: 'From 24k gold leaf-infused pasta to fresh hand-rolled croissants, our dishes are crafted under the rigorous direction of Michelin-standard chefs.',
      icon: Award,
    },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[var(--cream)] overflow-hidden">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative pt-32 pb-24 px-6 text-center">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[180px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-4xl space-y-6 relative z-10"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] bg-[var(--primary)]/10 px-4 py-1.5 rounded-full">
            Our Legacy
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gradient leading-tight">
            A Symphony Of Craft <br /> & Fine Dining
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Welcome to Brew & Dine, where the rich, complex notes of micro-roasted artisan coffees meet the decadent world of luxury gastronomy.
          </p>
        </motion.div>
      </section>

      {/* Philosophy & Visual Asset */}
      <section className="py-16 px-6 container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--cream)] tracking-tight">
              Crafted in the Heart of Elegance
            </h2>
            <div className="w-20 h-1 bg-[var(--primary)] rounded-full"></div>
            <p className="text-gray-400 leading-relaxed text-base">
              Founded in 2018 with a radical vision, Brew & Dine was created for those who believe dining is an art form. We set out to disrupt the traditional cafe boundary by merging a world-class espresso bar with highly-refined, award-winning culinary plates.
            </p>
            <p className="text-gray-400 leading-relaxed text-base">
              Every detail of our space—from the customized solid brass accents and dark marble counters to the soothing amber ambiance—has been carefully curated to serve as a luxurious sanctuary for tastemakers and coffee connoisseurs alike.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 border-2 border-[var(--primary)]/30 rounded-2xl translate-x-4 translate-y-4 -z-10"></div>
            <img 
              src="/luxury_cafe.png" 
              alt="Brew & Dine Luxury Interior" 
              className="rounded-2xl shadow-2xl object-cover w-full h-[400px] border border-white/10 glow-bronze"
            />
          </motion.div>
        </div>
      </section>

      {/* Core Highlights */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#050505] px-6">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">The Golden Pillars</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              How we consistently maintain our status as the supreme culinary and coffee sanctuary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glassmorphism p-8 border border-white/5 premium-card flex flex-col items-start gap-4 hover-glow"
              >
                <div className="p-3 bg-[var(--primary)]/10 rounded-xl text-[var(--primary)]">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--cream)]">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter banner */}
      <section className="py-16 container mx-auto max-w-5xl px-6">
        <div className="glassmorphism border border-white/10 p-10 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-10 text-center relative overflow-hidden glow-bronze">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--accent)]/5 pointer-events-none"></div>
          {stats.map((stat, index) => (
            <div key={stat.label} className="space-y-2 relative z-10">
              <div className="flex justify-center text-[var(--primary)] mb-2">
                <stat.icon className="w-8 h-8" />
              </div>
              <h4 className="text-4xl md:text-5xl font-extrabold text-[var(--cream)] tracking-tight">
                {stat.value}
              </h4>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Pledge / Footer Accent */}
      <section className="py-20 text-center space-y-6 max-w-2xl mx-auto px-6">
        <Shield className="w-12 h-12 text-[var(--primary)] mx-auto" />
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--cream)]">Our Unwavering Pledge</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          We promise to never compromise on the quality of our beans, the precision of our roast, or the artistry of our chefs. Every single plate and cup served is a declaration of luxury.
        </p>
      </section>
    </div>
  );
}
