import React from 'react'
import category1 from "../../assets/categ-1.jpg"
import category2 from "../../assets/categ-2.jpg"
import category3 from "../../assets/categ-3.jpg"
import category4 from "../../assets/categ-4.jpg"
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = [
        {name: 'Accessories', path: 'accessories', image: category1},
        {name: 'Dress Collection', path: 'dress', image: category2},
        {name: 'Jewellery', path: 'jewellery', image: category3},
        {name: 'Cosmetics', path: 'cosmetics', image: category4}
    ]
  return (
    <>
     <div className='product__grid'>
        {
            categories.map((category) => (
                <Link key={category.name} to={`/categories/${category.path}`} className='categories__card'>
                    <img src={category.image} alt={category.name} className='w-[200px] h-[100px] object-cover' />
                    <h4>{category.name}</h4>
                </Link>
            ))
        }
     </div>
    </>
  )
}

export default Categories
