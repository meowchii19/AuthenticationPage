import SignupForm from './SignupForm'
import Home from './Home'
import  { BrowserRouter, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={SignupForm}/>
      </BrowserRouter>

    </div>
  );
}

export default App;
