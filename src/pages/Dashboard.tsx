import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

type Donor = {
  id: string;
  name: string;
  bloodGroup: string;
  district: string;
  phone: string;
};

const Dashboard = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch donors from Firestore
  const fetchDonors = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "donors");
      const snapshot = await getDocs(colRef);
      const donorList: Donor[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Donor, "id">),
      }));
      setDonors(donorList);
    } catch (error) {
      console.error("Failed to fetch donors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // Optional: Delete donor by id
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this donor?")) return;

    try {
      await deleteDoc(doc(db, "donors", id));
      setDonors((prev) => prev.filter((donor) => donor.id !== id));
    } catch (error) {
      alert("Failed to delete donor");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">Donor Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading donors...</p>
      ) : donors.length === 0 ? (
        <p className="text-center text-gray-600">No donors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md bg-white shadow">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Blood Group</th>
                <th className="py-3 px-6 text-left">District</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.map(({ id, name, bloodGroup, district, phone }) => (
                <tr key={id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                  <td className="py-3 px-6">{name}</td>
                  <td className="py-3 px-6">{bloodGroup}</td>
                  <td className="py-3 px-6">{district}</td>
                  <td className="py-3 px-6">{phone}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleDelete(id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                      title="Delete donor"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
