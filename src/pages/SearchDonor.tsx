import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  district: string;
  phone: string;
}

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonor = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [searchGroup, setSearchGroup] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");

  const fetchDonors = async () => {
    let donorsQuery = collection(db, "donors");

    let q = donorsQuery;
    if (searchGroup && searchDistrict) {
      q = query(donorsQuery,
        where("bloodGroup", "==", searchGroup),
        where("district", "==", searchDistrict)
      );
    } else if (searchGroup) {
      q = query(donorsQuery, where("bloodGroup", "==", searchGroup));
    } else if (searchDistrict) {
      q = query(donorsQuery, where("district", "==", searchDistrict));
    }

    const snapshot = await getDocs(q);
    const donorList: Donor[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Donor[];
    setDonors(donorList);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDonors();
  };

  return (
    <div className="section">
      <div className="card">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Search Donors</h2>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={searchGroup}
            onChange={(e) => setSearchGroup(e.target.value)}
            className="input"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="District"
            value={searchDistrict}
            onChange={(e) => setSearchDistrict(e.target.value)}
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
