import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import LogOutBtn from './LogOutBtn'


export default function NavBar() {

  const { loggedIn } = useContext(AuthContext)

  return (
    <div>
      <Link to='/'>Home</Link>
      {loggedIn === true && (  
        <>
        <Link to='/customer'>customer</Link>
        <LogOutBtn />
        </>
      )} 
      
      { loggedIn === false && (  
          <>
      <Link to='/login'>Login</Link>
      <Link to='/register'>register</Link>
        </>
      ) }
    </div>
  )
}
