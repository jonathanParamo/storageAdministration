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
import Storages from './pages/Storages';
import Products from './pages/Produtcs';
import Profile from './components/Profile';
import Design from './pages/Design';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/design" element={<Design />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<Home />} >
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Products />} />
          <Route path="storages" element={<Storages />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
