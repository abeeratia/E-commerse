import axios from 'axios'
import React, { useContext, useState } from 'react'
import { ColorRing, MagnifyingGlass } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../context/cartContext'
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet'


export default function ProductDetails() {
   

  console.log(cartContext);

  const {addProductToCart} = useContext(cartContext);

  const {id} = useParams()
  
const [ sendingLoader, setsendingLoader] = useState(false)

async function addProduct(id) {
  setsendingLoader(true)
  const res = await addProductToCart(id)
  if (res.status==='success') {
          
    toast.success(res.message,{
      duration:2000
  
    } )
    
   }
   else{
     toast.error('errorHappend')
   }
   setsendingLoader(false)
        
 }
function getProductDetails() {
 return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}

const { data, isloading} =useQuery('ProductDetails' , getProductDetails)
       
    console.log(data);
       if(isloading){
        return  <div className="vh-100  d-flex justify-content-center align-items-center">

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
  return <>
    
       
  {  <div className="container py-5">

           <div className="row  align-items-center">

                    <div className="col-md-3">
                  {console.log(data?.data.data.id)}
                <figure>
            <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />
             </figure>
             </div>
                <div className="col-md-9">
                  
                  <Helmet>
                    <title>{data?.data.data.title.split(' ').slice(0,2).join(' ') }</title>
                  </Helmet>
                     <div className="datails text-center ">
                      <h1>{data?.data.data.title}</h1>
                         <p className='text-muted'>{data?.data.data.description}</p>
                         <h5> price:{data?.data.data.price} EGP</h5>
                         <button  onClick={()=>addProduct(data?.data.data.id)}  className=' border-white main-bgcolor w-100 rounded-4  p-3 mt-4 '>
                          
                          {sendingLoader?<MagnifyingGlass
  visible={true}
  height="40"
  width="40"
  ariaLabel="MagnifyingGlass-loading"
  wrapperStyle={{}}
  wrapperclassName="MagnifyingGlass-wrapper"
  glassColor = '#c0efff'
  color = '#e15b64'
/>:'++Add Cart '}
                          </button>
                     </div>
                </div>
           </div>

    </div>
  }
  </>
}


// return(if()data?.stuts === "success { )