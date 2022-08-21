import React, { useState, useEffect } from 'react';
import withAuth from '@src/middleware/withAuth';
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from '@actions/categorySlice';
import { getProduct } from '@actions/productSlice';

const Product = () => {
  const [ category, setCategory ] = useState('all');

  const Category = useSelector((state) => state.categories.category);
  const Categories = Category.loading ? [] : Category.data;
  
  const Products = useSelector((state) => state.products.product);
  const Prod = Products.loading ? [] : Products.data;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProduct());
  }, [])

  return (
    <main className='py-20 container'>
      <section className='flex gap-10 font-semibold text-gray-a1'>
        <button onClick={() => setCategory('all')} className={ category == 'all' ? 'font-bold text-gray-45' : ''}>
          All
        </button>
        {
          Categories.loading ? <div>Loading ...</div> :
          Categories && Categories.length > 0 ?
          Categories.map((i, index) => {
            return (
              <button
                onClick={() => setCategory(i.id)}
                key={index} 
                className={ category == i.id ? 'font-bold text-gray-45' : ''}>
                { i.name }
              </button>
            )
          }) : <div>Loading ...</div>
        }
      </section>
      <section className='grid grid-cols-4 mt-8 gap-8'>
        {
          Prod.loading ? <></> :
          Prod && Prod.length > 0 ?
          Prod.map((i, index) => {
            return (
              <Link href={`/${i.id}`}>
                <a>
                  <div key={index} className='shadow-c-box rounded-xl overflow-hidden'>
                    <img 
                      src={i.image} 
                      alt="" 
                      className='w-full h-[250px] object-cover'
                    />
                    <div className='px-4 py-3'>
                      <h1 className='font-bold line-clamp-1'>
                        {i.name}
                      </h1>
                      <div className='flex gap-1 mt-3'>
                        {
                          [...Array(parseInt(i.rating))].map((i, index) => (
                            <img 
                              key={index}
                              src="/assets/star-full.svg" 
                              alt="" 
                              className='w-4'
                            />
                          ))
                        }
                        {
                          parseFloat(i.rating) > parseInt(i.rating) ?
                          <img 
                            src="/assets/star-half.svg" 
                            alt="" 
                            className='w-4'
                          /> : <></> 
                        }
                        {
                          [...Array(5 - Math.ceil(parseFloat(i.rating)))].map((i, index) => (
                            <img 
                              key={index}
                              src="/assets/star-empty.svg" 
                              alt="" 
                              className='w-4'
                            />
                          ))
                        }
                      </div>
                      <h1 className='text-lg font-bold mt-3'>
                        {i.price}
                      </h1>
                    </div>
                  </div>
                </a>
              </Link>
            )
          }) : <></>
        }
        
      </section>
    </main>
  )
}

export default withAuth(Product)
