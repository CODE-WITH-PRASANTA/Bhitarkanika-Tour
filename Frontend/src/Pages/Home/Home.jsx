import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Aboutt from '../../Components/Aboutt/Aboutt'
import Journey from '../../Components/Journey/Journey'
import Experience from '../../Components/Experience/Experience'
import Facility from '../../Components/Facility/Facility'
import Tourpackage from '../../Components/Tourpackage/Tourpackage'
import Oursuccess from '../../Components/Oursuccess/Oursuccess'
import HotelPackage from '../../Components/HotelPackage/HotelPackage'


const Home = () => {
  return (
    <div>
      <HeroSection />
      <Aboutt />
      <Journey />
      <Experience />
      <Facility />
      <Tourpackage />
      <Oursuccess />
      <HotelPackage />
    </div>
  )
}

export default Home