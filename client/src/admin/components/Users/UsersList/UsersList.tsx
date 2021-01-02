import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserRow from './UserRow';
import { IUser } from '../../../../app/Types';
import '../../../styles/layout/tables.scss';

const UsersList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers ] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
          const res = await axios.get("http://localhost:3000/api/users");          
          setUsers(res.data.data);
          setIsLoading(false);
      } catch (err) {
          console.error(err);
      }      
    };

    getUsers()  
    // eslint-disable-next-line
  }, [])

  return (
    <main
        className="content"
        role="main"
        itemScope={undefined}
        itemProp="mainContentOfPage"
    >
        <h1>UsersList</h1>

        <table className="table-grid">
          <thead>
            <tr>
              <th>Name</th>
              <th className="table-grid__actions">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={2}>
                    Loading
                  </td>
                </tr> 
              ) : (
                users.map((item) => (
                  <UserRow key={item._id} item={item} />
                ))
              )}
          </tbody>
        </table>        
    </main>
  );
}

export default UsersList;
