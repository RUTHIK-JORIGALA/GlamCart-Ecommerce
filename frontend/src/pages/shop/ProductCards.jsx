import React from 'react'
import { Link } from 'react-router-dom'
import RatingStar from '../../components/RatingStar'

const ProductCards = ({products}) => {
    
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
      {
        products.map((product, index) => (
            <div key={index} className='product__card'>
                <div className='relative'>
                    <Link to={`/shop/${product._id}`}>
                        <img src={product.image} alt="product image" className='max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300' />
                    </Link>
                    <div className='hover:block absolute top-3 right-3'>
                        <button>
                            <i className="ri-shopping-bag-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i>
                        </button>
                    </div>
                </div>

                {/* product description */}
                <div className='product__card__contact'>
                    <h4>{product.name}</h4>
                    <p>${product.price} {product?.oldPrice ? <s>${product?.oldPrice}</s> : null }</p>
                    <RatingStar rating={product.rating} />
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default ProductCards
