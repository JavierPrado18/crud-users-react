import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UsersForm = ({getUsers,userSelected,deselectedUser,titleForm,setTitleForm}) => {
    // Usando react-hook-form
    const {register,handleSubmit,reset}=useForm();

    
    
    useEffect(() => {
        if(userSelected){
            reset(userSelected)
        }else{
            reset({
                first_name:"",
                last_name:"",
                password:"",
                email:"",
                birthday:""
            })  
        }
    },[userSelected])
    const submit=(data)=>{
        
       if(userSelected){
        
        axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`,data)
            .then(()=>getUsers())
        window.location.href="#header"
       }else{ 
        
        axios.post("https://users-crud1.herokuapp.com/users/",data)
            .then(()=>getUsers())
            .catch(error=>console.log(error.response))
    
        }
        clear()
        window.location.href="#header"
        setTitleForm(true)
    }
    const clear=()=>{
        reset({
            first_name:"",
            last_name:"",
            password:"",
            email:"",
            birthday:""
        })
        deselectedUser()
    }
    return (
        <form onSubmit={handleSubmit(submit)} className="container-form">
            <button className='btn-close' onClick={()=>{
                clear();
                setTitleForm(true)
                window.location.href="#header"
                }}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <h2 >{titleForm?"Create user":"Add User"}</h2>
            <div className="container-input">
                <label htmlFor="firstName">First name</label>
                <input type="text" 
                    id='firstName'
                    required
                    // registrando co reactForm
                    {...register("first_name")}
                    />
            </div>
            <div className="container-input">
                <label htmlFor="lastName">Last name</label>
                <input type="text" 
                    id='lastName'
                    required
                    {...register("last_name")}
                    />
            </div>
            <div className="container-input">
                <label htmlFor="email">Email</label>
                <input type="email" 
                    id='email'
                    required
                    {...register("email")}
                    />
            </div>
            <div className="container-input">
                <label htmlFor="password">Password</label>
                <input type="password" 
                    id='password'
                    required
                    {...register("password")}
                    />
            </div>
            <div className="container-input">
                <label htmlFor="birthday">Birthday</label>
                <input type="date" 
                    id='birthday'
                    required
                    {...register("birthday")}
                    />
            </div>
            <button className='btn-submit'>{titleForm?"Create User":"Change user"}</button>
         
        </form>
    );
};

export default UsersForm;