import React, { useEffect } from 'react'
import Header from '../components/Header'
import LifeAtSurfCamp from '../components/beach_camp/Life'
import ImageCard from '../components/beach_camp/ImageCard'
import Packages from '../components/beach_camp/Packages'
import SurfDays from '../components/beach_camp/SurfDays'
import ComfortableStays from '../components/beach_camp/ComfortableStays'
import ImageSlider from '../components/beach_camp/ImageSlider'
import {Footer} from '../components/Footer'

const WaveCamp = () => {

   useEffect(() => {
    document.title = "Wave Camp - The Surfer";
  }, []);

  return (
    <div>
      <Header />
      <LifeAtSurfCamp />
      <ImageCard />
      <Packages />
      <SurfDays />
      <ComfortableStays />
      <ImageSlider />
      <Footer />
    </div>
  )
}

export default WaveCamp