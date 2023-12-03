import React from 'react'
import  axios  from 'axios';
import { cartContext } from './../../context/cartContext';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';

export default function Payment() {
   const {CartId,setnumOfCartItems,settotalCartPrice,setcartProuduct} = useContext(cartContext);
  console.log(CartId);
   async function confirmCashPayment() {

      const phonevalue=  document.querySelector('#phone').value;
        const cityvalue=  document.querySelector('#city').value;
         const detailsvalue= document.querySelector('#details').value;
         const shippingAddress=   {
            "shippingAddress":{
                "details":detailsvalue,
                "phone": phonevalue,
                "city": cityvalue 
                }

              
        }

        try{
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,shippingAddress,{
                headers:{token:localStorage.getItem('tkn')}
            }  )
            console.log(data);
            if (data.status==='success') {
                toast.success('order succesfully initialized');
                setcartProuduct([]);
                setnumOfCartItems(0);
                settotalCartPrice(0)
                
                
            }
            else{
                toast.error('error on creating order')
            }
        }


    
          catch(e){
              console.log('error occurd',e);
          }
    }
async function confirmOnlinePayment() {
  const phonevalue=  document.querySelector('#phone').value;
        const cityvalue=  document.querySelector('#city').value;
         const detailsvalue= document.querySelector('#details').value;
         const shippingAddress=   {
            "shippingAddress":{
                "details":detailsvalue,
                "phone": phonevalue,
                "city": cityvalue 
                }}

                try {
                  const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}`,shippingAddress,{
                     headers:{token:localStorage.getItem('tkn')},
                     params:{url:'http://localhost:3000'}
                   })
                   window.open(data.session.url, '_blank')  ;
                 } catch (error) {
                   console.log('error',error);
                 }
              
 

               
}

  return <>
  
  <div className="container py-5">

<form >

    <label htmlFor="">phone:</label>
    <input  id='phone'  type="tel" placeholder='phone' className='mb-3 form-control' />
    <label htmlFor="">City:</label>
    <input  id='city'  type="tel" placeholder='City' className='mb-3 form-control' />
    <label htmlFor="">details:</label>
    <textarea  id='details'  type="tel" placeholder='details' className='mb-3 form-control' />
   <button type='button' onClick={confirmCashPayment} className='btn btn-primary'>confirm Cash payment</button>
   <button type='button' onClick={confirmOnlinePayment} className='btn btn-primary'>confirm online payment</button>
</form>
  </div>
  
  </>
}
