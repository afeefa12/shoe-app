import React from 'react';
import banner from '/src/assets/banner.jpg'; // Update with correct path

const Homesection = () => {
  return (
    <div className='relative'>
      {/* Banner Image */}
      <img 
        src="https://thumbs.dreamstime.com/b/design-mock-up-banner-illustration-white-sport-sneaker-shoes-banner-footwear-commercials-retail-offers-isolated-335060242.jpg" 
        alt='Banner' 
        className='w-full object-cover object-center'
      />

      {/* Text Overlay */}
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
