"use client"
import React, { useEffect,  useRef,  useState } from 'react';
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CatagoryList() {

 const [catagoryList, setCategoryList] = useState([]);
 const params= useSearchParams() ;

 useEffect(()=>{
  console.log(params.get('category'));
 }, [params])

  useEffect(() =>{
    getCatagoryList();
  },[])

const getCatagoryList=()=>{
  GlobalApi.GetCategory().then(resp=>{
    console.log(resp.categories);
    setCategoryList(resp.catagories);
  })
}



  return (
    <div>
    <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-3/5  p-4">
    <div className='py-6'>
      <h3 className='text-lg text-2xl font-bold'>Car Services Availabe In Pune</h3>
      <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolorum quo quisquam, eum suscipit quas doloribus provident quod voluptas natus sequi iste vitae quasi, iusto adipisci tempore omnis facilis consequuntur. </p>
      </div>
    <div className='grid grid-cols-4 gap-4'>
        {catagoryList&&catagoryList.map((category, index)=>(
          <Link href={'/service/'+category?.slug} className='flex flex-col items-center gap-2 border p-3 rounded-lg min-w-28 hover:border-primary hover:bg-orange-50 cursor-pointer group hover:scale-105 transition-all'> 
              <Image src={category.icon?.url} alt={category.name} 
              width={60}
              height={60}
              />
              <h2 className='text-sm font-bold'>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
    <div class="w-full md:w-2/5  p-4">
        
    </div>
</div>


      
    </div>
  )
}

export default CatagoryList