import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function Centers() {
  return (
    <>
        <div>Centers</div>
    </>
  )
}

export default withAuthenticationRequired(Centers);