
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
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNYttJpYSuvN5dZp-mffC-dnc-gqNdOBQrw&s" 
                            />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <img 
                                alt="products" 
                                className="w-full object-cover h-full object-center block" 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyWDetKnzpq6I-uAwpax-uKSWIJkvxYfB7mA&s" 
                            />
                        </div>
                        <div className="md:p-2 p-1 w-full">
                            <img 
                                alt="products" 
                                className="w-full h-full object-cover object-center block" 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgboFif18Uwb00zAwyr8tF-CK5j4iphUICZw&s" 
                            />
                        </div>
                    </div>
                   
                    <div className="flex flex-wrap w-1/2 hover:scale-95 hover:translate-y-4 hover:skew-y-3 transition duration-500">
                        <div className="md:p-2 p-1 w-full">
                            <img 
                                alt="products" 
                                className="w-full h-full object-cover object-center block" 
                                src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/1d50ef3d-47cd-4ddd-824c-cda532f9a015._CR0,0,1200,628_SX810_QL70_.jpg" 
                            />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <img 
                                alt="products" 
                                className="w-full object-cover h-full object-center block" 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdfX7xUS4fkFGAfZXEvSQmMfMlLJahYUBtFw&s" 
                            />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <img 
                                alt="products" 
                                className="w-full object-cover h-full object-center block" 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaITAaBDZu7af_R12GyU38ubB4_K75ODdypw&s"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Pictures;
