import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { FaTint, FaMapMarkerAlt, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-10 px-4">
      <h1 className="text-4xl font-extrabold text-red-600 mb-10 text-center drop-shadow-md">
        Donor Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading donors...</p>
      ) : donors.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No donors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {donors.map((donor) => (
            <div
              key={donor.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{donor.name}</h2>
                <span className="text-red-600 font-semibold text-lg flex items-center gap-1">
                  <FaTint className="text-red-500" />
                  {donor.bloodGroup}
                </span>
              </div>
              <div className="space-y-2 text-gray-600 text-sm">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-400" />
                  <strong>Upazila:</strong> {donor.upazila}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-400" />
                  <strong>Village:</strong> {donor.village}
                </p>
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-red-400" />
                  <strong>Last Donation:</strong>{" "}
                  {donor.donationDate
                    ? new Date(donor.donationDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="text-red-400" />
                  <strong>Phone:</strong> {donor.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
