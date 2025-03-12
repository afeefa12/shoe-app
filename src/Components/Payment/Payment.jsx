// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { useCart } from '../Cart/CartContext'; 

// // const Payment = () => {
// //     const { cart } = useCart(); 
// //     const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
// //     const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiry: "", cvv: "" });
// //     const [upiId, setUpiId] = useState("");

// //     // Calculate total price
// //     const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

// //     return (
// //         <div className="min-h-screen bg-gray-100 py-10">
// //             <div className="container mx-auto px-4">
// //                 <h1 className="text-3xl font-bold text-center mb-8">Payment</h1>

// //                 {/* Order Summary */}
// //                 <div className="bg-white p-6 rounded-lg shadow-md">
// //                     <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
// //                     <div className="space-y-4">
// //                         {cart.map((product) => (
// //                             <div key={product.id} className="flex justify-between items-center border-b pb-4">
// //                                 <div className="flex items-center">
// //                                     <img
// //                                         src={product.image}
// //                                         alt={product.name}
// //                                         className="w-16 h-16 object-cover rounded-lg"
// //                                     />
// //                                     <div className="ml-4">
// //                                         <h3 className="text-lg font-medium">{product.name}</h3>
// //                                         <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
// //                                     </div>
// //                                 </div>
// //                                 <p className="text-lg font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
// //                             </div>
// //                         ))}
// //                     </div>
// //                     <div className="mt-6 flex justify-between items-center">
// //                         <h3 className="text-xl font-semibold">Total</h3>
// //                         <p className="text-xl font-semibold">${totalPrice.toFixed(2)}</p>
// //                     </div>
// //                 </div>

// //                 {/* Payment Method */}
// //                 <div className="bg-white p-6 rounded-lg shadow-md mt-8">
// //                     <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
// //                     <div className="space-y-4">
// //                         <div className="flex items-center">
// //                             <input
// //                                 type="radio"
// //                                 id="cashOnDelivery"
// //                                 name="paymentMethod"
// //                                 value="cashOnDelivery"
// //                                 className="w-5 h-5"
// //                                 checked={paymentMethod === "cashOnDelivery"}
// //                                 onChange={(e) => setPaymentMethod(e.target.value)}
// //                             />
// //                             <label htmlFor="cashOnDelivery" className="ml-2 text-lg">
// //                                 Cash on Delivery
// //                             </label>
// //                         </div>
// //                         <div className="flex items-center">
// //                             <input
// //                                 type="radio"
// //                                 id="creditCard"
// //                                 name="paymentMethod"
// //                                 value="creditCard"
// //                                 className="w-5 h-5"
// //                                 checked={paymentMethod === "creditCard"}
// //                                 onChange={(e) => setPaymentMethod(e.target.value)}
// //                             />
// //                             <label htmlFor="creditCard" className="ml-2 text-lg">
// //                                 Credit Card
// //                             </label>
// //                         </div>
// //                         {paymentMethod === "creditCard" && (
// //                             <div className="mt-4 space-y-2">
// //                                 <input
// //                                     type="text"
// //                                     placeholder="Card Number"
// //                                     className="w-full p-2 border rounded"
// //                                     value={cardDetails.cardNumber}
// //                                     onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
// //                                 />
// //                                 <div className="flex space-x-2">
// //                                     <input
// //                                         type="text"
// //                                         placeholder="Expiry (MM/YY)"
// //                                         className="w-1/2 p-2 border rounded"
// //                                         value={cardDetails.expiry}
// //                                         onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
// //                                     />
// //                                     <input
// //                                         type="text"
// //                                         placeholder="CVV"
// //                                         className="w-1/2 p-2 border rounded"
// //                                         value={cardDetails.cvv}
// //                                         onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
// //                                     />
// //                                 </div>
// //                             </div>
// //                         )}
// //                         <div className="flex items-center">
// //                             <input
// //                                 type="radio"
// //                                 id="gpay"
// //                                 name="paymentMethod"
// //                                 value="gpay"
// //                                 className="w-5 h-5"
// //                                 checked={paymentMethod === "gpay"}
// //                                 onChange={(e) => setPaymentMethod(e.target.value)}
// //                             />
// //                             <label htmlFor="gpay" className="ml-2 text-lg">
// //                                 Google Pay (GPay)
// //                             </label>
// //                         </div>
// //                         {paymentMethod === "gpay" && (
// //                             <div className="mt-4 space-y-2">
// //                                 <input
// //                                     type="text"
// //                                     placeholder="Enter UPI ID"
// //                                     className="w-full p-2 border rounded"
// //                                     value={upiId}
// //                                     onChange={(e) => setUpiId(e.target.value)}
// //                                 />
// //                                 <p className="text-sm text-gray-600">OR</p>
// //                                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
// //                                     Scan QR Code
// //                                 </button>
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>

// //                 {/* Confirm Order Button */}
// //                 <div className="mt-8 text-center">
// //                     <Link
// //                         to={`/order?total=${totalPrice.toFixed(2)}&payment=${paymentMethod}`}
// //                         className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
// //                     >
// //                         Confirm Order (${totalPrice.toFixed(2)})
// //                     </Link>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Payment;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// const Payment = () => {
//   const [cart, setCart] = useState([]);
//   const [selectedPayment, setSelectedPayment] = useState("creditCard");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:4000/Cart")
//       .then((res) => res.json())
//       .then((data) => setCart(data))
//       .catch((error) => console.error("Error fetching cart:", error));
//   }, []);

//   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handlePayment = () => {
//     alert(`Payment successful with ${selectedPayment} for $${totalAmount.toFixed(2)}`);
//     navigate("/confirmation");
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Payment</h1>
//       <Card>
//         <CardContent className="p-4">
//           <h2 className="text-lg font-semibold">Order Summary</h2>
//           {cart.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             <ul className="mb-4">
//               {cart.map((item) => (
//                 <li key={item.id} className="flex justify-between py-2">
//                   <span>{item.name} (x{item.quantity})</span>
//                   <span>${(item.price * item.quantity).toFixed(2)}</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//           <p className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</p>
//           <h2 className="text-lg font-semibold mt-4">Payment Method</h2>
//           <div className="flex gap-4 my-2">
//             <label>
//               <input
//                 type="radio"
//                 name="payment"
//                 value="creditCard"
//                 checked={selectedPayment === "creditCard"}
//                 onChange={(e) => setSelectedPayment(e.target.value)}
//               />
//               Credit Card
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="payment"
//                 value="paypal"
//                 checked={selectedPayment === "paypal"}
//                 onChange={(e) => setSelectedPayment(e.target.value)}
//               />
//               PayPal
//             </label>
//           </div>
//           <Button className="mt-4 w-full" onClick={handlePayment} disabled={cart.length === 0}>
//             Proceed to Pay
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Payment;
