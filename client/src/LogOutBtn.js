import React, { useContext } from 'react'
import axios from 'axios'
import AuthContext from './context/AuthContext'

export default function LogOutBtn() {

  const { getLoggedIn } = useContext(AuthContext)

  const logOut = async () => {
    await axios.get('http://localhost:4000/api/logout')
    getLoggedIn()
    console.log(getLoggedIn())
  }


  return <button onClick={logOut}>Log Out</button>
}
