import React from 'react'
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
const Service = () => {
  return (
    <>
      <div className='container mx-auto px-5 flex py-11 gap-10 items-center justify-center flex-wrap'>
        <div className='bg-amber-500 py-3 px-5 rounded text-white flex gap-2 flex-col items-center w-[220px]'>
        <FaShippingFast  size={30}/>
            <p>FREE SHIPPING</p>
        </div>
        <div className='bg-amber-500 py-3 px-5 rounded text-white flex gap-2 flex-col items-center w-[220px]'>
        <MdProductionQuantityLimits  size={30}/>
            <p>PRODUCTS</p>
        </div>
        
        <div className='bg-amber-500 py-3 px-5 rounded text-white flex gap-2 flex-col items-center w-[220px]'>
        <TbTruckReturn size={30}/>
            <p>EASY RETURNS</p>
        </div>
        <div className='bg-amber-500 py-3 px-5 rounded text-white flex gap-2 flex-col items-center w-[220px]'>
        <MdOutlinePayment size={30} />
            <p>SECURE PAYMENT</p>
        </div>
      </div>
    </>
  )
}

export default Service