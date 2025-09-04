import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDestinationHovered, setIsDestinationHovered] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('srilanka');
  const [isMobileDestinationOpen, setIsMobileDestinationOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const countries = [
    { id: 'srilanka', name: t('nav.countries.srilanka'), image: '/image.png', link: '/srilanka' },
    { id: 'morocco',  name: t('nav.countries.morocco'),  image: '/morocco.jpg', link: '/morocco' }
  ];

  const surfCamps = {
    srilanka: {
      originals: [
        { name: 'The Surfer Beach Camp', link: '/beach-camp' },
        { name: 'The Surfer TS2 Camp',   link: '/ts2-camp' }
      ],
      partner: [{ name: 'Coming Soon: The Wave Surf Camp', link: '#' }]
    },
    morocco: {
      originals: [],
      partner: [{ name: 'The Surfer SurfStyle', link: '/style-camp' }]
    }
  };

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDestinationHovered(false);
    setIsMobileDestinationOpen(false);
  }, [location.pathname]);

  // Close mega menu on ESC
  const onKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsDestinationHovered(false);
      setIsMenuOpen(false);
      setIsMobileDestinationOpen(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const linkClasses = (active) =>
    `cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 ${
      active
        ? 'text-cyan-500 font-bold underline underline-offset-4'
        : isScrolled
          ? 'text-gray-800 hover:text-cyan-600 hover:drop-shadow-[0_4px_8px_rgba(8,145,178,0.4)]'
          : 'text-white hover:text-cyan-300 hover:drop-shadow-[0_4px_8px_rgba(34,211,238,0.4)]'
    }`;

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label={t('nav.aria.main')}
    >
      <div className="container mx-auto flex justify-between items-center py-3 sm:py-4 px-3 sm:px-6 md:px-8 lg:px-16">
        <a href="/" aria-label={t('nav.aria.home')}>
          <img
            src="logo.png"
            alt="The Surfer Logo"
            className={`h-8 sm:h-10 md:h-12 w-auto transition-all duration-300 brightness-100`}
          />
        </a>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-4 lg:gap-7 text-sm lg:text-base relative items-center">
          <a href="/" className={linkClasses(location.pathname === '/')}>{t('nav.home')}</a>

          {/* DESTINATION (mega menu) */}
          <div
            className="relative"
            onMouseEnter={() => setIsDestinationHovered(true)}
            onMouseLeave={() => setIsDestinationHovered(false)}
          >
            <button
              type="button"
              className={linkClasses(false)}
              aria-haspopup="true"
              aria-expanded={isDestinationHovered}
              aria-controls="destination-mega"
              onClick={() => setIsDestinationHovered((v) => !v)}
            >
              {t('nav.destination')}
            </button>

            {isDestinationHovered && (
              <div
                id="destination-mega"
                className={`fixed left-0 right-0 shadow-2xl border z-50 transition-all duration-300 w-screen ${
                  isScrolled ? 'bg-white/95 backdrop-blur-xl border-gray-200' : 'bg-white/10 backdrop-blur-xl border-white/20'
                }`}
                style={{ top: isScrolled ? '80px' : '76px' }}
                role="menu"
                aria-label={t('nav.aria.destinationMenu')}
              >
                <div className="flex h-96">
                  {/* Countries list */}
                  <div className="w-1/3 p-6 border-r border-gray-200/20">
                    <h3 className={`text-lg font-semibold mb-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                      {t('nav.sections.countries')}
                    </h3>

                    <div className="space-y-2">
                      {countries.map((country) => (
                        <div
                          key={country.id}
                          className={`group cursor-pointer rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                            selectedCountry === country.id
                              ? isScrolled
                                ? 'bg-cyan-50 border border-cyan-200'
                                : 'bg-white/20 border border-white/30'
                              : isScrolled
                                ? 'hover:bg-gray-50'
                                : 'hover:bg-white/10'
                          }`}
                          onMouseEnter={() => setSelectedCountry(country.id)}
                        >
                          <a href={country.link} className="text-sm font-medium transition-colors hover:text-cyan-500">
                            <div className="flex items-center p-3 gap-3">
                              <img src={country.image} alt={country.name} className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1 flex items-center justify-between">
                                <h4
                                  className={`text-sm font-medium transition-colors ${
                                    selectedCountry === country.id
                                      ? isScrolled ? 'text-cyan-700' : 'text-cyan-300'
                                      : isScrolled
                                        ? 'text-gray-800 group-hover:text-cyan-600'
                                        : 'text-white group-hover:text-cyan-300'
                                  }`}
                                >
                                  {country.name}
                                </h4>
                                <span
                                  className={`text-lg transition-colors ${
                                    selectedCountry === country.id
                                      ? isScrolled ? 'text-cyan-600' : 'text-cyan-300'
                                      : isScrolled
                                        ? 'text-gray-400 group-hover:text-cyan-600'
                                        : 'text-white/60 group-hover:text-cyan-300'
                                  }`}
                                  aria-hidden="true"
                                >
                                  →
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right panel */}
                  <div className="w-2/3 relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                      style={{ backgroundImage: "url('/I9.JPG')" }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10 p-6">
                      {surfCamps[selectedCountry]?.originals.length > 0 && (
                        <>
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-black">★</span>
                              </div>
                              <h4 className={`text-sm font-semibold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                                {t('nav.sections.originals')}
                              </h4>
                            </div>
                          </div>

                          <div className="space-y-3 mb-6">
                            {surfCamps[selectedCountry].originals.map((camp, i) => (
                              <p
                                key={i}
                                className={`text-sm cursor-pointer transition-colors hover:text-cyan-500 ${
                                  isScrolled ? 'text-gray-600' : 'text-white/80'
                                }`}
                              >
                                <a href={camp.link}>{camp.name}</a>
                              </p>
                            ))}
                          </div>
                        </>
                      )}

                      <div
                        className={`${surfCamps[selectedCountry]?.originals.length > 0 ? 'border-t pt-4' : ''} ${
                          isScrolled ? 'border-gray-200' : 'border-white/20'
                        }`}
                      >
                        <h4 className={`text-sm font-semibold mb-3 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                          {t('nav.sections.partner')}
                        </h4>
                        <div className="space-y-2">
                          {surfCamps[selectedCountry]?.partner.map((camp, i) => (
                            <p
                              key={i}
                              className={`text-sm cursor-pointer transition-colors hover:text-cyan-500 ${
                                isScrolled ? 'text-gray-600' : 'text-white/80'
                              }`}
                            >
                              <a href={camp.link}>{camp.name}</a>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="/activities" className={linkClasses(location.pathname === '/activities')}>
            {t('nav.activities')}
          </a>
          <a href="/rates" className={linkClasses(location.pathname === '/rates')}>
            {t('nav.rates')}
          </a>
          <a href="/faq" className={linkClasses(location.pathname === '/faq')}>
            {t('nav.faq')}
          </a>
          <a href="/blogs" className={linkClasses(location.pathname === '/blogs')}>
            {t('nav.blogs')}
          </a>
          <a href="/contact" className={linkClasses(location.pathname === '/contact')}>
            {t('nav.contact')}
          </a>
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden text-2xl transition-all duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'} ${
            isScrolled ? 'text-gray-800 hover:text-cyan-600' : 'text-white hover:text-cyan-300'
          }`}
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={t('nav.aria.toggleMenu')}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          ☰
        </button>

        {/* Desktop CTA */}
        <a
          href="https://main.d7z80586kqd0r.amplifyapp.com/"
          target="_blank"
          rel="noreferrer"
          className={`hidden md:block px-4 lg:px-8 py-2 text-sm lg:text-base rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${
            isScrolled ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                       : 'border-white text-white hover:bg-white hover:text-gray-800'
          }`}
        >
          {t('nav.bookNow')}
        </a>

        {/* Language switcher */}
        <div className="hidden md:block">
          <label htmlFor="lang" className="sr-only">{t('nav.aria.language')}</label>
          <select id="lang" onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
            <option value="en">English (en)</option>
            <option value="de">Deutsch (de)</option>
          </select>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className={`w-72 mx-auto rounded-3xl mt-0 transform transition-all duration-500 ease-in-out ${
            isScrolled ? 'bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl'
                       : 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl'
          }`}
        >
          <div className="px-4 py-8 max-h-[75vh] overflow-y-auto">
            <ul className="flex flex-col gap-4 text-center">
              <a href="/" className={`${linkClasses(location.pathname === '/')} py-3 px-4 rounded-xl`} onClick={() => setIsMenuOpen(false)}>
                {t('nav.home')}
              </a>

              <div className="w-full">
                <button
                  className={`w-full py-3 px-4 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 rounded-xl text-sm font-medium ${
                    isScrolled ? 'text-gray-800 hover:text-cyan-600 hover:bg-gray-100'
                               : 'text-white hover:text-cyan-300 hover:bg-white/20'
                  }`}
                  onClick={() => setIsMobileDestinationOpen((v) => !v)}
                  aria-expanded={isMobileDestinationOpen}
                  aria-controls="mobile-destination"
                  type="button"
                >
                  {t('nav.destination')}
                </button>

                {isMobileDestinationOpen && (
                  <div id="mobile-destination" className="ml-4 mt-2 space-y-2">
                    {countries.map((country) => (
                      <div key={country.id}>
                        <a
                          href={country.link}
                          className={`block px-3 py-2 text-sm rounded-lg transition-all ${
                            isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                          } hover:text-blue-500`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {country.name}
                        </a>

                        {surfCamps[country.id]?.originals.map((camp, idx) => (
                          <a
                            key={`o-${idx}`}
                            href={camp.link}
                            className={`block ml-4 px-3 py-1 text-xs rounded-lg transition-all ${
                              isScrolled ? 'text-gray-500 hover:bg-gray-100' : 'text-white/70 hover:bg-white/10'
                            } hover:text-blue-500`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            - {camp.name}
                          </a>
                        ))}

                        {surfCamps[country.id]?.partner.map((camp, idx) => (
                          <a
                            key={`p-${idx}`}
                            href={camp.link}
                            className={`block ml-4 px-3 py-1 text-xs rounded-lg transition-all ${
                              isScrolled ? 'text-gray-500 hover:bg-gray-100' : 'text-white/70 hover:bg-white/10'
                            } hover:text-blue-500`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            - {camp.name}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <a href="/activities" className={`${linkClasses(location.pathname === '/activities')} py-3 px-4 rounded-xl`} onClick={() => setIsMenuOpen(false)}>
                {t('nav.activities')}
              </a>
              <a href="/rates" className={`${linkClasses(location.pathname === '/rates')} py-3 px-4 rounded-xl`} onClick={() => setIsMenuOpen(false)}>
                {t('nav.rates')}
              </a>
              <a href="/faq" className={`${linkClasses(location.pathname === '/faq')} py-3 px-4 rounded-xl`} onClick={() => setIsMenuOpen(false)}>
                {t('nav.faq')}
              </a>
              <a href="/blogs" className={`${linkClasses(location.pathname === '/blogs')} py-3 px-4 rounded-xl`} onClick={() => setIsMenuOpen(false)}>
                {t('nav.blogs')}
              </a>
              <a href="/contact" className={`${linkClasses(location.pathname === '/contact')} py-3 px-4 rounded-xl`} onClick={() => setIsMenuOpen(false)}>
                {t('nav.contact')}
              </a>

              <a
                href="https://main.d7z80586kqd0r.amplifyapp.com/"
                target="_blank"
                rel="noreferrer"
                className={`mt-2 mx-auto w-full max-w-xs px-4 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-lg transform text-xs sm:text-sm font-semibold text-center block ${
                  isScrolled ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                             : 'border-white/50 text-white hover:bg-white hover:text-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.bookNow')}
              </a>
            </ul>
          </div>
        </div>
      </div>

      {!isMenuOpen && !isScrolled && !isDestinationHovered && (
        <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16">
          <div className="w-full h-0.5 bg-white/80" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
