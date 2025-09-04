import { link } from 'framer-motion/client'
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDestinationHovered, setIsDestinationHovered] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('srilanka')
  const [isMobileDestinationOpen, setIsMobileDestinationOpen] = useState(false)
  const [pressedPath, setPressedPath] = useState(null) // instant feedback
  const { t, i18n } = useTranslation();

  const countries = [
    { id: 'srilanka', name: t('navbar.countries.srilanka', 'Surf Camps Sri Lanka'), image: '/image.png', link: '/srilanka' },
    { id: 'morocco',  name: t('navbar.countries.morocco',  'Surf Camps Morocco'),    image: '/morocco.jpg', link: '/morocco' }
  ]

  const surfCamps = {
    srilanka: {
      originals: [
        { name: t('navbar.camps.beachCamp', 'The Surfer Beach Camp'), link: '/beach-camp' },
        { name: t('navbar.camps.ts2Camp',  'The Surfer TS2 Camp'),    link: '/ts2-camp' },
      ],
      partner: [{ name: t('navbar.camps.waveCampComing', 'Coming Soon: The Wave Surf Camp'), link: '#' }],
    },
    morocco: {
      originals: [],
      partner: [{ name: t('navbar.camps.styleCamp', 'The Surfer SurfStyle'), link: '/style-camp' }]
    }
  }

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Shared helpers
  const linkBase = (isActive) =>
    isActive
      ? 'text-cyan-500 font-bold underline underline-offset-4'
      : isScrolled
        ? 'text-gray-800 hover:text-cyan-600'
        : 'text-white hover:text-cyan-300'

  const mobileItemBase = (isActive, path) => {
    const pressed = pressedPath === path
    const activeClasses = isActive ? 'text-cyan-600' : ''
    const pressedBg = pressed ? (isScrolled ? 'bg-gray-100' : 'bg-white/20') : ''
    return `${isScrolled ? 'text-gray-800 hover:text-cyan-600' : 'text-white hover:text-cyan-300'} ${activeClasses} ${pressedBg}`
  }

  const pressStart = (path) => () => setPressedPath(path)
  const pressEnd = () => setPressedPath(null)

  // Level-Up Hamburger (animated)
  const HamburgerButton = () => (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle menu"
      aria-expanded={isMenuOpen}
      className={`
        md:hidden relative h-10 w-10 rounded-xl
        flex items-center justify-center
        transition-colors duration-200
        ${isScrolled ? 'text-gray-800 hover:text-cyan-600' : 'text-white hover:text-cyan-300'}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70
        active:scale-95
      `}
    >
      {/* lines */}
      <span
        className={`
          absolute block h-[2px] w-6 rounded-full
          ${isScrolled ? 'bg-gray-800' : 'bg-white'}
          transition-transform duration-300 ease-out
          motion-reduce:transition-none
          ${isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-2 rotate-0'}
        `}
      />
      <span
        className={`
          absolute block h-[2px] w-6 rounded-full
          ${isScrolled ? 'bg-gray-800' : 'bg-white'}
          transition-opacity duration-200 ease-out
          motion-reduce:transition-none
          ${isMenuOpen ? 'opacity-0' : 'opacity-100'}
        `}
      />
      <span
        className={`
          absolute block h-[2px] w-6 rounded-full
          ${isScrolled ? 'bg-gray-800' : 'bg-white'}
          transition-transform duration-300 ease-out
          motion-reduce:transition-none
          ${isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2 rotate-0'}
        `}
      />
    </button>
  );

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20' : 'bg-transparent'}`}>
      {/* container is relative so we can absolute-center the middle nav */}
      <div className='container mx-auto flex justify-between items-center py-3 sm:py-4 px-3 sm:px-6 md:px-8 lg:px-16 relative'>
        {/* Left: Logo */}
        <NavLink to='/' aria-label="Home">
          <img src="logo.png" alt="The Surfer Logo" className='h-8 sm:h-10 md:h-12 w-auto transition-all duration-300' />
        </NavLink>

        {/* Center: Main nav links */}
        <ul className='hidden md:flex gap-4 lg:gap-7 text-sm lg:text-base absolute left-1/2 -translate-x-1/2'>
          <NavLink to="/" className={({ isActive }) => `cursor-pointer transition-all duration-300 hover:-translate-y-1 ${linkBase(isActive)}`}>
            {t('navbar.home', 'HOME')}
          </NavLink>

          {/* DESTINATION trigger (mega menu) */}
          <div className="relative cursor-pointer" onClick={() => setIsDestinationHovered(!isDestinationHovered)}>
            <p className={`transition-all duration-300 hover:-translate-y-1 ${isScrolled ? 'text-gray-800 hover:text-cyan-600' : 'text-white hover:text-cyan-300'}`}>
              {t('navbar.destination', 'DESTINATION')}
            </p>

            {isDestinationHovered && (
              <div
                className={`fixed left-0 right-0 shadow-2xl border z-50 transition-all duration-300 w-screen ${isScrolled ? 'bg-white/95 backdrop-blur-xl border-gray-200' : 'bg-white/10 backdrop-blur-xl border-white/20'}`}
                style={{ top: isScrolled ? '80px' : '76px' }}
                onMouseEnter={() => setIsDestinationHovered(true)}
                onMouseLeave={() => setIsDestinationHovered(false)}
              >
                <div className="flex h-96">
                  {/* Countries (desktop) */}
                  <div className="w-1/3 p-6 border-r border-gray-200/20">
                    <h3 className={`text-lg font-semibold mb-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>{t('navbar.countriesTitle', 'COUNTRIES')}</h3>
                    <div className="space-y-2">
                      {countries.map((country) => (
                        <NavLink
                          key={country.id}
                          to={country.link}
                          onMouseDown={pressStart(country.link)}
                          onMouseUp={pressEnd}
                          onMouseLeave={pressEnd}
                          onTouchStart={pressStart(country.link)}
                          onTouchEnd={pressEnd}
                          onClick={() => setIsDestinationHovered(false)}
                          className={({ isActive }) => {
                            const pressed = pressedPath === country.link
                            const frame = isActive
                              ? (isScrolled ? 'bg-cyan-50 border border-cyan-300' : 'bg-white/20 border border-cyan-300/60')
                              : (isScrolled ? 'hover:bg-gray-50 border border-transparent' : 'hover:bg-white/10 border border-transparent')
                            const pressBg = pressed ? (isScrolled ? 'bg-gray-100' : 'bg-white/20') : ''
                            return `group block rounded-xl transition-all duration-200 ${frame} ${pressBg}`
                          }}
                        >
                          <div className="flex items-center p-3 gap-3">
                            <img src={country.image} alt={country.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1 flex items-center justify-between">
                              <span className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-800 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-300'}`}>
                                {country.name}
                              </span>
                              <span className={`${isScrolled ? 'text-gray-400 group-hover:text-cyan-600' : 'text-white/60 group-hover:text-cyan-300'}`}>→</span>
                            </div>
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  </div>

                  {/* Camps (desktop) */}
                  <div className="w-2/3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: "url('/I9.JPG')" }} />
                    <div className="relative z-10 p-6">
                      {surfCamps[selectedCountry]?.originals.length > 0 && (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className={`text-sm font-semibold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>{t('navbar.originalsTitle', 'THE SURFER ORIGINAL CAMPS')}</h4>
                          </div>
                          <div className="space-y-2 mb-4">
                            {surfCamps[selectedCountry]?.originals.map((camp, i) => (
                              <NavLink
                                key={i}
                                to={camp.link}
                                onMouseDown={pressStart(camp.link)}
                                onMouseUp={pressEnd}
                                onMouseLeave={pressEnd}
                                onTouchStart={pressStart(camp.link)}
                                onTouchEnd={pressEnd}
                                onClick={() => setIsDestinationHovered(false)}
                                className={({ isActive }) => {
                                  const pressed = pressedPath === camp.link
                                  const activeText = isActive ? (isScrolled ? 'text-cyan-700' : 'text-cyan-300') : (isScrolled ? 'text-gray-600' : 'text-white/80')
                                  const pressBg = pressed ? (isScrolled ? 'bg-gray-100' : 'bg-white/10') : ''
                                  return `block text-sm cursor-pointer transition-colors rounded-md px-1 py-0.5 ${activeText} hover:text-cyan-500 ${pressBg}`
                                }}
                              >
                                {camp.name}
                              </NavLink>
                            ))}
                          </div>
                        </>
                      )}

                      <div className={`${surfCamps[selectedCountry]?.originals.length > 0 ? 'border-t pt-4' : ''} ${isScrolled ? 'border-gray-200' : 'border-white/20'}`}>
                        <h4 className={`text-sm font-semibold mb-3 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>{t('navbar.partnersTitle', 'THE SURFER PARTNERED CAMP')}</h4>
                        <div className="space-y-2">
                          {surfCamps[selectedCountry]?.partner.map((camp, i) => (
                            <NavLink
                              key={i}
                              to={camp.link}
                              onMouseDown={pressStart(camp.link)}
                              onMouseUp={pressEnd}
                              onMouseLeave={pressEnd}
                              onTouchStart={pressStart(camp.link)}
                              onTouchEnd={pressEnd}
                              onClick={() => setIsDestinationHovered(false)}
                              className={({ isActive }) => {
                                const pressed = pressedPath === camp.link
                                const activeText = isActive ? (isScrolled ? 'text-cyan-700' : 'text-cyan-300') : (isScrolled ? 'text-gray-600' : 'text-white/80')
                                const pressBg = pressed ? (isScrolled ? 'bg-gray-100' : 'bg-white/10') : ''
                                return `block text-sm cursor-pointer transition-colors rounded-md px-1 py-0.5 ${activeText} hover:text-cyan-500 ${pressBg}`
                              }}
                            >
                              {camp.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/activities" className={({ isActive }) => `cursor-pointer transition-all duration-300 hover:-translate-y-1 ${linkBase(isActive)}`}>{t('navbar.activities', 'ACTIVITIES')}</NavLink>
          <NavLink to="/rates"      className={({ isActive }) => `cursor-pointer transition-all duration-300 hover:-translate-y-1 ${linkBase(isActive)}`}>{t('navbar.rates', 'RATES')}</NavLink>
          <NavLink to="/faq"        className={({ isActive }) => `cursor-pointer transition-all duration-300 hover:-translate-y-1 ${linkBase(isActive)}`}>{t('navbar.faq', 'FAQ')}</NavLink>
          <NavLink to="/blogs"      className={({ isActive }) => `cursor-pointer transition-all duration-300 hover:-translate-y-1 ${linkBase(isActive)}`}>{t('navbar.blogs', 'BLOGS')}</NavLink>
          <NavLink to="/contact"    className={({ isActive }) => `cursor-pointer transition-all duration-300 hover:-translate-y-1 ${linkBase(isActive)}`}>{t('navbar.contact', 'CONTACT')}</NavLink>
        </ul>

        {/* Right: Language + Book Now (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className={`w-28 h-9 px-2 bg-transparent appearance-none outline-none border-0 rounded-none cursor-pointer transition-colors
              ${isScrolled ? 'text-gray-800 hover:text-cyan-600' : 'text-white hover:text-cyan-300'}
              [&>option]:text-black [&>option]:bg-white`}
            aria-label="Select language"
          >
            <option value="en">English en</option>
            <option value="de">Deutsch de</option>
          </select>

          <a
            href='https://main.d7z80586kqd0r.amplifyapp.com/'
            target='_blank'
            className={`px-4 lg:px-8 py-2 text-sm lg:text-base rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${isScrolled
              ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
              : 'border-white text-white hover:bg-white hover:text-gray-800'
              }`}
          >
            {t('navbar.bookNow', 'BOOK NOW')}
          </a>
        </div>

        {/* Mobile Level-Up Hamburger */}
        <HamburgerButton />
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`w-72 mx-auto rounded-3xl mt-0 transform transition-all duration-500 ease-in-out ${isScrolled ? 'bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl' : 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl'}`}>
          <div className='px-4 py-8 max-h-[75vh] overflow-y-auto'>
            <ul className='flex flex-col gap-4 text-center'>
              {/* HOME */}
              <NavLink
                to="/"
                className={({ isActive }) => `py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${mobileItemBase(isActive, '/')}`}
                onClick={() => setIsMenuOpen(false)}
                onTouchStart={pressStart('/')} onMouseDown={pressStart('/')}
                onTouchEnd={pressEnd} onMouseUp={pressEnd}
              >
                {t('navbar.home', 'HOME')}
              </NavLink>

              {/* DESTINATION (expand/collapse) */}
              <button
                className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${isScrolled ? 'text-gray-800 hover:text-cyan-600 hover:bg-gray-100' : 'text-white hover:text-cyan-300 hover:bg-white/20'}`}
                onClick={() => setIsMobileDestinationOpen(!isMobileDestinationOpen)}
                onTouchStart={pressStart('dest')} onMouseDown={pressStart('dest')}
                onTouchEnd={pressEnd} onMouseUp={pressEnd}
              >
                {t('navbar.destination', 'DESTINATION')}
              </button>

              {isMobileDestinationOpen && (
                <div className="ml-4 mt-2 space-y-2 text-left">
                  {countries.map((country) => (
                    <div key={country.id}>
                      <NavLink
                        to={country.link}
                        className={({ isActive }) => `block px-3 py-2 text-sm rounded-lg transition-all duration-200 ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'} ${isActive ? 'text-cyan-600' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                        onTouchStart={pressStart(country.link)} onMouseDown={pressStart(country.link)}
                        onTouchEnd={pressEnd} onMouseUp={pressEnd}
                      >
                        {country.name}
                      </NavLink>

                      {surfCamps[country.id]?.originals.map((camp, idx) => (
                        <NavLink
                          key={idx}
                          to={camp.link}
                          className={({ isActive }) => `block ml-4 px-3 py-1 text-xs rounded-lg transition-all duration-200 ${isScrolled ? 'text-gray-500 hover:bg-gray-100' : 'text-white/70 hover:bg-white/10'} ${isActive ? 'text-cyan-600' : ''}`}
                          onClick={() => setIsMenuOpen(false)}
                          onTouchStart={pressStart(camp.link)} onMouseDown={pressStart(camp.link)}
                          onTouchEnd={pressEnd} onMouseUp={pressEnd}
                        >
                          - {camp.name}
                        </NavLink>
                      ))}

                      {surfCamps[country.id]?.partner.map((camp, idx) => (
                        <NavLink
                          key={idx}
                          to={camp.link}
                          className={({ isActive }) => `block ml-4 px-3 py-1 text-xs rounded-lg transition-all duration-200 ${isScrolled ? 'text-gray-500 hover:bg-gray-100' : 'text-white/70 hover:bg-white/10'} ${isActive ? 'text-cyan-600' : ''}`}
                          onClick={() => setIsMenuOpen(false)}
                          onTouchStart={pressStart(camp.link)} onMouseDown={pressStart(camp.link)}
                          onTouchEnd={pressEnd} onMouseUp={pressEnd}
                        >
                          - {camp.name}
                        </NavLink>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* ACTIVITIES */}
              <NavLink
                to="/activities"
                className={({ isActive }) => `py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${mobileItemBase(isActive, '/activities')}`}
                onClick={() => setIsMenuOpen(false)}
                onTouchStart={pressStart('/activities')} onMouseDown={pressStart('/activities')}
                onTouchEnd={pressEnd} onMouseUp={pressEnd}
              >
                {t('navbar.activities', 'ACTIVITIES')}
              </NavLink>

              {/* RATES */}
              <NavLink
                to="/rates"
                className={({ isActive }) => `py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${mobileItemBase(isActive, '/rates')}`}
                onClick={() => setIsMenuOpen(false)}
                onTouchStart={pressStart('/rates')} onMouseDown={pressStart('/rates')}
                onTouchEnd={pressEnd} onMouseUp={pressEnd}
              >
                {t('navbar.rates', 'RATES')}
              </NavLink>

              {/* FAQ */}
              <NavLink
                to="/faq"
                className={({ isActive }) => `py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${mobileItemBase(isActive, '/faq')}`}
                onClick={() => setIsMenuOpen(false)}
                onTouchStart={pressStart('/faq')} onMouseDown={pressStart('/faq')}
                onTouchEnd={pressEnd} onMouseUp={pressEnd}
              >
                {t('navbar.faq', 'FAQ')}
              </NavLink>

              {/* BLOGS */}
              <NavLink
                to="/blogs"
                className={({ isActive }) => `py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${mobileItemBase(isActive, '/blogs')}`}
                onClick={() => setIsMenuOpen(false)}
                onTouchStart={pressStart('/blogs')} onMouseDown={pressStart('/blogs')}
                onTouchEnd={pressEnd} onMouseUp={pressEnd}
              >
                {t('navbar.blogs', 'BLOGS')}
              </NavLink>

              {/* CONTACT */}
              <NavLink
                to="/contact"
                className={({ isActive }) => `py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${mobileItemBase(isActive, '/contact')}`}
                onClick={() => setIsMenuOpen(false)}
                onTouchStart={pressStart('/contact')} onMouseDown={pressStart('/contact')}
                onTouchEnd={pressEnd} onMouseUp={pressEnd}
              >
                {t('navbar.contact', 'CONTACT')}
              </NavLink>

              {/* Translation dropdown above Book Now (MOBILE) */}
              <div className="mt-2">
                <select
                  onChange={(e) => changeLanguage(e.target.value)}
                  value={i18n.language}
                  style={{ colorScheme: 'light' }}
                  className={`w-full px-3 py-2 rounded-lg text-sm cursor-pointer bg-white text-gray-900 border ${isScrolled ? 'border-gray-300' : 'border-white/60'} [&>option]:text-black [&>option]:bg-white`}
                  aria-label="Select language"
                >
                  <option value="en">English en</option>
                  <option value="de">Deutsch de</option>
                </select>
              </div>

              {/* Book Now button */}
              <a
                href='https://main.d7z80586kqd0r.amplifyapp.com/'
                target='_blank'
                className={`mt-2 mx-auto w-full max-w-xs px-4 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-lg transform text-xs sm:text-sm font-semibold text-center block ${isScrolled ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white' : 'border-white/50 text-white hover:bg-white hover:text-gray-800'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navbar.bookNow', 'BOOK NOW')}
              </a>
            </ul>
          </div>
        </div>
      </div>

      {!isMenuOpen && !isScrolled && !isDestinationHovered && (
        <div className='container mx-auto px-3 sm:px-6 md:px-8 lg:px-16'>
          <div className='w-full h-0.5 bg-white/80' />
        </div>
      )}
    </div>
  )
}

export default Navbar
