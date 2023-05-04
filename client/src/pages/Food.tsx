
import React, { useEffect, useState } from 'react'
import { getProducts } from '../service'
import { IGetProducts } from '../models/IGetProducts';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Form from '../components/locationselectform'
import MyComponent from '../components/foodform'


function Food() {
  const [productData, setProductData] = useState<IGetProducts>()
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  
  
  useEffect(() => {
    const fetchData = async () => {
      const domain = "fars-metu.eu.auth0.com";

      try {
        console.log('Before getAccessTokenSilently');
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });
        console.log('accessToken: ' + accessToken);
        const data = await getProducts(accessToken);
        setProductData(data);
        console.log(productData);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getAccessTokenSilently]);



  return (
    <>
        <div>Food</div>
      
      <Form/>
       
     
        <MyComponent/> 
      
    </>
  )
}

export default withAuthenticationRequired(Food);
