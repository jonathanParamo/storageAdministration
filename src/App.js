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
import Security from './components/Security';
import Profile from './components/Profile';
import RecoveryPassword from './pages/RecoveryPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recovery-password" element={<RecoveryPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
