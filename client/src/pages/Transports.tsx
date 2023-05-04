import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function Transports() {
  return (
    <>
        <div>Transports</div>
    </>
  )
}

export default withAuthenticationRequired(Transports);
