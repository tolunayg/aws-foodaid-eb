import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function Users() {
  return (
    <>
        <h1>Users</h1>
    </>
  )
}

// export default withAuthenticationRequired(Users);
export default Users;