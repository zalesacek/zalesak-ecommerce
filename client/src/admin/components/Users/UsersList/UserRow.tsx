import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { routesUrl } from '../../../../app/Routes';
import { IUser } from '../../../../app/Types';

const UserRow = (props: {item: IUser}) => {

  const onDelete = async () => {
    try {
        await axios.delete(`http://localhost:3000/api/users/${props.item._id}`);        
    } catch (err) {
        console.error(err);
    }
  }

  return (
    <tr>
      <td>
        <Link to={routesUrl.AdminUserDetail + props.item._id} className="table-grid-item">
            <div className="table-grid-item__content">
                <h2 className="table-grid-item__title">{props.item.name}</h2>            
            </div>
        </Link>
      </td>
      <td>
        <button type="button" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default UserRow;
