import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import { RevolvingDot } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {

   const{removeCartData,cartprouduct,numOfCartItems,totalCartPrice,deleteCart,updateCount}=  useContext(cartContext);

     if(cartprouduct===null){
        return   <div className="vh-100  d-flex justify-content-center align-items-center">

<RevolvingDot
        radius="45"
        strokeWidth="5"
        color="red"
        secondaryColor='green'
        ariaLabel="revolving-dot-loading"
        wrapperStyle={{}}
        wrapperclassName=""
        visible={true}
      />
 
        </div> 
     }

  async function deleteCartt () {
    
    await removeCartData()
   }

    if(cartprouduct.length===0){
      return <>
      
      <h1>No data found in your cart <Link to='/Products' className='text-danger '> please get some products.... </Link> </h1>
      </>
    }

     async function deleteProduct(id) {
     const res =  await deleteCart(id)
     if(res.status==='success') 
      toast.success('product removed succesfully')  
    else{
      toast.error('Error occurred')
    }

      }

   async function updateElementCount(id,count) {
    const res=await  updateCount(id,count);
    if(res.status==='success') 
      toast.success('Updated succesfully')  
    else{
      toast.error('Error occurred')
    }

    }

  return <div className='container py-5 mt-3 bg-light'>
  <h2>shopCart :</h2>
  <h5>totalPrice  : {totalCartPrice} EGP</h5>
  <h5>totalItems  : {numOfCartItems}</h5>
  <div className='d-flex justify-content-between'>
    <button  onClick={deleteCartt} className='btn btn-outline-danger'> clear cart</button>
    <Link  to='/Payment'   className='btn btn-primary'> confirm payment</Link>
    </div>
   {cartprouduct.map(function (prodect,ind) {
      
     
       
    console.log('prouduct',prodect);
    return <div key={ind} className="row my-2 border-bottom border-3 p-3 align-items-center">
    <div className="col-sm-1">
      <img src={prodect.product.imageCover} className='w-100' alt="" />
    </div>
    <div className="col-sm-9 ">
      <h4 className='h6'>{prodect.product.title}</h4>
      <h5 className='h6'>price:{prodect.price}</h5>
      <button onClick={()=>deleteProduct(prodect.product.id)}  className='btn btn-outline-danger'>Delete </button>
  
    </div>
    <div className="col-sm-2">
      <div className="d-flex align-items-center">
          <button onClick={()=>updateElementCount(prodect.product.id , prodect.count +1)} className='btn btn-outline-success'>+</button>
          <span className='mx-2'>{prodect.count}</span>
          <button onClick={()=>updateElementCount(prodect.product.id , prodect.count -1)} className='btn btn-outline-success'>-</button>
      </div>
    </div>
    
      
    </div>
    
   })}


 
  </div>
}
