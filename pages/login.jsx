import React, { useState } from 'react';
import withNoAuth from "@src/middleware/withNoAuth";
import Link from 'next/link';
import { Input, InputPassword } from '@components/Form';
import { ButtonGreen } from '@components/Buttons';
import { useDispatch, useSelector } from "react-redux";
import { submitLogin } from '@actions/authSlice';

const Login = () => {
   const State = useSelector((state) => state)

   const [loading, setLoading] = useState(false)
   const [Error, setError] = useState(false)

   const dispatch = useDispatch();

   const handleSubmit = (e) => {
      // stop submit
      e.preventDefault();

      if(loading){
         return
      }
      setLoading(true)

      const formData = e.target.elements

      const payload = {
         email : formData.email.value,
         password : formData.password.value,
      }

      dispatch(submitLogin(payload))
         .unwrap()
         .then((obj) => {
            setLoading(false)
            location.reload();
         })
         .catch((obj) => {
            setLoading(false)
            setError(obj)
         })
   }  

   return (
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] rounded-2xl px-6 py-14 bg-white shadow-c-box'>
         <h1 className='text-center font-bold text-2xl'>LOGIN</h1>
         <div className='text-sm mt-2 text-center'>
            Belum punya akun? &nbsp;
            <Link href="/register">
               <a>
                  <span className='text-red'>Daftar Sekarang</span>
               </a>
            </Link>
         </div>

         <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3 mt-6'>
               <div>
                  <label htmlFor="email" className='text-sm'>
                     Email
                  </label>
                  <Input
                     id="email"
                     name="email"
                     placeholder="Input Email"
                     className="w-full mt-2"
                  />
               </div>
               <div>
                  <label htmlFor="password" className='text-sm'>
                     Password
                  </label>
                  <InputPassword
                     id="password"
                     name="password"
                     placeholder="Input Password"
                     className="w-full mt-2"
                  />
               </div>
               <ButtonGreen type="submit">
                  { loading ? "loading" : "Sign In" }
               </ButtonGreen>
            </div>
         </form>
      </div>
   )
}

export default withNoAuth(Login)