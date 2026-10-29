import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Aboutt from '../../Components/Aboutt/Aboutt'
import Journey from '../../Components/Journey/Journey'
import Experience from '../../Components/Experience/Experience'
import Facility from '../../Components/Facility/Facility'
import Oursuccess from '../../Components/Oursuccess/Oursuccess'
import HomeContact from '../../Components/HomeContact/HomeContact'


const Home = () => {
  return (
    <div>
      <HeroSection />
      <Aboutt />
      <Journey />
      <Experience />
      <Facility />
      <Oursuccess />
      <HomeContact/>
    </div>
  )
}

export default Home