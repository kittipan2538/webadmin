import React,{useState} from 'react'
import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Blacklist from './pages/Blacklist';
import Login from './pages/Login';
import Approve from './pages/Approve';
import Reports from './pages/Reports';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import Popup from './components/Popup';

const adminContext = React.createContext();

function App() {

  

  const [state,setState] = useState(null);

  return (

    <adminContext.Provider value={{state, setState}}>
      <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/approve' exact component={Approve} />
        <Route path='/reports' exact component={Reports} />
        <Route path='/blacklist' exact component={Blacklist} />
        <Route path='/navbar' exact component={Navbar} />
        <Route path='/popup' exact component={Popup} />
      </Switch>
    </Router>
    </adminContext.Provider>
   
    

  );
}

export {adminContext};
export default App;
