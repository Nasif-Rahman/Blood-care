import { useForm } from 'react-hook-form';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

const RegisterDonor = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await addDoc(collection(db, 'donors'), data);
      alert('Thank you! You are now a registered donor.');
      reset();
    } catch (error) {
      console.error('Error adding donor:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">Become a Donor</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('name', { required: true })}
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Blood Group Dropdown */}
          <select
            {...register('bloodGroup', { required: true })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A−</option>
            <option value="B+">B+</option>
            <option value="B-">B−</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB−</option>
            <option value="O+">O+</option>
            <option value="O-">O−</option>
          </select>

          <input
            {...register('district', { required: true })}
            placeholder="District"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            {...register('phone', { required: true })}
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDonor;
