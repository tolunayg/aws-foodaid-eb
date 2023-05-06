import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function Centers() {
  return (
    <>
        <h1>Centers</h1>
    </>
  )
}

export default withAuthenticationRequired(Centers);