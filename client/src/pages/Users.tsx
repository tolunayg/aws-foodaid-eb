import React, { useEffect, useState } from 'react';
import { getUsers } from '../service';
import { Table } from 'react-bootstrap';
import { IGetUser } from '../models/IGetUser';

function Users() {
  const [users, setUsers] = useState<IGetUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const userData = await getUsers(accessToken!);
        setUsers(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <h1 className="display-4">Users</h1>

      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.roles.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Users;