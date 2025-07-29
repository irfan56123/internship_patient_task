
'use client';

import Link from 'next/link';

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

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link href={`/doctor/${doctor.id}`}>
      <div className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-center cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h3 className="text-lg font-bold">{doctor.name}</h3>
          <p className="text-[#00D2FF] font-semibold">{doctor.specialty}</p>
          <p className="border bg-green-400/40 rounded-xl font-semibold text-green-700 text-sm w-30 pl-2">
            {doctor.availablity}
          </p>
          <p className="text-sm text-black/60 mt-1">{doctor.experience}</p>
          <p className="rounded-xl bg-gray-400/30 text-sm w-35 pl-2 mt-2">
            {doctor.timing}
          </p>
        </div>
      </div>
    </Link>
  );
}

