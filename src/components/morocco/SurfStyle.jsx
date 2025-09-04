import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SurfStyle = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/morocco/moro-1.jpg',
      alt: 'Surfers on beach'
    },
    {
      id: 2,
      image: '/morocco/moro-2.jpg',
      alt: 'Surf training'
    },
    {
      id: 3,
      image: '/morocco/moro-3.jpg',
      alt: 'Beach activities'
    },
    {
      id: 4,
      image: '/morocco/morocco4.jpg',
      alt: 'Surf lesson'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Motion.div 
      className="bg-white py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
        <Motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-400 mb-6">
            The Surfer SurfStyle Camp – Morocco
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed max-w-4xl mx-auto mb-8">
            Located in a peaceful area just a short walk from the beach, this camp blends traditional Moroccan 
            charm with surf, yoga, and comfort. Expect rooftop views, cultural meals, and a more grounded surf vibe.
          </p>
          <Motion.button
            className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 font-medium transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BOOK NOW
          </Motion.button>
        </Motion.div>

        <Motion.div 
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative overflow-hidden h-72 md:h-80">
            <div 
              className="flex transition-transform duration-700 ease-in-out h-full gap-4 bg-gray-50"
              style={{ transform: `translateX(-${currentSlide * 33.33}%)` }}
            >
              {slides.concat(slides).map((slide, index) => (
                <Motion.div
                  key={`${slide.id}-${index}`}
                  className="w-1/3 flex-shrink-0 relative group overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <img
                    src={`${slide.image}`}
                    alt={slide.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Motion.div>
              ))}
            </div>

            <Motion.button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10 border border-white/20 cursor-pointer"
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ChevronLeft size={20} />
            </Motion.button>

            <Motion.button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10 border border-white/20 cursor-pointer"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ChevronRight size={20} />
            </Motion.button>
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
};

export default SurfStyle;
