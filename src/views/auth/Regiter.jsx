import React, { useState, useEffect } from 'react'
import { SimpleInput } from '../../components/baseInput'
import { RegisterUser, LoginUser, GetAllUser } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'


const Register = () => {

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorText, setErrorText] = useState('')
  const [errorInputEmail, setErrorInputEmail] = useState('')
  const [errorInputPassword, setErrorInputPassword] = useState('')
  const [btnClass, setBtnClass] = useState('btn-disabled')

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email': setEmail(value); break;
      case 'password': setPassword(value); break;
      default: break;
    }
  };

  const register = async () => {
    try {
      if (email === '' || password === '') {
        setErrorText('Input tidak boleh kosong')
        setErrorInputEmail('input-error')
        setErrorInputPassword('input-error')
      } else {
        if (email.includes('@gmail.com')) {
          document.getElementById('loadindAlert').showModal()

          const data = await RegisterUser({
            email: email,
            password: password
          })
          if (data.status === 422) {
            setErrorText('Email sudah terdaftar')
            setErrorInputEmail('input-error')
          } else if (data.status === 400) {
            setErrorText('Password minimal 8 karakter, gunakan huruf besar/kecil, angka, dan karakter khusus')
            setErrorInputPassword('input-error')
          } else if (data.status === 200) {
            // berhasil register dan akan login
            const dataLogin = await LoginUser({
              email: email,
              password: password
            })
            if (dataLogin.status === 200) {
              setErrorText('')
              navigate('/')
            }
          }
        } else {
          setErrorText('Email tidak valid')
          setErrorInputEmail('input-error')
        }

        document.getElementById('closeModal').click()
       
      }
    } catch (error) {
      console.log(error, '<-- error register');
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

  useEffect(() => {
    email !== '' && password !== '' ? setBtnClass('') : setBtnClass('btn-disabled')
    email.length > 0 ? setErrorInputEmail('') : null
    password.length > 0 ? setErrorInputPassword('') : null
  }, [email, password])


  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
      <div className="card w-96 bg-base-100 shadow-xl">
       
        <div className="card-body items-center text-center">
          <h2 className="card-title">Daftar</h2>
          <SimpleInput label='email' name='email' onChange={handleInput} value={email} type='email' className={errorInputEmail} />
          <SimpleInput label='password' name='password' onChange={handleInput} value={password} type='password' className={errorInputPassword} />
          <small className="text-red-500">{errorText}</small>
          <small className='text-blue-500 cursor-pointer hover:underline' onClick={() => navigate('/login')}>Sudah punya akun? silahkan masuk</small>
          <div className="card-actions mt-5">
            <button className={`btn btn-primary capitalize ${btnClass}`} onClick={register}>Daftar</button>
          </div>
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
  )
}

export default Register