import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IUser } from '../../../../app/Types';

interface UserParams {
    userId: string
}

const ProductDetail = () => {
    const { userId } = useParams<UserParams>()    
    const [user, setUser] = useState({} as IUser)
    const { _id, name, email, isAdmin } = user;    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
        setIsLoading(true);
            try {
                const res = await axios.get(`http://localhost:3000/api/users/${userId}`);          
                setUser(res.data.data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }      
        };
        
        getUser()      
        // eslint-disable-next-line
    }, [userId])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if(name === ''){
            // trigger error
        } else {
            updateUser(user)
        }
    };

    const updateUser = async (updateUserData: IUser) => {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        try {
            const res = await axios.put(`http://localhost:3000/api/users/${userId}`, updateUserData, config);
            setUser(res.data.data);     
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main
            className="content"
            role="main"
            itemScope={undefined}
            itemProp="mainContentOfPage"
        >
            <section className="content__edit">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="user-detail">
                        <input type="text" value={_id} readOnly />    
                        <br />
                        <input type="text" value={name} name="name" onChange={onChange} />
                        <br />    
                        <input type="email" value={email} name="email" onChange={onChange} />
                        <br />
                        <label htmlFor="isAdmin">
                            <input id="isAdmin" type="checkbox" checked={isAdmin} name="isAdmin" onChange={() => setUser({ ...user, isAdmin: !isAdmin })} />
                            <span>Admin</span>
                        </label>
                        <br />
                        <button type="button" onClick={onSubmit}>Save changes</button>
                    </div>
                )}       
            </section>      
        </main>
    );
}

export default ProductDetail;
