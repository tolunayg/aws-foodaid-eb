import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function Transports() {
  return (
    <>
        <h1>Transports</h1>
    </>
  )
}

export default withAuthenticationRequired(Transports);
