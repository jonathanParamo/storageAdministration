import {
  BrowserRouter
  as
  Router,
  Route,
  Routes
  } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import NewProduct from './components/NewProduct';
import SignIn from './components/Signin';
import Home from './components/Home';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newproduct" element={<NewProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
