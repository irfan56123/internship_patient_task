// ✅ src/app/doctor/[id]/page.tsx (SERVER COMPONENT)
import Link from 'next/link';

type Doctor = {
  id: number;
  name: string;
  image: string;
  specialty: string;
  degrees: string;
  fellowship: string;
  tags: string[];
  bio: string;
  consultingAvailablity: string;
  earliestAppointment: string;
};

interface DoctorDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function DoctorDetails({ params }: DoctorDetailsProps) {
  const { id } = await params; // ✅ Next.js 15 requires awaiting params

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div className="text-center p-10">Doctor not found</div>;
  }

  const doctor: Doctor = await res.json();

  return (
    <div className="p-2 max-w-lg mx-auto">
      {/* Top Header with cyan background */}
      <div className="bg-cyan-400 rounded-t-3xl px-6 py-5 flex items-center gap-5 shadow-md">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-24 h-24 rounded-lg object-cover border-4 border-white"
        />
        <div className="text-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold">Book Appointment</h2>
          <h3 className="text-lg font-semibold mt-1">{doctor.name}</h3>
          <p className="font-semibold">{doctor.specialty}</p>
          <p className="text-sm font-semibold underline mt-1">{doctor.degrees}</p>
          <p className="text-sm mt-1">{doctor.fellowship}</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-b-3xl shadow-md p-6 space-y-6">
        {/* Speciality Tags */}
        <div>
          <h4 className="font-bold mb-2">Speciality</h4>
          <div className="flex flex-wrap gap-2">
            {doctor.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 bg-white-800 rounded-full text-black-800 font-semibold border border-cyan-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* About Doctor */}
        <div>
          <h4 className="font-bold mb-2">About Doctor</h4>
          <p className="text-gray-700/80 text-md font-semibold leading-relaxed">{doctor.bio}</p>
        </div>

        {/* Availability For Consulting */}
        <div>
          <h4 className="font-bold mb-2">Availability For Consulting</h4>
          <p className="text-gray-700/80 text-md font-semibold whitespace-pre-line leading-relaxed">
            {doctor.consultingAvailablity}
          </p>
        </div>

        {/* Earliest Appointment */}
        <div className="flex justify-between items-center bg-blue-50 rounded-xl p-4">
          <div>
            <p className="text-xs text-cyan-500">Earliest Available Appointment</p>
            <p className="text-gray-800 font-semibold">{doctor.earliestAppointment}</p>
          </div>
          <div className="text-blue-500 text-3xl select-none">📅</div>
        </div>

        {/* Book Appointment Button */}
        <Link href={`/appointment/${doctor.id}`}>
          <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-2xl text-lg font-semibold shadow-md transition duration-200">
            Book appointment
          </button>
        </Link>
      </div>
    </div>
  );
}



