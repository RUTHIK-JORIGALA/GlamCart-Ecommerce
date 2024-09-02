import React, { useState } from 'react'
import ProductCards from './ProductCards'

import products from "../../data/products.json"

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8)
    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 4)
    }
  return (
    <section className='section__container product__container'>
      <h2 className='section__header'>Trending Products</h2>
      <p className='section__subheader'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, ad eius! Et voluptatibus nam fugiat nostrum ex, harum reprehenderit eligendi reiciendis iste necessitatibus ad obcaecati qui quaerat eum magni accusamus?</p>

      {/* products card */}
      <div className='mt-12'>
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>
      {/* load more products btn */}
      <div className='product__btn'>
        {
            visibleProducts < products.length && (
                <button onClick={loadMoreProducts} className='btn'>Load More</button>
            )
        }
      </div>
    </section>
  )
}

export default TrendingProducts
