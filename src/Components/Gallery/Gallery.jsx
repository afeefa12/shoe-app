
// import React from 'react'

// const Pictures = () => {
//     return (
//         <>
//             <section className="text-gray-600 body-font">
//                 <div className="container px-5 py-15 max-auto flex flex-wrap">
//                 <div className="flex flex-wrap md:-m-2 -m-1 ">
//                     <div className="flex flex-wrap w-1/2 hover:scale-75 hover:translate-x-4 hover:skew-y-3 transition duration-600">
//                         <div className="md:p-2 p-1 w-1/2">
//                             <img 
//                                 alt="products" 
//                                 className="w-full object-cover h-full object-center block" 
//                                 src="https://m.media-amazon.com/images/I/81lr4vE-85L._SY695_.jpg" 
                                
//                             />
//                         </div>
//                         <div className="md:p-2 p-1 w-1/2">
//                             <img 
//                                 alt="products" 
//                                 className="w-full object-cover h-full object-center block " 
//                                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyWDetKnzpq6I-uAwpax-uKSWIJkvxYfB7mA&s" 
//                             />
//                         </div>
//                         <div className="md:p-2 p-1 w-full">
//                             <img 
//                                 alt="products" 
//                                 className="w-full h-full object-cover object-center block" 
//                                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgboFif18Uwb00zAwyr8tF-CK5j4iphUICZw&s" 
//                             />
//                         </div>
//                     </div>
//                     <div className="flex flex-wrap w-1/2 hover:scale-75 hover:translate-y-4 hover:skew-y-3 transition duration-600">
//                         <div className="md:p-2 p-1 w-full">
//                             <img 
//                                 alt="products" 
//                                 className="w-full h-full object-cover object-center block" 
//                                 src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/1d50ef3d-47cd-4ddd-824c-cda532f9a015._CR0,0,1200,628_SX810_QL70_.jpg" 
//                             />
//                         </div>
//                         <div className="md:p-2 p-1 w-1/2">
//                             <img 
//                                 alt="products" 
//                                 className="w-full object-cover h-full object-center block" 
//                                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxoUl7GQnN1_xv0VeZKzCEQyDUXZ2dbXyTrg&s" 
//                             />
//                         </div>
//                         <div className="md:p-2 p-1 w-1/2">
//                             <img 
//                                 alt="products" 
//                                 className="w-full object-cover h-full object-center block" 
//                                 src="data:image/jpeg;base64,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"
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 </div>
                
//             </section>
//         </>
//     )
// }

// export default Pictures;




// import React from 'react'

// const Pictures = () => {
//     return (
//         <section className="text-gray-600 body-font">
//             <div className="container px-5 py-16 mx-auto">
//                 <div className="flex flex-wrap -m-2">
//                     {/* Left Column */}
//                     <div className="w-1/2 p-2 group">
//                         <div className="flex flex-wrap transform transition-all duration-500 group-hover:scale-75 group-hover:translate-x-4 group-hover:skew-y-3">
//                             <div className="w-1/2 p-1 md:p-2">
//                                 <div className="h-full overflow-hidden rounded-lg">
//                                     <img 
//                                         alt="products" 
//                                         className="w-full h-full object-cover object-center"
//                                         src="/api/placeholder/300/300" 
//                                     />
//                                 </div>
//                             </div>
//                             <div className="w-1/2 p-1 md:p-2">
//                                 <div className="h-full overflow-hidden rounded-lg">
//                                     <img 
//                                         alt="products" 
//                                         className="w-full h-full object-cover object-center"
//                                         src="/api/placeholder/300/300" 
//                                     />
//                                 </div>
//                             </div>
//                             <div className="w-full p-1 md:p-2">
//                                 <div className="h-48 overflow-hidden rounded-lg">
//                                     <img 
//                                         alt="products" 
//                                         className="w-full h-full object-cover object-center"
//                                         src="/api/placeholder/600/300" 
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
                    
//                     {/* Right Column */}
//                     <div className="w-1/2 p-2 group">
//                         <div className="flex flex-wrap transform transition-all duration-500 group-hover:scale-75 group-hover:translate-y-4 group-hover:skew-y-3">
//                             <div className="w-full p-1 md:p-2">
//                                 <div className="h-48 overflow-hidden rounded-lg">
//                                     <img 
//                                         alt="products" 
//                                         className="w-full h-full object-cover object-center"
//                                         src="/api/placeholder/600/300" 
//                                     />
//                                 </div>
//                             </div>
//                             <div className="w-1/2 p-1 md:p-2">
//                                 <div className="h-full overflow-hidden rounded-lg">
//                                     <img 
//                                         alt="products" 
//                                         className="w-full h-full object-cover object-center"
//                                         src="/api/placeholder/300/300" 
//                                     />
//                                 </div>
//                             </div>
//                             <div className="w-1/2 p-1 md:p-2">
//                                 <div className="h-full overflow-hidden rounded-lg">
//                                     <img 
//                                         alt="products" 
//                                         className="w-full h-full object-cover object-center"
//                                         src="/api/placeholder/300/300" 
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Pictures;



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
