"use client"
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react'
import Button from '@mui/material/Button';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import GlobalApi from '../_utils/GlobalApi';
import { CartUpdateContext } from '../_context/CartUpdateContext';


function Header() {

  const {user, isSignedIn} = useUser();
  const {updateCart, setUpdateCart}=useContext(CartUpdateContext);
  

  useEffect(() => {
    console.log("Header mounted");
    user&&GetUserCart()
  },[updateCart&&user])

  
  const GetUserCart=()=>{
    GlobalApi.GetUserCart(user?.primaryPhoneNumber.phoneNumber).then(resp=>{
      console.log(resp)
    })
  }

  return (
    <div className='flex justify-between items-center p-6 md:px-20 shadow-sm'>
        <Image src='/ServicesLogo.png' alt='logo' width={200} height={200}/>
        <div className='hidden md:flex border p-2 rounded-lg bg-gray-200 w-96'>
          <input type="text" className='bg-transparent w-full outline-none' />
          <Search />
        </div>


        {isSignedIn?
        
        <div className='flex gap-3 items-center'>
          <div className='flex gap-2 items-center'>
          <ShoppingCart />
          <label className='p-1 px-2 rounded-full bg-slate-200'>0</label>
          </div>
          
            <UserButton/>
        </div>

        
        :<div className='flex gap-5'> 
        <SignInButton mode='modal'>
        <Button variant="outlined">Sign In</Button>
        </SignInButton>
          
          <SignUpButton mode='modal'>
          <Button variant="contained">Sign Up</Button>
          </SignUpButton>
          
        </div>}
    </div>
  )
}

export default Header