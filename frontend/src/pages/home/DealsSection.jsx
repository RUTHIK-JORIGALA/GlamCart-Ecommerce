import React from 'react'
import dealsImg from "../../assets/deals.png"

const DealsSection = () => {
  return (
    <section className='section__container deals__container'>
      <div className='deals__image'>
        <img src={dealsImg} alt="deals" />
      </div>
      <div className='deals__content'>
        <h5>Get Up To 20% Discount</h5>
        <h4>Deals Of This Month</h4>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, et? Adipisci tempora ut est ullam! Veritatis fugiat in veniam quidem accusantium aliquam voluptate. Consequuntur et vel tempora cum, recusandae adipisci?</p>
        <div className='deals__countdown flex-wrap'>
            <div className='deals__countdown__card'>
                <h4>10</h4>
                <p>Days</p>
            </div>
            <div className='deals__countdown__card'>
                <h4>15</h4>
                <p>Hours</p>
            </div>
            <div className='deals__countdown__card'>
                <h4>10</h4>
                <p>Mins</p>
            </div>
            <div className='deals__countdown__card'>
                <h4>54</h4>
                <p>Secs</p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default DealsSection
