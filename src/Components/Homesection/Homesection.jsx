import React from 'react';
import banner from '/src/assets/banner.jpg'; 

const Homesection = () => {
  return (
    <div className='relative'>
      {/* Banner Image */}
      <img 
        src="https://cdn.pixabay.com/photo/2022/10/08/17/04/shoes-7507418_1280.jpg"
        alt='Banner' 
        className='w-full object-cover object-center h-[100vh]'
      />
      <div className='absolute top-[30%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center'>
        <h1 className='text-1xl  sm:textt-2xl md:text-3xl lg:text-5xl font-bold text-red-600'>
          Discover your Next Adventure
        </h1>
        <p className='text-2xl mt-5 font-semibold'>
          Shop our latest arrival & unleash your style
        </p>
      </div>
    </div>
  );
};

export default Homesection;
