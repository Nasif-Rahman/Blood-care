import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterDonor from './pages/RegisterDonor';
import SearchDonor from './pages/SearchDonor';
import Dashboard from './pages/Dashboard';
// import Login from './pages/Login'; 
import Navbar from './components/Navbar';
import AdminLogin from './pages/AdminLogin';
import AdminDonorCard from './components/AdminDonorCard';
import SiteInfo from './pages/SiteInfo';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterDonor />} />
        <Route path="/search" element={<SearchDonor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/site-info" element={<SiteInfo />} />
        <Route
          path="/admin/donor-card"
          element={
            <AdminDonorCard
              donor={{
                id: "",
                name: "",
                bloodGroup: "",
                upazila: "",
                village: "",
                phone: "",
                donationDate: ""
              }}
              onEdit={() => { /* provide edit handler here */ }}
              onDelete={() => { /* provide delete handler here */ }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
