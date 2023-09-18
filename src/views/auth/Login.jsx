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
  const [btnClass, setBtnClass] = useState('btn-disabled')

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email': setEmail(value); break;
      case 'password': setPassword(value); break;
      default: break;
    }
    email !== '' && password !== '' ? setBtnClass('') : setBtnClass('btn-disabled')
    password.length > 0 ? setErrorInput('') : null
  };

  const login = async () => {
    try {
      document.getElementById('loadindAlert').showModal()
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
        setErrorText('Password salah!')
      }
      document.getElementById('closeModal').click()
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
          <h2 className="card-title">Masuk</h2>
          <SimpleInput label='email or username' name='email' onChange={handleInput} value={email} type='email' />
          <SimpleInput label='password' name='password' onChange={handleInput} value={password} type='password' className={errorInput} />
          <small className="text-red-500">{errorText}</small>
          <small className='text-blue-500 cursor-pointer hover:underline' onClick={() => navigate('/register')}>Belum punya akun? silahkan daftar</small>
          <div className="card-actions mt-5">
            <button className={`btn btn-primary capitalize ${btnClass}`} onClick={login}>Masuk</button>
          </div>
        </div>

        <dialog id="loadindAlert" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center py-4 pb-10">Loading!</h3>
            <div className='text-center'>
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn hidden" id='closeModal'>Close</button>
              </form>
            </div>
          </div>
        </dialog>

      </div>
    </div>
  )
}

export default Login