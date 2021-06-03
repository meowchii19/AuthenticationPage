import { useContext } from 'react'
import SignupForm from './SignupForm'
import Register from './Register'
import Home from './Home'
import  { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import Customer from './Customers'
import AuthContext from './context/AuthContext'



function App() {

  const  {loggedIn}  = useContext(AuthContext)
  console.log(loggedIn,'log')

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Home}/>
            {
              loggedIn === false  && (
                <>
                  <Route path="/register" exact component={Register}/>
                  <Route path="/login" exact component={SignupForm}/>
                </>
            )}
           
            {
              loggedIn === true  && (
                  <Route path="/customer" component={Customer}/>
                
            )}
            
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
