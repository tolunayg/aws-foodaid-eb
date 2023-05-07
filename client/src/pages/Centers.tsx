import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import MapEmbed from '../components/centers/center2';
import DistributionCenters from '../components/centers/center3';
import ServicesList from '../components/centers/center4';
import RegistrationForm from '../components/centers/center5';



function Centers() {
  return (
    <>
        <h1>Centers </h1>
        <div>
    {/*     <Map11/> */}
    <h2> MAP </h2>
         <MapEmbed/> 
         <br></br><br></br> <br></br><br></br>
         <h2>DISTRIBUTION Centers </h2>
         <DistributionCenters/>
         <br></br><br></br> <br></br><br></br>
         <h2>Facilities </h2>
         <ServicesList/>
         <br></br><br></br> <br></br><br></br>
         <h2>Get Access</h2>
         <RegistrationForm/>
        <br></br><br></br><br></br>

        </div>
      
    </>
  )
}


export default withAuthenticationRequired(Centers);