import React from 'react'
import AboutOne from '../../Components/AboutOne/AboutOne'
import AboutTwo from '../../Components/AboutTwo/AboutTwo'
import Testimonial from '../../Components/Testimonial/Testimonial'
import OurLatestNews from '../../Components/OurLatestNews/OurLatestNews'
import AboutkanikaTour from '../../Components/AboutkanikaTour/AboutkanikaTour'

const About = () => {
  return (
    <div>
        <AboutOne/>
        <AboutkanikaTour/>
        <AboutTwo/>
        <Testimonial/>
        <OurLatestNews/>
    </div>
  )
}

export default About