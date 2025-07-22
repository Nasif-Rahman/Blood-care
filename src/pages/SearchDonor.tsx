import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  type Query,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../services/firebase";

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  upazila: string;
  village: string;
  phone: string;
  lastDonationDate?: string;
}

const bloodGroups = [
  "",
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
];

const SearchDonor = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [village, setVillage] = useState("");

  const fetchDonors = async () => {
    const donorsRef = collection(db, "donors");
    let donorQuery: Query<DocumentData> = donorsRef;

    if (bloodGroup && village) {
      donorQuery = query(
        donorsRef,
        where("bloodGroup", "==", bloodGroup),
        where("Village", "==", village)  // Capital V for Firestore field
      );
    } else if (bloodGroup) {
      donorQuery = query(donorsRef, where("bloodGroup", "==", bloodGroup));
    } else if (village) {
      donorQuery = query(donorsRef, where("Village", "==", village));  // Capital V
    }

    const snapshot = await getDocs(donorQuery);
    const donorList = snapshot.docs.map((doc) => {
      const data = doc.data();

      // Format donationDate string to readable date
      let formattedDate = "N/A";
      if (data.donationDate) {
        try {
          const dateObj = new Date(data.donationDate);
          formattedDate = dateObj.toLocaleDateString();
        } catch {
          formattedDate = "Invalid Date";
        }
      }

      return {
        id: doc.id,
        name: data.name || "N/A",
        bloodGroup: data.bloodGroup || "N/A",
        upazila: data.Upazila || "N/A",   // Capital U here
        village: data.Village || "N/A",
        phone: data.phone || "N/A",
        lastDonationDate: formattedDate,
      };
    }) as Donor[];

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
    <div className="section max-w-4xl mx-auto p-6">
      <div className="card bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          Search Donors
        </h2>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 mb-8 justify-center"
        >
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="input border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group === "" ? "Select Blood Group" : group}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Village"
            value={village}
            onChange={(e) => setVillage(e.target.value.trim())}
            className="input border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="btn bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition"
          >
            Search
          </button>
        </form>

        {donors.length > 0 ? (
          <ul className="space-y-4">
            {donors.map((donor) => (
              <li
                key={donor.id}
                className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-md hover:shadow-lg transition"
              >
                <p>
                  <strong>Name:</strong> {donor.name}
                </p>
                <p>
                  <strong>Blood Group:</strong> {donor.bloodGroup}
                </p>
                <p>
                  <strong>Upazila:</strong> {donor.upazila}
                </p>
                <p>
                  <strong>Village:</strong> {donor.village}
                </p>
                <p>
                  <strong>Last Donation Date:</strong> {donor.lastDonationDate}
                </p>
                <p>
                  <strong>Phone:</strong> {donor.phone}
                </p>
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
