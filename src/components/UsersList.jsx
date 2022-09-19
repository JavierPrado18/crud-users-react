import axios from 'axios';
import React from 'react';

const UsersList = ({users,selectUser}) => {
    
    return (
        <>
          {users.map(user=>(
            <div key={user.id} className="container-card">
                <div className='container-users'>
                    <h3>{user.first_name} {user.last_name}</h3>
                    <h5>EMAIL</h5>
                    <p><i className="fa-solid fa-envelope"></i>{user.email}</p>
                    <h5>BIRTHDAY</h5>
                    <p><i className="fa-solid fa-cake-candles"></i>{user.birthday}</p>
                </div>
                <div className='container-button'>
                    <button  onClick={()=>{
                        selectUser(user)
                        window.location.href="#modal-delete"
                        // deleteUser(user.id)
                        
                        }} 
                        className='btn-delete'><i className="fa-solid fa-trash-can"></i></button>
                    <button 
                        onClick={()=>{
                            selectUser(user)
                            window.location.href="#modal"
                            }} 
                        className='btn-edit'><i className="fa-solid fa-pencil"></i></button>
                </div>
                
            </div>
          ))}  
        </>
    );
};

export default UsersList;