import React from 'react'
import { motion } from 'framer-motion'

const SurfingJourney = () => {
  return (
    <motion.div 
      className='flex flex-col items-center justify-center container mx-2 sm:mx-4 md:mx-auto w-full overflow-hidden mt-[-2rem] sm:mt-[-3rem]' 
      id='Journey'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h1 
        className='text-base sm:text-lg md:text-xl lg:text-[1.2rem] xl:text-[1.5rem] font-bold mt-4 sm:mt-5 mb-2 sm:mb-3 text-center text-neutral-400 px-2'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Difference between Beach Camp And Ts2 Camp
      </motion.h1>
      
      <motion.p 
        className='text-xs sm:text-sm md:text-base lg:text-[12px] xl:text-[14px] leading-relaxed sm:leading-normal text-center max-w-full sm:max-w-3xl md:max-w-4xl text-black px-3 sm:px-4 md:px-6'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Main difference is the location and the room Standard !<br />
        Beach camp located right next to the beach With swim pool, TS2 camp rooms are With Basic standard simple private rooms With Fan and
        hot water ensuite bathroom Beach camp rooms are Standard private rooms with air conditioning, ensuite bathroom and hot water ! TS2
        camp located 05 minutes ride away from the beach camp, even though you book TS2 weligama , all your surf lessons, Yoga, dinner and all
        events Will be taken place at the beach camp ! 1000 rupees per day will be paid per room and per dormitory as a transport compensation
        to travel between the camps! You can basically spend all ur day at the beach camp and just go for sleep at TS2 camp !      
      </motion.p>

        <div className='flex justify-center w-full mt-4 sm:mt-6 mb-3 sm:mb-4'>
        </div>

    </motion.div>
  )
}

export default SurfingJourney