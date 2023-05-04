import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function Users() {
  return (
    <>
        <div>Users</div>
    </>
  )
}

export default withAuthenticationRequired(Users);