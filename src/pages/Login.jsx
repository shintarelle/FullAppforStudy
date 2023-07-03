import React, { useContext } from 'react'
import MyInput from '../components/UI/input/MyInput'
import MyButton from '../components/UI/button/MyButton'
import { AuthContext } from '../context'

export default function Login() {
  const { setIsAuth } = useContext(AuthContext)

  const login = (event) => {
    event.preventDefault();
    setIsAuth(true)
    localStorage.setItem('auth', 'true')
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder='Enter your Login' />
        <MyInput type="password" placeholder='Enter your Password' />
        <MyButton >Log In</MyButton>
      </form>
    </div>
  )
}
