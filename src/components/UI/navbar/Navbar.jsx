import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import classes from './Navbar.module.css'
import MyButton from '../button/MyButton'
import { AuthContext } from '../../../context'

export default function Navbar() {
  const { setIsAuth } = useContext(AuthContext)
  const logout = (event) => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }
  return (
    <div className={classes.navbar}>
      <MyButton className={classes.btn} onClick={logout}>Log Out</MyButton>
        <div className={classes.navbarMenu}>
          <Link to='/about' className={classes.navbarLink}>About</Link>
          <Link to='/posts' className={classes.navbarLink}>Posts</Link>
        </div>
      </div>
  )
}
