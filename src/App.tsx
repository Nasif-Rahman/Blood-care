import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterDonor from './pages/RegisterDonor';
import SearchDonor from './pages/SearchDonor';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterDonor />} />
        <Route path="/search" element={<SearchDonor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
