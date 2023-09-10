import React, { useState, useEffect } from 'react'
import { SimpleInput } from '../../components/baseInput'
import { LoginUser, GetAllUser } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorText, setErrorText] = useState('')
  const [errorInput, setErrorInput] = useState('')

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
      const data = await LoginUser({
        email: email,
        password: password
      })
      if (data.status === 200) {
        setErrorInput('')
        setErrorText('')
        navigate('/')
      } else if (data.data.status === 404) {
        setErrorInput('input-error')
        setErrorText('Email or password is wrong!')
      }
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
          <SimpleInput label='email' name='email' onChange={handleInput} value={email} type='email' className={errorInput} />
          <SimpleInput label='password' name='password' onChange={handleInput} value={password} type='password' className={errorInput} />
          <small className="text-red-500">{errorText}</small>
          <small className='text-blue-500 cursor-pointer hover:underline' onClick={() => navigate('/register')}>Don't have an account? please register</small>
          <div className="card-actions mt-5">
            <button className="btn btn-primary" onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login