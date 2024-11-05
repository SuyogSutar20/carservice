"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../../_utils/GlobalApi'
import { usePathname } from 'next/navigation'
import Intro  from '../_components/Intro'


function CarServicenew() {

  const param=usePathname();
  const [carServicenews, setServicedetails]= useState([]);
  useEffect(()=>{
    GetServicesDetails(param.split('/')[2])
  },[])

  const GetServicesDetails=(serviceSlug)=>{
    GlobalApi.GetCarServices(serviceSlug).then(resp=>{
      console.log(resp)
      setServicedetails(resp.carServicenews)
    })
  }
  return (
    <div>
    <Intro carServicenews={carServicenews} />
   
    </div>
  )
}

export default CarServicenew