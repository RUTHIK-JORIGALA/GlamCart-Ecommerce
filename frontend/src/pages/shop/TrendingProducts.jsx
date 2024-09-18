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
      <p className='section__subheader'>Accessories are playing a significant role in elevating outfits. Look for bold jewelry, oversized bags, and unique eyewear to add personality to your look</p>

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
