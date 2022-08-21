import React, { useState, useEffect } from 'react';
import withAuth from '@src/middleware/withAuth';
import { useRouter } from 'next/router'
import { ButtonGreen, ButtonYellow } from '@components/Buttons';
import { CartIcon } from '@components/Icons';
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProductDetail } from '@actions/productSlice';
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const ProductDetail = () => {
   const router = useRouter()
   const { id } = router.query;

   const Products = useSelector((state) => state.products.product);
   const Prod = Products.loading ? [] : Products.data;

   const getDetail = (obj) => {
      return obj.id == id
   }

   let Product = {}
   if (Prod) {
      Product = Prod.find(getDetail)
   }

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getProduct());
   }, [])

   console.log(Product);

   const [ Image, setImage ] = useState(Product?.image);

   const settings = {
      dots: false,
      infinite: Product?.images?.length > 7,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
   };

   return (
      <main className='py-20 container'>
      {
         Products.loading ? <div className='font-semibold text-gray-a1'>Loading...</div> :
         Product && typeof Product !== 'undefined' ?
         <section className='shadow-c-box pl-2 xl:pr-16 pr-8 pt-2 pb-16 bg-white rounded-2xl flex xl:gap-[72px] gap-10'>
            <div className='xl:w-[612px] w-[500px]'>
               <img 
                  src={ Image } 
                  alt="" 
                  className='w-full xl:h-[612px] h-[500px] object-cover rounded-2xl border border-gray-200'/>
               <div className='mt-8'>
                  <Slider {...settings}>
                  {
                     Product?.images && Product?.images.length > 0 ?
                     Product.images.map((i, index) => {
                        return (
                           <button key={index} onClick={() => setImage(i)} className="mx-[6px]">
                              <img 
                                 key={index}
                                 src={i} 
                                 alt=""
                                 className='w-16 h-16 rounded-lg  border border-gray-200' 
                              />
                           </button>
                        )
                     }) : <></>
                  }
                     
                  </Slider>
               </div>
            </div>
            <div className='pt-12 flex-1'>
               <div className='font-bold text-red'>
                  SALE
               </div>
               <h1 className='text-xl font-bold mt-3'>
                  { Product?.name }
               </h1>
               <div className='flex items-center gap-3 mt-3'>
                  <div className='flex gap-2'>
                     {
                        [...Array(parseInt(Product?.rating))].map((i, index) => (
                           <img 
                           key={index}
                           src="/assets/star-full.svg" 
                           alt="" 
                           className='w-5'
                           />
                        ))
                     }
                     {
                        parseFloat(Product?.rating) > parseInt(Product?.rating) ?
                        <img 
                           src="/assets/star-half.svg" 
                           alt="" 
                           className='w-5'
                        /> : <></> 
                     }
                     {
                        [...Array(5 - Math.ceil(parseFloat(Product?.rating)))].map((i, index) => (
                           <img 
                           key={index}
                           src="/assets/star-empty.svg" 
                           alt="" 
                           className='w-5'
                           />
                        ))
                     }
                  </div>
                  <div className='text-gray-a1 text-sm'>
                  (8.23k reviews)
                  </div>
               </div>
               <div className='mt-3 text-2xl font-bold'>
                  { Product?.price }
               </div>

               <div className='w-full h-px border-b my-7 border-dashed border-gray-cc'></div>

               <div className='grid grid-cols-2 gap-4'>
                  <ButtonYellow>
                     <CartIcon/>
                     <span>Add To Cart</span>
                  </ButtonYellow>
                  <ButtonGreen>
                     Buy Now
                  </ButtonGreen>
               </div>
            </div>
         </section> : <></>
      }
      </main>
   )
}

export default withAuth(ProductDetail)
