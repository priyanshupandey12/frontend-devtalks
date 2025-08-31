import React from 'react'
import {BASE_URL} from '../store/constant'
import axios from 'axios'

const Premium = () => {
   
  const HandleClick=async(type)=>{
       try {
        const response=await axios.post(`${BASE_URL}/payment/create`,
          {
            membershipType: type
          },
          {
            withCredentials: true
          }
        );
       
        const order=response.data
        const options = {
          key: order.keyid, // Replace with your Razorpay key_id
          amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: 'INR',
          name: 'DevTalks',
       
          order_id: order.id, // This is the order_id created in the backend
       
          prefill: {
            name:  `${order.firstName} ${order.lastName}`,
            email: order.emailId,
            contact: '9999999999'
          },
          theme: {
            color: '#F37254'
          },
        };
        const rzp = new window.Razorpay(options);
           rzp.open();
       } catch (error) {
        console.log(error)
       }

  }





  return (
    <div className="min-h-screen bg-black py-10">
    <h1 className="text-4xl font-bold text-center text-white mb-8">Premium Memberships</h1>
    <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
      {/* Silver Membership */}
      <div className="bg-gray-800 text-gray-300 rounded-lg shadow-lg p-6 w-full md:w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Silver Membership</h2>
        <p className="text-lg font-semibold text-center mb-4">200/month</p>
        <ul className="space-y-2 mb-6">
          <li>✅ Access to basic features</li>
          <li>✅ Priority support</li>
          <li>✅ Ad-free experience</li>
        </ul>
        <button    onClick={()=>HandleClick("silver")}                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
          Choose Silver
        </button>
      </div>

      {/* Gold Membership */}
      <div className="bg-yellow-500 text-black rounded-lg shadow-lg p-6 w-full md:w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Gold Membership</h2>
        <p className="text-lg font-semibold text-center mb-4">300/month</p>
        <ul className="space-y-2 mb-6">
          <li>✅ All Silver benefits</li>
          <li>✅ Exclusive content</li>
          <li>✅ Monthly gifts</li>
        </ul>
        <button   onClick={()=>HandleClick("gold")}                   className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold py-2 px-4 rounded">
          Choose Gold
        </button>
      </div>

      
      <div className="bg-gray-600 text-gray-300 rounded-lg shadow-lg p-6 w-full md:w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Bronze Membership</h2>
        <p className="text-lg font-semibold text-center mb-4">100/month</p>
        <ul className="space-y-2 mb-6">
          <li>✅ Limited access</li>
          <li>✅ Basic support</li>
          <li>✅ Occasional ads</li>
        </ul>
        <button  onClick={()=>HandleClick("bronze")}                   className="w-full bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded">
          Choose Bronze
        </button>
      </div>
    </div>
  </div>
  )
}

export default Premium