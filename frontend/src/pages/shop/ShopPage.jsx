import React, { useEffect, useState } from 'react'

import sadGirl from "../../assets/sad girl.png";
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
    categories: ['all', "accessories", 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRanges: [
        {label: 'Under $50', min:0, max: 50},
        {label: '$50 - $100', min:50, max: 100},
        {label: '$100 - $200', min:100, max: 200},
        {label: '$200 and above', min:200, max: Infinity},
    ]
}


const ShopPage = () => {
    
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(8);

    const { category, color, priceRange } = filtersState;
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);

    const {data: {products = [], totalPages, totalProducts} = {}, error, isLoading} = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxprice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage,
    })


    // clear the filters
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: ''
        })
        setCurrentPage(1)
    }


    useEffect(()=>{
        setCurrentPage(1)
    }, [filtersState])

    
    // handle page change
    const handlePageChange = (pageNumber) =>{
        if(pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    
    if(error) return <div>Error loading products. </div>
    error?.console.log("Error occured - ", error);

    const startProduct = (currentPage -1) * ProductsPerPage + 1;
    const endProduct = startProduct + products.length -1;

  return (
    <>
        <section className='section__container bg-primary-light'>
            <h2 className='section__header caption-bottom'>Shop Page</h2>
            <p className='section__subheader'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, suscipit minima? Quas saepe libero tempora.</p>
        </section>
         {
          isLoading && <div className='flex flex-wrap justify-evenly mx-20'>
            {[...Array(8)].map((_, index) => (
                <div key={index} role='status' class='max-w-sm border border-gray-300 rounded-lg p-4 my-4'>
                    <div class="animate-pulse w-full bg-gray-300 h-48 rounded-lg mb-5 flex justify-center items-center">
                    <svg class="w-8 h-8 stroke-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.5499 15.15L19.8781 14.7863C17.4132 13.4517 16.1808 12.7844 14.9244 13.0211C13.6681 13.2578 12.763 14.3279 10.9528 16.4679L7.49988 20.55M3.89988 17.85L5.53708 16.2384C6.57495 15.2167 7.09388 14.7059 7.73433 14.5134C7.98012 14.4396 8.2352 14.4011 8.49185 14.3993C9.16057 14.3944 9.80701 14.7296 11.0999 15.4M11.9999 21C12.3154 21 12.6509 21 12.9999 21C16.7711 21 18.6567 21 19.8283 19.8284C20.9999 18.6569 20.9999 16.7728 20.9999 13.0046C20.9999 12.6828 20.9999 12.3482 20.9999 12C20.9999 11.6845 20.9999 11.3491 20.9999 11.0002C20.9999 7.22883 20.9999 5.34316 19.8283 4.17158C18.6568 3 16.7711 3 12.9998 3H10.9999C7.22865 3 5.34303 3 4.17145 4.17157C2.99988 5.34315 2.99988 7.22877 2.99988 11C2.99988 11.349 2.99988 11.6845 2.99988 12C2.99988 12.3155 2.99988 12.651 2.99988 13C2.99988 16.7712 2.99988 18.6569 4.17145 19.8284C5.34303 21 7.22921 21 11.0016 21C11.3654 21 11.7021 21 11.9999 21ZM7.01353 8.85C7.01353 9.84411 7.81942 10.65 8.81354 10.65C9.80765 10.65 10.6135 9.84411 10.6135 8.85C10.6135 7.85589 9.80765 7.05 8.81354 7.05C7.81942 7.05 7.01353 7.85589 7.01353 8.85Z" stroke="stroke-current" stroke-width="1.6" stroke-linecap="round"></path>
                    </svg>
                    </div>
                    <div class=' w-full flex justify-between items-start animate-pulse'>
                    <div class="block">
                        <h3 class='h-3 bg-gray-300 rounded-full  w-48 mb-4'></h3>
                        <p class='h-2 bg-gray-300 rounded-full w-32 mb-2.5'></p>
                    </div>
                    <span class="h-2 bg-gray-300 rounded-full w-16 "></span>
                    </div>
                </div>
            ))}
        </div>
        }
        {
            !isLoading &&
        <section className='section__container'>
            <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                {/* left side */}
                <ShopFiltering 
                filters={filters}
                filtersState={filtersState}
                setFiltersState={setFiltersState}
                clearFilters={clearFilters}
                />

                {/* right side */}
                <div className=''>
                    <h3 className='text-xl font-medium mb-4'>
                        Showing {products.length < 1 ? "0": startProduct} to {endProduct} of {totalProducts} products
                    </h3>
                    { 
                        products.length < 1 ? (<div className='mx-16'><img src={sadGirl} className='w-40'/> <p>Opps! No products not found</p></div>) : "" 
                    }
                    <ProductCards products={products} />

                    {/* pagination controls */}
                    <div className='mt-6 flex justify-center'>
                        <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>Previous</button>
                        {
                            [...Array(totalPages)].map((_, index) =>(
                                <button
                                key={index}
                                onClick={()=> handlePageChange(index + 1)}
                                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}
                                >
                                    {index + 1}
                                </button>
                            ))
                        }
                        <button
                        disabled={currentPage == totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>Next</button>
                    </div>
                </div>

            </div>
        </section>
        }
    </>
  )
}

export default ShopPage
