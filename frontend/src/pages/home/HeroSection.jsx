import React from 'react'

import card1 from "../../assets/shirts.jpg"
import card2 from "../../assets/casual.jpg"
import card3 from "../../assets/traditional1.jpg"

const cards = [
    {
        id: 1,
        image: card1,
        trend: '2024 Trend',
        title: 'Womens Shirt'
    },
    {
        id: 2,
        image: card2,
        trend: '2024 Trend',
        title: 'Womens Casuals'
    },
    {
        id: 3,
        image: card3,
        trend: '2024 Trend',
        title: 'Womens Traditional'
    },
]

const HeroSection = () => {
  return (
    <section className='section__container hero__container'>
      {
        cards.map((card) => (
            <div key={card.id} className='hero__card h-52 overflow-hidden'>
                <img src={card.image} alt={card.title} className=' opacity-75 w-full object-cover ' />
                <div className='hero__content '>
                    {/* <p>{card.trend}</p> */}
                    <h4>{card.title}</h4>
                    {/* <a href="#">Discover More</a> */}
                </div>
            </div>
        ))
      }
    </section>
  )
}

export default HeroSection
