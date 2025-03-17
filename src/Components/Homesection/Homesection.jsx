import React from 'react';
import banner from '/src/assets/banner.jpg'; 

const Homesection = () => {
  return (
    <div className='relative'>
      {/* Banner Image */}
      <img 
        src="https://www.jiomart.com/images/product/original/rvfkdf4r4q/urbanbox-uk-8-white-casual-sneakers-sports-lace-up-shoes-for-women-girls-product-images-rvfkdf4r4q-0-202301282117.jpg"
        alt='Banner' 
        className='w-full object-cover object-center'
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
