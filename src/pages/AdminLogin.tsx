import { useEffect, useState } from 'react';
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  phone: string;
  district: string;
  upazila: string;
}

const AdminLogin = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    phone: '',
    district: '',
    upazila: '',
  });

  const [adminUser, setAdminUser] = useState<any>(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdminUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!adminUser) return;
    const fetchDonors = async () => {
      const snapshot = await getDocs(collection(db, 'donors'));
      setDonors(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Donor)
      );
    };
    fetchDonors();
  }, [adminUser]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      setError('');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setAdminUser(null);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'donors', id));
    setDonors(donors.filter((donor) => donor.id !== id));
  };

  const handleEditClick = (donor: Donor) => {
    setEditingDonor(donor);
    setFormData({ ...donor });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editingDonor) return;
    await updateDoc(doc(db, 'donors', editingDonor.id), formData);
    setDonors(
      donors.map((d) => (d.id === editingDonor.id ? { ...d, ...formData } : d))
    );
    setEditingDonor(null);
  };

  const handleAddDonor = async () => {
    const newDonor = await addDoc(collection(db, 'donors'), formData);
    setDonors([...donors, { id: newDonor.id, ...formData }]);
    setFormData({ name: '', bloodGroup: '', phone: '', district: '', upazila: '' });
  };

  if (!adminUser) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Admin Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          className="w-full p-2 border mb-3 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Add Donor Form */}
      <div className="mb-6 bg-white border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add Donor</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input name="name" placeholder="Name" value={formData.name} onChange={handleFormChange} className="border p-2 rounded" />
          <input name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleFormChange} className="border p-2 rounded" />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleFormChange} className="border p-2 rounded" />
          <input name="district" placeholder="District" value={formData.district} onChange={handleFormChange} className="border p-2 rounded" />
          <input name="upazila" placeholder="Upazila" value={formData.upazila} onChange={handleFormChange} className="border p-2 rounded" />
        </div>
        <button
          onClick={handleAddDonor}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add Donor
        </button>
      </div>

      {/* Donor List */}
      {donors.map((donor) => (
        <div key={donor.id} className="border p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold">{donor.name}</h2>
          <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
          <p><strong>Phone:</strong> {donor.phone}</p>
          <p><strong>District:</strong> {donor.district}</p>
          <p><strong>Upazila:</strong> {donor.upazila}</p>

          <div className="mt-3 space-x-3">
            <button
              onClick={() => handleEditClick(donor)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(donor.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {editingDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Donor</h2>
            <input name="name" value={formData.name} onChange={handleFormChange} className="w-full border p-2 mb-2" placeholder="Name" />
            <input name="bloodGroup" value={formData.bloodGroup} onChange={handleFormChange} className="w-full border p-2 mb-2" placeholder="Blood Group" />
            <input name="phone" value={formData.phone} onChange={handleFormChange} className="w-full border p-2 mb-2" placeholder="Phone" />
            <input name="district" value={formData.district} onChange={handleFormChange} className="w-full border p-2 mb-2" placeholder="District" />
            <input name="upazila" value={formData.upazila} onChange={handleFormChange} className="w-full border p-2 mb-4" placeholder="Upazila" />
            <div className="flex gap-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setEditingDonor(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
