import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/login.css';
import { LoginApi } from '../API/Postapi';

export default function Login() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate()

  const HnadelSubmit = () => {
    if (!email || !password) {
      window.alert("enter valid inputs");
      return;
    }
    const data = { "email": email, "password": password };

    LoginApi(data).then((res) => {
      const response = JSON.parse(res);

      // store in cookies next redirect to login page
      navigate('/home')

    }).catch((error) => {
      console.log(error);
    })


  }

  return (
    <div className="Login" >
      <div>
        <div>
          <h2>Login</h2>
        </div>

        <div>

          <form onSubmit={HnadelSubmit()}>
            <div className='mb-3'>
              <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='mb-3'>
              <input type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='mb-3'>
              <input type='submit' placeholder='Login' />
            </div>
          </form>

        </div>
        <p> New user for<Link to="/register"> REGISTER </Link>      </p>
      </div>
    </div>

  )
}