import React, { useEffect, useState } from 'react'




export const Home = () => {

  const [ name, setName ] = useState('')
  const getData = async () => {
   const data =  await fetch('http://localhost:4000/api/user', {
      method: 'get',
      credentials: 'include',
      headers: { 
        'Content-Type': 'applications/json',
        'Accept' : 'application/json'
      },
    })
    return data

  }

  useEffect(()=> {
    getData().then(res => res.json()).then(({name}) => setName(name))

  })

  return <h1>{ name ? name : 'hello'}  </h1>
}

export default Home
