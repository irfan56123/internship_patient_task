'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DoctorCard from '@/components/doctors/DoctorCard';
import AppointmentSlot from '@/components/doctors/Appointment';

export default function AppointmentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`/api/doctors/${id}`);
        if (!res.ok) throw new Error('Doctor not found');
        const data = await res.json();
        setDoctor(data);

        // Optional: Fetch dynamic available dates from API later
        setAvailableDates(['13 MON', '14 TUE', '16 WED', '17 THU', '18 FRI']);
      } catch (err) {
        console.error(err);
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDoctor();
  }, [id]);

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) {
      alert('Please select both a date and a time slot.');
      return;
    }

    router.push(
      `/appointment/confirm?doctorId=${doctor.id}&date=${selectedDate}&slot=${selectedSlot}`
    );
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!doctor) return <div className="p-4">Doctor not found</div>;

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto font-sans">
      {/* Back + Heading */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="bg-[#00D2FF] text-white w-8 h-8 rounded-full flex justify-center items-center text-lg"
        >
          ←
        </button>
        <h2 className="text-xl font-bold">Book Appointment</h2>
      </div>

      {/* Doctor Info */}
      <DoctorCard doctor={doctor} />

      {/* Date Selection */}
      <div className="space-y-2">
        <h3 className="font-semibold">Choose Date</h3>
        <p className="text-gray-500">July 2023</p>
        <div className="flex gap-2 flex-wrap">
          {availableDates.map((date, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDate(date)}
              className={`px-3 py-2 rounded-lg ${
                selectedDate === date ? 'bg-[#00D2FF] text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <AppointmentSlot selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />

      {/* Book Button */}
      <button
        onClick={handleBooking}
        className="w-full bg-[#00D2FF] text-white py-3 rounded-lg font-semibold mt-4"
      >
        Book Appointment
      </button>
    </div>
  );
}
