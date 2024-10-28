import React from 'react'
import Islamicarticle from '../components/Userdashboard/Islamicarticle'
import Islamicvideos from '../components/Userdashboard/Islamicvideos'
import Main from '../Main'

const LandingPage = () => {
  return (
    <div>
      <div id='quran' className=' bg1 pt-5 pb-5' >
      <Main />
      </div>
      <div id='articles' className='pb-5 pt-3'>
      <Islamicarticle  />
      </div>
      <div className='pt-3 bg2' id='videos'>
      <Islamicvideos  />
      </div>
    </div>
  )
}

export default LandingPage
