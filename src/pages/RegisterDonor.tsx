import { useForm, Controller } from 'react-hook-form';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

type FormData = {
  name: string;
  bloodGroup: string;
  Upazila: string;
  Village: string;
  phone: string;
  donationDate: Date | null;
};

const RegisterDonor = () => {
  const { register, handleSubmit, reset, control } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await addDoc(collection(db, 'donors'), {
        ...data,
        donationDate: data.donationDate?.toISOString() || null,
      });
      alert('Thank you! You are now a registered donor.');
      reset();
    } catch (error) {
      console.error('Error adding donor:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
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
            className="input"
          />

          <select
            {...register('bloodGroup', { required: true })}
            className="input"
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
            {...register('Upazila', { required: true })}
            placeholder="Upazila"
            className="input"
          />

          <input
            {...register('Village', { required: true })}
            placeholder="Village"
            className="input"
          />

          <input
            {...register('phone', { required: true })}
            placeholder="Phone Number"
            className="input"
          />

          {/* 📅 Donation Date Picker */}
          <Controller
            control={control}
            name="donationDate"
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select Last Donation Date"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                className="input"
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                showPopperArrow={false}
              />
            )}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors"
          >
            {loading ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDonor;
