import {
  BrowserRouter
  as
  Router,
  Route,
  Routes
  } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Storage from './components/Storage';
import NewProduct from './components/newProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<Home />} >
          <Route path="mystorage" element={<Storage />} />
          <Route path="newproduct" element={<NewProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
