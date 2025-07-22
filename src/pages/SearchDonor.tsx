import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  district: string;
  phone: string;
}

const SearchDonor = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");

  const fetchDonors = async () => {
    const donorsRef = collection(db, "donors");
    let donorQuery = donorsRef;

    // Dynamically build query based on search fields
    if (bloodGroup && district) {
      donorQuery = query(
        donorsRef,
        where("bloodGroup", "==", bloodGroup),
        where("district", "==", district)
      );
    } else if (bloodGroup) {
      donorQuery = query(donorsRef, where("bloodGroup", "==", bloodGroup));
    } else if (district) {
      donorQuery = query(donorsRef, where("district", "==", district));
    }

    const snapshot = await getDocs(donorQuery);
    const donorList: Donor[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Donor[];

    setDonors(donorList);
  };

  useEffect(() => {
    fetchDonors(); // Optional: load all donors initially
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDonors();
  };

  return (
    <div className="section">
      <div className="card">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Search Donors
        </h2>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Blood Group (e.g. A+, O-)"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn">
            Search
          </button>
        </form>

        {donors.length > 0 ? (
          <ul className="space-y-3">
            {donors.map((donor) => (
              <li
                key={donor.id}
                className="bg-white shadow rounded-lg p-4 border border-gray-200"
              >
                <p><strong>Name:</strong> {donor.name}</p>
                <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                <p><strong>District:</strong> {donor.district}</p>
                <p><strong>Phone:</strong> {donor.phone}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No donors found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchDonor;
