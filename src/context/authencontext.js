import { createContext, useEffect, useState } from "react";

export  const autContext= createContext();


 export default function AuteProvider({children}) {

const [token, setToken] = useState(null)

// هنكتب هنا الكود عشان اول ما المستخدم يعمل رفريش ميطلعوش من البراوزر هنقوله لو 
//  فقط render  عشان دا فلى حاله  usesefffect(component did mount)   هنستخد هنا  setToken مش فاضى حط فى  local storage

useEffect(function () {
    
if (localStorage.getItem('tkn') !== null)

setToken(localStorage.getItem('tkn'))
},[])


    return<autContext.Provider   value={{token  , setToken} } >
    
    
    {children}
    
    </autContext.Provider>
    
 }