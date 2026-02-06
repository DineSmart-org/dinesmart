'use client';

import { useState, useEffect } from 'react';
// import { Navigation } from '../components/Navigation';
import { ChevronUp, Mail, Phone, Target, Compass, Users, MessageCircle } from 'lucide-react';
const cookiesImage = '/Cookies.png';

export default function About() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Screen Cookies */}
      <section id="hero" className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cookiesImage})` }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Transparent Navigation */}
        <div className="absolute top-0 left-0 right-0 z-50">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-2xl text-white hover:opacity-80 transition-opacity"
              >
                DineSmart
              </button>
              <div className="flex gap-8">
                <a href="/about" className="text-white hover:opacity-80 transition-opacity">
                  About
                </a>
                <a href="/faq" className="text-white hover:opacity-80 transition-opacity">
                  FAQ
                </a>
                <a href="/account" className="text-white hover:opacity-80 transition-opacity">
                  Account
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col items-center justify-center px-6">
          {/* Curved Tagline */}
          <div className="mb-16">
            <svg viewBox="0 0 600 200" className="w-full max-w-2xl h-32">
              <defs>
                <path
                  id="curve"
                  d="M 50,150 Q 300,50 550,150"
                  fill="transparent"
                />
              </defs>
              <text className="text-4xl md:text-5xl fill-white" style={{ fontWeight: '700', letterSpacing: '0.02em' }}>
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                  Dine Safe, Dine Smart
                </textPath>
              </text>
            </svg>
          </div>

          {/* Modern Minimalist Navigation Cards */}
          <div className="grid grid-cols-2 gap-6 max-w-md w-full mb-12">
            <button
              onClick={() => scrollToSection('mission')}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white text-xl">Mission</span>
            </button>

            <button
              onClick={() => scrollToSection('purpose')}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white text-xl">Purpose</span>
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white text-xl">About</span>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white text-xl">Contact</span>
            </button>
          </div>

          {/* Scroll indicator */}
           {/* Spacer - preserves layout without scroll indicator */}
           <div className="h-14" aria-hidden="true" />
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text Left */}
            <div>
              <h2 className="text-6xl mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-2xl text-gray-700 leading-relaxed mb-6 font-light">
                Empowering individuals with food allergies to dine out with confidence and peace of mind.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                We believe everyone deserves to enjoy eating out without fear or anxiety. Through our 
                platform, we're making dining accessible and safe for all.
              </p>
            </div>

            {/* Image Right */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1758721218560-aec50748d450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwcmVzdGF1cmFudCUyMGhlYWx0aHl8ZW58MXx8fHwxNzY5OTc2NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fresh healthy restaurant dish"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section - What We Do */}
      <section id="purpose" className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image Left */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1663530761401-15eefb544889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwY2hlZiUyMHByZXBhcmluZyUyMGZvb2R8ZW58MXx8fHwxNzY5OTc2NjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Chef preparing food with care"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
            </div>

            {/* Text Right */}
            <div>
              <h2 className="text-6xl mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                What We Do
              </h2>
              <p className="text-2xl text-gray-700 leading-relaxed mb-8 font-light">
                Connecting you with restaurants that understand and accommodate food allergies.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl mb-3 text-gray-900">Search by Allergens</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Filter restaurants based on specific allergens you need to avoid. Find safe dining 
                    options tailored to your dietary needs.
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl mb-3 text-gray-900">Search by Location</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Discover allergy-friendly restaurants near you with detailed allergen information 
                    and community ratings.
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl mb-3 text-gray-900">Verified Information</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Access reliable, up-to-date allergen data provided by restaurants and verified 
                    by our community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text Left */}
            <div>
              <h2 className="text-6xl mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                About Us
              </h2>
              <p className="text-2xl text-gray-700 leading-relaxed mb-6 font-light">
                Born from a simple yet powerful idea: dining out should be safe and enjoyable for 
                everyone.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6 font-light">
                We understand the challenges that come with food allergies because our team has lived 
                through them. From reading ingredient lists to asking detailed questions at restaurants, 
                we know the stress that can accompany a simple meal out.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                Founded in 2024, DineSmart emerged from personal experiences and the realization that 
                there had to be a better way. Today, we're building a community-driven platform that 
                makes dining out stress-free.
              </p>
            </div>

            {/* Image Right */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1768697358705-c1b60333da35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwc2VhdGluZyUyMGludGVyaW9yJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzAwMTExODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Restaurant seating interior"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl mb-3 text-center bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8 font-light">
            Have questions or feedback? We'd love to hear from you!
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-1 text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-1 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-1 text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-200"
                  placeholder="Tell us more..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-900 text-white p-3 rounded-xl shadow-lg hover:bg-gray-800 transition-all hover:scale-110 z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp className="size-6" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-4">
            {/* Brand & Tagline */}
            <div>
              <h3 className="text-xl mb-2">DineSmart</h3>
              <p className="text-gray-400 text-sm">
                Making dining safe and accessible for everyone with food allergies.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm mb-2">Quick Links</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('mission')} className="hover:text-white transition-colors">Mission</button></li>
                <li><button onClick={() => scrollToSection('purpose')} className="hover:text-white transition-colors">What We Do</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm mb-2">Contact</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="size-3" />
                  <a href="mailto:hello@dinesmart.com" className="hover:text-white transition-colors">
                    hello@dinesmart.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-3" />
                  <a href="tel:+15551234567" className="hover:text-white transition-colors">
                    (555) 123-4567
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-3 text-center text-gray-500 text-xs">
            <p>&copy; 2026 DineSmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}