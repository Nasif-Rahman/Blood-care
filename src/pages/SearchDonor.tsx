import React, { useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  type DocumentData,
  type Query,
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

const bloodGroups = ["", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const SearchDonor = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [village, setVillage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // new flag

  const fetchDonors = async () => {
    setLoading(true);
    setHasSearched(true);

    const donorsRef = collection(db, "donors");
    let donorQuery: Query<DocumentData> = donorsRef;

    const filters = [];

    if (bloodGroup) {
      filters.push(where("bloodGroup", "==", bloodGroup.toUpperCase()));
    }

    if (village) {
      filters.push(where("Village", "==", village.trim()));
    }

    if (filters.length > 0) {
      donorQuery = query(donorsRef, ...filters);
    }

    try {
      const snapshot = await getDocs(donorQuery);
      const donorList = snapshot.docs.map((doc) => {
        const data = doc.data();

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
          upazila: data.Upazila || "N/A",
          village: data.Village || "N/A",
          phone: data.phone || "N/A",
          lastDonationDate: formattedDate,
        };
      });

      setDonors(donorList);
    } catch (error) {
      console.error("Error fetching donors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bloodGroup && !village) {
      alert("Please select a blood group or enter a village.");
      return;
    }

    fetchDonors();
  };

  return (
    <div className="section max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 border border-red-200">
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
            className="border border-gray-300 rounded-md p-3 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-500"
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
            onChange={(e) => setVillage(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition w-full sm:w-auto"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-center text-gray-600">Loading donors...</p>}

        {!loading && hasSearched && (
          donors.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map((donor) => (
                <div
                  key={donor.id}
                  className="bg-red-50 border border-red-300 rounded-xl p-5 shadow hover:shadow-lg transition-all"
                >
                  <p><strong>Name:</strong> {donor.name}</p>
                  <p><strong>Blood Group:</strong> <span className="text-red-600 font-bold">{donor.bloodGroup}</span></p>
                  <p><strong>Upazila:</strong> {donor.upazila}</p>
                  <p><strong>Village:</strong> {donor.village}</p>
                  <p><strong>Last Donation Date:</strong> {donor.lastDonationDate}</p>
                  <p><strong>Phone:</strong> <a href={`tel:${donor.phone}`} className="text-blue-600 underline">{donor.phone}</a></p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No donors found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchDonor;
