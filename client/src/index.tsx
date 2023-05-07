import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { routes } from './appRouter';

const domain = 'fars-metu.eu.auth0.com';
const clientId = 'sPmf1C7oiGg8zGlrMmLcgRwQLxai77IE';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <Auth0Provider
  //   domain={domain}
  //   clientId={clientId}
  //   authorizationParams={{
  //     redirect_uri: window.location.origin,
  //     audience: `https://fars-metu.eu.auth0.com/api/v2/`,
  //     scope: "read:current_user profile openid email offline_access",
  //     cookieOptions: { secure: false },
  //   }}
    
  // >
     routes 
  /* </Auth0Provider> */
);
