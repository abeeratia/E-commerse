import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

export default function Regester() {


let user = {
  name:'',
  email:'',
  phone:'',
  password:'',
  rePassword:'',
 
  
}

const navigate= useNavigate();

const [errMessage, setErrorMsg] = useState(null)
const [successmessage, setsuccessMessage] = useState(null)
const [loadingSpinner, setloadingSpinner] = useState(false)

async function regesterNews(values) {
  setErrorMsg(null)

  setloadingSpinner(true)


  try{
    const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values);
    console.log(data);

    if(data.message==="success"){
 
      setsuccessMessage('message success')


      setTimeout(function () {
        
        navigate('/Login')
      },1000)
  
    }
  }
  catch(errs){
  console.log( 'errorsaberr', errs.response.data.message);
  setErrorMsg(errs.response.data.message)
  }
  
  setloadingSpinner(false)


// const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
// .catch(function (errs) {
  
//   console.log(errs);

//   console.log('error occurd', errs);
//   console.log(errs.response.data.message);
// })
 
// console.log(data);


// const apiUrl = "https://ecommerce.routemisr.com/api/v1/auth/signup"
//     try{
//       const {data} = await axios.post(apiUrl,values)
//       if(data.message === "success"){
//         //
//         setSuccessMsg(data.message)
//         setTimeout(() => {
//           navigate("/login")
          
//         }, 2000);
//       }
//       console.log(data);
//     }catch(error){
//       setErrorMsg(error.response.data.message)

//     }finally{
//       console.log("Done");
      
//     }


//  handling exeption  <= دي الطريقه التانيه من استخدام catch عشان فيه حاجه اسمها 

}

const formiObject= useFormik({

initialValues:user,

onSubmit: regesterNews,

validate: function (values) {
  
   setErrorMsg(null)
   const errors={};

   console.log(errors);

   if(values.name.length < 4 || values.name.length > 10 ){

    errors.name ="Name must be from 4characters to 10characters"

   }

if(values.email.includes("@")===false || values.email.includes(".")===false){

  errors.email="email should contain @ ."
}

if(!values.phone.match(/^(02)?01[0125][0-9]{8}$/ )){
  errors.phone = " phone invalid"
}

if(values.password.length < 6 || values.password.length > 12){

  errors.password = "password must be from 6 characters to 12characters"
}

if(values.rePassword !== values.password){
  errors.rePassword = "password and rePassword doesnt match" 
}

return errors

}


})

  return <>
  
  <div className='m-auto w-75 py-4'>

    <h2 className='py-3'>RegesterNow:</h2>
  <form onSubmit={formiObject.handleSubmit} >

{errMessage?<div className='alert alert-danger'>{errMessage}</div>:''}
  {successmessage?<div className='alert alert-success'>{successmessage}</div>:''}

<label htmlFor="name">Name:</label>
<input type="text" onBlur={formiObject.handleBlur} onChange={formiObject.handleChange}   value={formiObject.values.name} id='name'  placeholder='name' className='form-control mb-3'/>
   {formiObject.errors.name && formiObject.touched.name ?<div className='alert alert-danger'>{formiObject.errors.name}</div>:''} 


<label htmlFor="email">Email</label>
<input type="email" onBlur={formiObject.handleBlur}  onChange={formiObject.handleChange}   value={formiObject.values.email} id='email' placeholder='email' className='form-control mb-3'/>
{formiObject.errors.email && formiObject.touched.email?<div className='alert alert-danger'>{formiObject.errors.email}</div>:''} 

<label htmlFor="phone">Phone:</label>
<input type="tel" onBlur={formiObject.handleBlur}onChange={formiObject.handleChange}   value={formiObject.values.phone} id='phone' placeholder='Phone' className='form-control mb-3'/>
{formiObject.errors.phone&& formiObject.touched.phone?<div className='alert alert-danger'>{formiObject.errors.phone}</div>:''} 
 
 <label htmlFor="password">Password:</label>
<input type="password"onBlur={formiObject.handleBlur} id='password' onChange={formiObject.handleChange}   value={formiObject.values.password}  placeholder='password' className='form-control mb-3'/>
{formiObject.errors.password&& formiObject.touched.password?<div className='alert alert-danger'>{formiObject.errors.password}</div>:''} 
 
 <label htmlFor="rePassword">rePassword:</label>
<input type="password"onBlur={formiObject.handleBlur} id='rePassword' onChange={formiObject.handleChange}   value={formiObject.values.rePassword}  placeholder='rePassword' className='form-control mb-3'/>
{formiObject.errors.rePassword&& formiObject.touched.rePassword?<div className='alert alert-danger'>{formiObject.errors.rePassword}</div>:''} 
<button type='submit' disabled={formiObject.isValid ===false || formiObject.dirty===false} className='btn btn-success'>
  
 { loadingSpinner?<Circles
  height="50"
  width="80"
  color="#FFF"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
  />
:'Regester'}
  
  
  
  
  </button>


             
  </form>
  </div>
  
  
  
  
  
  
  </>
}
