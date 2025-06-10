import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Login() {
    const [loginInfo, setLoginInfo]=useState({
        email:'',
        password:''
    })
    
    const Navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const copyLoginInfo={...loginInfo};
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin=async(e)=>{
        e.preventDefault();
        const {email,password}=loginInfo;
        if(!email || !password){
            return handleError('name,email and password are required');
        }


        try{
            const url="http://localhost:8080/auth/login";
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result=await response.json();
            const {success,message,jwtToken, name, error}=result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{
                  Navigate('/home')
            },1000)
        }else if(error){
            const details=error?.details[0].message;
            handleError(details);
        }else if(!success){
            handleError(message);
        }
            console.log(result);
        }catch(err){
            handleError(err);
        }
    }


  return (
    <div className='container'> 
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            {/* NAME */}
           

            {/* EMAIL */}
             <div>
                <label htmlFor='email'>Email</label>
                <input
                onChange={handleChange}
                 type='email' 
                 name='email'
                 placeholder='Enter your email...'
                 value={loginInfo.email}
                />
            </div>

            {/* PASSWORD */}
             <div>
                <label htmlFor='password'>password</label>
                <input
                onChange={handleChange}
                 type='password' 
                 name='password'
                 placeholder='Enter your Password...'
                 value={loginInfo.password}
                />
            </div>
            <button type='submit'>Login</button>
            <span>Does't have an account ?
                <Link to="/signup">Login</Link>
            </span>
        </form>    
        
        <ToastContainer/>
    </div>
  )
}

export default Login
