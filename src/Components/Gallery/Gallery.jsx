
import React from 'react';

const Pictures = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-15 mx-auto flex flex-wrap">
                <div className="flex flex-wrap md:-m-2 -m-1">
                  
                    <div className="flex flex-wrap w-1/2 hover:scale-95 hover:translate-x-4 hover:skew-y-3 transition duration-500">
                        <div className="md:p-2 p-1 w-1/2">
                            <img 
                                alt="products" 
                                className="w-full object-cover h-full object-center block" 
                                src="https://cdn.pixabay.com/photo/2021/06/03/08/12/sneep-crew-6306342_1280.jpg" 
                            />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <img 
                                alt="products" 
                                className="w-full object-cover h-full object-center block" 
                                src="https://cdn.pixabay.com/photo/2020/04/27/11/54/nike-5099507_1280.jpg" 
                            />
                        </div>
                        <div className="md:p-2 p-1 w-full">
                            <img 
                                alt="products" 
                                className="w-full h-full object-cover object-center block" 
                                src="https://cdn.pixabay.com/photo/2016/03/16/14/08/shoes-1260814_1280.jpg" 
                            />
                        </div>
                    </div>
                   
                    <div className="flex flex-wrap w-1/2 hover:scale-95 hover:translate-y-4 hover:skew-y-3 transition duration-500">
                        <div className="md:p-2 p-1 w-full">
                            <img 
                                alt="products" 
                                className="w-full h-full object-cover object-center block" 
                                src="https://cdn.pixabay.com/photo/2022/07/22/13/26/shoes-7338170_1280.jpg" 
                            />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <img 
                                alt="products" 
                                className="w-full object-cover h-full object-center block" 
                                src="https://cdn.pixabay.com/photo/2019/08/01/20/09/sports-shoe-4378233_1280.jpg" 
                            />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <img 
                                alt="products" 
                                className="w-full object-cover h-full object-center block" 
                                src="https://cdn.pixabay.com/photo/2016/11/15/01/47/shoes-1825119_1280.jpg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Pictures;
