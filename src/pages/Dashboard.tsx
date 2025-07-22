import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

type Donor = {
  id: string;
  name: string;
  bloodGroup: string;
  upazila: string;
  village: string;
  donationDate?: string;
  phone: string;
};

const Dashboard = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "donors");
      const snapshot = await getDocs(colRef);
      const donorList: Donor[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          bloodGroup: data.bloodGroup,
          upazila: data.Upazila || "N/A",
          village: data.Village || "N/A",
          donationDate: data.donationDate || null,
          phone: data.phone,
        };
      });
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
                <th className="py-3 px-6 text-left">Upazila</th>
                <th className="py-3 px-6 text-left">Village</th>
                <th className="py-3 px-6 text-left">Last Donation</th>
                <th className="py-3 px-6 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {donors.map(({ id, name, bloodGroup, upazila, village, donationDate, phone }) => (
                <tr key={id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                  <td className="py-3 px-6">{name}</td>
                  <td className="py-3 px-6">{bloodGroup}</td>
                  <td className="py-3 px-6">{upazila}</td>
                  <td className="py-3 px-6">{village}</td>
                  <td className="py-3 px-6">
                    {donationDate
                      ? new Date(donationDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-6">{phone}</td>
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
