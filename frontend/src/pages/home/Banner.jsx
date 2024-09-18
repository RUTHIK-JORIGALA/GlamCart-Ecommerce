import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from "../../assets/shopping-banner.png"
import bag1 from "../../assets/doodles/bag1.png"
import bag2 from "../../assets/doodles/bag2.png"
import coin from "../../assets/doodles/coin.png"
import dollar from "../../assets/doodles/dollar.png"
import hanger from "../../assets/doodles/hanger.png"
import pricetag from "../../assets/doodles/pricetag.png"

const Banner = () => {
  return (
    <div className='section__container header__container relative'>
      <div className='absolute top-10 left-10 '>
        <img src={bag1} alt="bag1" className='size-14 opacity-20' />
      </div>
      <div className='absolute bottom-20 left-80'>
        <img src={bag2} alt="bag1" className='size-14 opacity-15' />
      </div>
      <div className='absolute bottom-10 left-10'>
        <img src={coin} alt="bag1" className='size-14 opacity-15' />
      </div>
      <div className='absolute top-24 left-60'>
        <img src={dollar} alt="bag1" className='size-14 opacity-15' />
      </div>
      <div className='absolute top-10 right-40'>
        <img src={hanger} alt="bag1" className='size-14 opacity-15' />
      </div>
      <div className='absolute top-10 right-[38%]'>
        <img src={pricetag} alt="bag1" className='size-14 opacity-15' />
      </div>

      <div className='absolute bottom-20 right-96 '>
        <img src={bag1} alt="bag1" className='size-14 opacity-20' />
      </div>
      <div className='absolute top-20 right-80'>
        <img src={bag2} alt="bag1" className='size-14 opacity-15' />
      </div>
      <div className='absolute top-[50%] left-[50%]'>
        <img src={coin} alt="bag1" className='size-14 opacity-15' />
      </div>
      <div className='absolute bottom-10 left-[45%]'>
        <img src={dollar} alt="bag1" className='size-14 opacity-15' />
      </div>
      <div className='absolute top-10 left-[38%]'>
        <img src={hanger} alt="bag1" className='size-14 opacity-15' />
      </div>
      <div className='absolute top-[52%] left-[20%]'>
        <img src={pricetag} alt="bag1" className='size-14 opacity-15' />
      </div>
      <div className='header__content z-30'>
        <h4 className='uppercase'>UP to 20% Discount</h4>
        <p>Timeless designs, modern fit. Our women's fashion store offers a curated collection of high-quality pieces that will never go out of style. Shop now and discover your new favorite wardrobe staples</p>
        <button className='btn'><Link to="/shop">EXPLORE NOW</Link></button>
      </div>
      <div className='w-full h-full'>
        <img src={bannerImg} alt="" className='w-full' />
      </div>
    </div>
  )
}

export default Banner
