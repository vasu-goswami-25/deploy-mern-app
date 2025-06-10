import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Signup() {
    const [signupInfo, setSignupInfo]=useState({
        name:'',
        email:'',
        password:''
    })
    
    const Navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const copySignupInfo={...signupInfo};
        copySignupInfo[name]=value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup=async(e)=>{
        e.preventDefault();
        const {name,email,password}=signupInfo;
        if(!name || !email || !password){
            return handleError('name,email and password are required');
        }


        try{
            const url="http://localhost:8080/auth/signup";
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result=await response.json();
            const {success,message,error}=result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                  Navigate('/login')
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
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
            {/* NAME */}
            <div>
                <label htmlFor='name'>Name</label>
                <input
                onChange={handleChange}
                 type='text' 
                 name='name'
                 autoFocus
                 placeholder='Enter your name...'
                 value={signupInfo.name}
                />
            </div>

            {/* EMAIL */}
             <div>
                <label htmlFor='email'>Email</label>
                <input
                onChange={handleChange}
                 type='email' 
                 name='email'
                 placeholder='Enter your email...'
                 value={signupInfo.email}
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
                 value={signupInfo.password}
                />
            </div>
            <button type='submit'>Signup</button>
            <span>Already have an account ?
                <Link to="/login">Login</Link>
            </span>
        </form>    

        <ToastContainer/>
      
    </div>
  )
}

export default Signup
