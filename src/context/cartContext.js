import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";
export const cartContext = createContext();

export  function CartContextProvider({children}) {
    
    const [cartprouduct, setcartProuduct] = useState(null);
    const [totalCartPrice, settotalCartPrice] = useState( 0 );
    const [numOfCartItems, setnumOfCartItems] = useState( 0 );
    const [CartId, setCartId] = useState( null );




   async function addProductToCart(productId) {
     try{
        const {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            "productId": productId
    
        },{
            headers:{token:localStorage.getItem('tkn')}
        })

        getUserCart();
        /* setnumOfCartItems(data.numOfCartItems)
        settotalCartPrice(data.data.totalCartPrice)  
        setcartProuduct(data.data.products)   */
           return data;
     }


     catch(e){
         console.log('error' , e);
     }
    }
   
    async function getUserCart() {
    try{
        const {data}=  await axios.get('https://ecommerce.routemisr.com/api/v1/cart?=',{
            headers:{
                token:localStorage.getItem('tkn')
            }
        })
        setnumOfCartItems(data.numOfCartItems);
        settotalCartPrice(data.data.totalCartPrice);
        setcartProuduct(data.data.products);
        setCartId(data.data._id)
    }
    catch(e){
  console.log('errors',e);
    }
    
        
     }
     async function removeCartData() {
        try{
            const {data}=  await axios.delete('https://ecommerce.routemisr.com/api/v1/cart?=',{
                headers:{
                    token:localStorage.getItem('tkn')
                }
            })
            setnumOfCartItems(0);
            settotalCartPrice(0)
            setcartProuduct([])
        }
        catch(e){
      console.log('errors',e);
        }
        
            
         }

              
  async   function deleteCart(productid) {
        
   try{
    const {data}=   await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`,{

    headers:{
        token:localStorage.getItem('tkn')
    }
    })
    setnumOfCartItems(data.numOfCartItems)
        settotalCartPrice(data.data.totalCartPrice)  
        setcartProuduct(data.data.products)  
   
        return data;

   }
   catch(e){
    console.log('errors',e);
   }

}




  async function updateCount(productid,count) {
  try{
    const {data}= await  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`,{
    "count": count
},{
        headers: {token: localStorage.getItem('tkn')}
    })
   
        settotalCartPrice(data.data.totalCartPrice)  
        setcartProuduct(data.data.products)  
        setnumOfCartItems(data.numOfCartItems)
   
    return data

  }
  catch(e){
    console.log('errors',e);
   }
  } 

     useEffect(function () {
        getUserCart();
     },[]);
return <cartContext.Provider  value={{getUserCart,addProductToCart  ,numOfCartItems,totalCartPrice,cartprouduct,deleteCart,updateCount,removeCartData,CartId,setnumOfCartItems,settotalCartPrice,setcartProuduct}}   >
       
       {children}
</cartContext.Provider>
}