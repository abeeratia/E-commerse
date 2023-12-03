import jwtDecode from 'jwt-decode'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';

export default function Profile() {


  const [name, setName] = useState(null);

  useEffect(()=>{

   const x = jwtDecode(localStorage.getItem('tkn'));
   console.log(x);
   setName(x.name)
  },[])

  if (name==null) {
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
  return<>
  
  <div className="container">
    <h1 className='text-danger text-center'>Hello Yaaa {name}</h1>

  </div>
  
  </>
}
