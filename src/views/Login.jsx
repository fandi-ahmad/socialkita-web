import React, { useState, useEffect } from 'react'
import { SimpleInput } from '../components/baseInput'
import { LoginUser } from '../api/userApi'
import { redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GetAllUser } from "../api/userApi";


const Login = () => {

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email': setEmail(value); break;
      case 'password': setPassword(value); break;
      default: break;
    }
  };

  const login = async () => {
    try {
      await LoginUser({
        email: email,
        password: password
      })
      navigate('/')
    } catch (error) {
      throw error
    }
  }


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const data = await GetAllUser();
        if (data.status === 401) {
          setIsLoggedIn(false);
        }
        if (data.status === 200) {
          setIsLoggedIn(true);
          navigate('/')
        }
      } catch (error) {
        throw error
      }
    };

    checkLoginStatus();
  }, [isLoggedIn]);



  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
      <div className="card w-96 bg-base-100 shadow-xl">
       
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>
          <SimpleInput label='email' name='email' onChange={handleInput} value={email} type='email' className='mb-2' />
          <SimpleInput label='password' name='password' onChange={handleInput} value={password} type='password' className='mb-2' />
          <small className='text-blue-500 cursor-pointer hover:underline'>don't have an account? please register</small>
          <div className="card-actions mt-5">
            <button className="btn btn-primary" onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login