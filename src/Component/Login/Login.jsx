import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { autContext } from '../../context/authencontext'

export default function Login() {


 const {setToken}= useContext(autContext);


     
let user = {
  
  email:'',
  password:'',
 
 
  
}

const navigate= useNavigate();

const [errMessage, setErrorMsg] = useState(null)
const [successmessage, setsuccessMessage] = useState(null)
const [loadingSpinner, setloadingSpinner] = useState(false)

async function logInNews(values) {
  setErrorMsg(null)

  setloadingSpinner(true)


  try{
    const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values);
    console.log(data);

    if(data.message==="success"){
 
      //  localstorage بخزن الداتا بتاعتى فى   login   كدا اول ما بعمل 
      // components  على كل shared  واعملها    token كدا اقدر اتعامل مع  localstorage فى اى مكان بدل ما اقوله هات الداتا من    token  وكدا اقدر استخدم
    localStorage.setItem('tkn',data.token)
          setToken(data.token)
    


      setsuccessMessage('message success')


      setTimeout(function () {
        
        navigate('/Products')
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

onSubmit: logInNews,

validate: function (values) {
  
   setErrorMsg(null)
   const errors={};

   console.log(errors);



if(values.email.includes("@")===false || values.email.includes(".")===false){

  errors.email="email should contain @ ."
}



if(values.password.length < 6 || values.password.length > 12){

  errors.password = "password must be from 6 characters to 12characters"
}



return errors

}


})

  return <>
  
  <div className='m-auto w-75 py-4'>

  {errMessage?<div className='alert alert-danger'>{errMessage}</div>:''}
  {successmessage?<div className='alert alert-success'>{successmessage}</div>:''}

    <h2 className='py-3'>Login:</h2>
  <form onSubmit={formiObject.handleSubmit} >



<label htmlFor="email">Email</label>
<input type="email" onBlur={formiObject.handleBlur}  onChange={formiObject.handleChange}   value={formiObject.values.email} id='email' placeholder='email' className='form-control mb-3'/>
{formiObject.errors.email && formiObject.touched.email?<div className='alert alert-danger'>{formiObject.errors.email}</div>:''} 


 <label htmlFor="password">Password:</label>
<input type="password"onBlur={formiObject.handleBlur} id='password' onChange={formiObject.handleChange}   value={formiObject.values.password}  placeholder='password' className='form-control mb-3'/>
{formiObject.errors.password&& formiObject.touched.password?<div className='alert alert-danger'>{formiObject.errors.password}</div>:''} 
 
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
:'Login'}
  
  
  
  
  </button>


             
  </form>
  </div>
  
  
  
  
  
  
  </>
}



// {
//   "name": "beroatia",
//   "email":"beroatia11@gmail.com",
//   "password":"beroatia111",
//   "rePassword":"beroatia111",
//   "phone":"01067292175"
// }