import React, { useContext, useEffect, useState } from 'react'
import { autContext } from '../../context/authencontext'
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../../HomeSlider/HomeSlider';
import CategeorySlider from '../../CategeorySlider/CategeorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function Products() {

  const{addProductToCart}= useContext(cartContext)


  async function adddProduct(id) {
 const res= await addProductToCart(id)
 if (res.status==='success') {
          
  toast.success(res.message,{
    duration:2000

  } )
  
 }
 else{
   toast.error('errorHappend')
 }
  console.log(res);
  }
  /* const {token} =  useContext(autContext) */

  /* console.log(token); */

  //  انما لما بنعمل ريفريش بيحمل الداتا عادى عشان هو بيجيبو من الباك اند react query وعشان نبطل دا بننزل مكتبه اسمها   loading  بسبب لما بنتنقل فى كل كومبوننت بيحصل 

  function getAllProducts() {
    
      return    axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  const {isLoading  ,isError,isFetching,data ,refetch}= useQuery('allProduct',getAllProducts,{
// refetchOnMount:false,          اول ما ندخل على الكموننت   fetch  لو عاوزين نلغى 
// refetchInterval:2000,  كل ثانيتين عشان لو فيه اى تغيير فى الموقع يتعرض وانا موجوده عالويب سايت   fetching   لو عاوزين نعمل     
    // cacheTime:24*60*60*1000            بعد 24 ساعه  fetch  لو  هيعمل كاش للداتا لمده 24 ساعه مثلا وبعد كدا يعمل 
   
   // enable دا =>defult بتاعه true    refetch  اسمها  method معين   من خلال   event  بعد   fetch  دا بستخدمه عشان لو عاوزه اعمل 
  enabled:true
  });

       console.log(data?.data.data);
//   bt cach data   <= react query   مميزات 
       if(isLoading){
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
  /* const [allProduct, setallProduct] = useState(null)
  async function getAllProducts() {
    
    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
              
    console.log(data.data);
    setallProduct(data.data)
  
    }
   
     useEffect(function () {
      getAllProducts()
     },[])
  
   */
    return<>
    


      <Helmet>
        <title>All product</title>
      </Helmet>

     <div className="container py-5">
  <div className="row  gx-0 mb-5" >
    <div className="col-sm-9">
    <HomeSlider/>
    </div>
    <div className="col-sm-3">
      <img style={{width:'100%', height:'200px'}} src={require('../../images/grocery-banner-2.jpeg')} alt='slider' />
      <img style={{width:'100%', height:'200px'}} src={require('../../images/grocery-banner.png')} alt="slider" />
    </div>
  </div>
  <CategeorySlider/>
  {/* <div className="btn btn-success w-100 " onClick={refetch}>AddProduct....</div> */}
  <div className="row py-5">
  
   {data?.data.data.map(function (product,ind) {
    console.log('abeer', data?.data.data);
    console.log(product)
    return    <div   key={ind} className="col-md-2">
                    
    <div className='product'>
    <Link  to= { `/ProductDetails/${product.id}`} >
    <img src={product.imageCover} className='w-100 py-5'  alt="product" />
  <h6 className=' main-color  '>{product.category.name}</h6>
  <h5>{product.title.split(' ').slice( 0 , 2 ).join(' ')}</h5>
  <div className='d-flex justify-content-between align-items-center'><p>{product.price}EGP</p>
      
      <p> <span><i className='fa-solid fa-star text-warning'></i></span> {product.ratingsAverage}</p>
     

</div>
</Link>  
<button onClick={()=>adddProduct(product.id)} className=' border-white main-bgcolor w-100 rounded-2  p-1 mt-2 '>++Add Cart</button>

      </div>
    
                    
                    
                    </div>
    
   })}
  </div>
    </div>

  

  </>
}
