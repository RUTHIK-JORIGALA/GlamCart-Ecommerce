import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from "../../assets/header.png"

const Banner = () => {
  return (
    <div className='section__container header__container'>
      <div className='header__content z-30'>
        <h4 className='uppercase'>UP to 20% Discount</h4>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ipsum facere perferendis quibusdam commodi, quam at eveniet ex repellat rem impedit placeat perspiciatis sed ducimus. Odit fuga sequi sapiente voluptatum.</p>
        <button className='btn'><Link to="/shop">EXPLORE NOW</Link></button>
      </div>
      <div>
        <img src={bannerImg} alt="" />
      </div>
    </div>
  )
}

export default Banner
