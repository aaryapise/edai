import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import ServerDashboard from './Components/ServerDashboard/ServerDashboard';
import Customer from './Components/Customer/Customer';
import Work from './Components/Work/Work';


// import RequestService from './Components/RequestService/RequestService';

function App() {
  return (
    <div className="App">
      <Router>{/* Include your navigation component here */}
        <Routes>
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/Serverdashboard" element={<ServerDashboard />} />
          <Route path='/Customer'element={<Customer/>}/>
          <Route path='/Work'element={<Work/>}/>
          {/* <Route path="/requestService" element={<RequestService />} />  */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
