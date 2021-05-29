


export const submitQuestion = async ({ name, email, password }, route) => {

    const URL = `http://localhost:4000/api/${route.url}/${route.id}`
    const fetchData =  await fetch(URL, {
      method: route.route,
      mode: 'cors',
       cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'authorization': 'xxxxxxxxxx',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password" : password,
        })
     })
  return fetchData
}
export default submitQuestion 
