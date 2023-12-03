import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layour from './Component/Layour/Layour';
import Products from './Component/Products/Products';
// import Brands from './Component/Brands/Brands';
import Login from './Component/Login/Login';
import Regester from './Component/Regester/Regester';
// import Category from './Component/Category/Category';
import NotFound from './Component/NotFound/NotFound';
import Profile from './Profile/Profile';
import AuteProvider from './context/authencontext';
import ReactProtected from './ReactProtected/ReactProtected';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './ProductDetails/ProductDetails';
import { CartContextProvider } from './context/cartContext';
import { Toaster } from 'react-hot-toast';
import Cart from './Component/Cart/Cart';
import Payment from './Component/Payment/Payment';
import Allorders from './Component/Allorders/Allorders';
import { Offline } from "react-detect-offline";
const route=createHashRouter([

{path:'/' ,element:<Layour/> , children:[
  {index:true,element:<ReactProtected>
    <Products/> 
    </ReactProtected>  },
  {path:'Products' ,element:<ReactProtected>
  <Products/> 
  </ReactProtected>  },
 /*  {path:'Brands' ,element:<ReactProtected>
  <Brands/>
  </ReactProtected>  },   */
  {path:'ProductDetails/:id' ,element:<ReactProtected>
  <ProductDetails/>
  </ReactProtected>  },  
  {path:'Login' ,element:<Login/>  },
  {path:'Regester' ,element:<Regester/>  },
  {path:'Profile' ,element:<ReactProtected>
<Profile/>
  </ReactProtected>  },  
 /*  {path:'Category' ,element:<ReactProtected>
<Category/>
  </ReactProtected>  },  */
   {path:'Payment' ,element:<ReactProtected>
   <Payment/>
     </ReactProtected>  },  
      {path:'Allorders' , element:<ReactProtected>
      <Allorders/>
        </ReactProtected>  },  
  {path:'Cart' ,element:<ReactProtected>
  <Cart/>
    </ReactProtected>  },  
  {path:'*' ,element: <NotFound/> },
  
  
]}



])





export default function App() {

let clientQuery = new QueryClient()

  return<>
  
 <QueryClientProvider  client={clientQuery} >
 <CartContextProvider  >
 <AuteProvider>
  <RouterProvider  router={route} />
  </AuteProvider>
  </CartContextProvider>
  <Toaster/> 
  </QueryClientProvider>
  

     <Offline>


     <div className='position-fixed bottom-0 start-0 bg-danger text-white p-3 rounded-3'>

      you are offline.....
     </div>

     </Offline>
    </>
  
}
