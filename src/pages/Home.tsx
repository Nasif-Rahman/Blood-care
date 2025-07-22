
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-100 to-white flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Text content */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-red-700 leading-tight">
            Save Lives, <br /> One Drop at a Time
          </h1>
          <p className="text-lg text-gray-700">
            BloodCare is a platform that connects donors with those in urgent need. Be a hero —
            register, search, and donate today.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg shadow-md transition"
            >
              Become a Donor
            </Link>
            <Link
              to="/search"
              className="border border-red-600 text-red-700 hover:bg-red-100 py-3 px-6 rounded-lg transition"
            >
              Find Donors
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center ">
          <img
            src="https://img.graphicsurf.com/2020/08/blood-donation-vector-illustration.webp"
            alt="Blood Donation"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
