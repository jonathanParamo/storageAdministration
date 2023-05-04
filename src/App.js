import {
  BrowserRouter
  as
  Router,
  Route,
  Routes
  } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Storages from './pages/Storages';
import Products from './pages/Produtcs';
import Security from './pages/Security';
import Profile from './pages/Profile';
import RecoveryPassword from './pages/RecoveryPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recovery-password" element={<RecoveryPassword />} />
        <Route path="/dashboard/*" element={<Home />} >
          <Route path="*" element={<Products />} />
          <Route path="profile" element={<Profile />} />
          <Route path="storages" element={<Storages />} />
          <Route path="products" element={<Products />} />
          <Route path="security" element={<Security />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
