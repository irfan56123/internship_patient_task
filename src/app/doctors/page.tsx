'use client';

import { useEffect, useState } from 'react';
import DoctorCard from '@/components/doctors/DoctorCard';
import Navbar from '@/components/navbar';

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  availablity: string;
  experience: string;
  timing: string;
  image: string;
  bio: string;
  tags: string[];
  degrees: string;
  fellowship: string;
  earliestAppointment: string;
  consultingAvailablity: string[];
};

export default function DoctorPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('/api/doctors');
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="p-6 mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Our Doctors</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}



