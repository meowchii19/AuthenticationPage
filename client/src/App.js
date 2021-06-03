import axios from 'axios'
import { AuthContextProvider } from './context/AuthContext'
import Router from './Router'

axios.defaults.withCredentials = true;


function App() {


  return (
    <div className="App">
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </div>
  );
}

export default App;
