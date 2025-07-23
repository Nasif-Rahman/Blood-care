import type { FC } from 'react';

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  upazila: string;
  village: string;
  donationDate: string;
  phone: string;
}

interface Props {
  donor: Donor;
  onEdit: (donor: Donor) => void;
  onDelete: (id: string) => void;
}

const AdminDonorCard: FC<Props> = ({ donor, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-5 border border-red-200 w-full">
      <h2 className="text-xl font-bold text-red-600 mb-1">{donor.name}</h2>
      <p className="text-sm text-gray-700"><span className="font-semibold">Blood Group:</span> {donor.bloodGroup}</p>
      <p className="text-sm text-gray-700"><span className="font-semibold">Upazila:</span> {donor.upazila || 'N/A'}</p>
      <p className="text-sm text-gray-700"><span className="font-semibold">Village:</span> {donor.village || 'N/A'}</p>
      <p className="text-sm text-gray-700"><span className="font-semibold">Last Donation:</span> {donor.donationDate ? new Date(donor.donationDate).toLocaleDateString() : 'N/A'}</p>
      <p className="text-sm text-gray-700"><span className="font-semibold">Phone:</span> {donor.phone}</p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onEdit(donor)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(donor.id)}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminDonorCard;
