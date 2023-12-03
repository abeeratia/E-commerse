import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { Oval } from 'react-loader-spinner';
export default function CategeorySlider () {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows:false
      };

      function getData() {
        
         return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      }

     const {data,isLoading}=  useQuery('allCategory',getData,{
        refetchOnMount:false
     })
     
            console.log(data?.data.data);
     if(isLoading){
      return  <Oval
  height={80}
  width={80}
  color="#4fa94d"
  wrapperStyle={{}}
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>
     }

  return <>
  
  <div>
       <h2 className='text-success py-4'>CategeorySlider</h2>
        <Slider {...settings}>
         {data?.data.data.map(function (category,index) {
            return <div key={index}>
            <img style={{width:'100%',height:'200px'}} src={category.image} alt="slider" />
            <h6 className='my-4 text-success'>{category.name}</h6>
           </div>
            
         })}
        </Slider>
      </div>
    
  
  
  
  
  
  </>
}
