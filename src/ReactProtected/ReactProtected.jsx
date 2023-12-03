import React, { useContext } from 'react'
import { autContext } from '../context/authencontext'
import { Navigate } from 'react-router-dom'

export default function ReactProtected({children}) {



const {token}=useContext(autContext)


//  profile  كتب فوق فى الباص مثلا login  هنا لو المسخدم وهو فى 
//    login   navigate  بالشكل دا ويخليه يعمل    prtectedRout    كدا هيوديه لصفحه البروفايل فلازم يعمل
if(localStorage.getItem('tkn')==null){
 
    return<Navigate to='/login'/>
}


  return <>

{children}


  </>
}
