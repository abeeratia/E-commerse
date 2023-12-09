import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import  axios  from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Allorders() {

  // hghhhhhhhhhhhhhhhhhh

     const [userId, setuserId] = useState(null)
useEffect(() => {
    const res= jwtDecode(localStorage.getItem('tkn'));
    getAllOrders(res.id);
    

}, [])


  async function getAllOrders(id) {

     try {
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        console.log('abeeeeeeeeeer', data);
        setuserId(data)


     } catch (error) {
        console.log('error',error);
     }
    
 

     if (userId===null) {
        return  <div className="vh-100   d-flex justify-content-center align-items-center">

        <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperclassName="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        
        </div>
     }
}
  return <>



   <Helmet>

    <title>All orders</title>
   </Helmet>

  
  <div className="container">
    <div className="row g-3">
        
        {userId?.map( (order,id)=> {return  <div key={id} className="col-md-6">
<div className="order bg-info p-4 text-center rounded-4">
    <div className="container">
        <div className="row">
            
            {order.cartItems?.map( (item,idex)=> <div  key={idex} className="col-sm-4 "  >
                <div className='bg-light m-3'>
                <img src={item.product.imageCover} className='w-100' alt="" />
                <h6>title : {item.product.title.split(' ').slice(0,2).join(' ')}</h6>
                <p>count : {item.count}</p>
                <p>price : {item.price}</p>
                </div>
                  </div> )}
            </div>
       
    </div>
              

    <p>order set with phone {order.shippingAddress.phone}
    
    and with datails {order.shippingAddress.details} at {order.shippingAddress.city}</p>
       <h5>pay ment method:{order.paymentMethodType}</h5>
       <h4>price: {order.totalOrderPrice}  </h4>
    
</div>
</div>
            
        })}
      
    </div>
  </div>
  
  
  </>
}
