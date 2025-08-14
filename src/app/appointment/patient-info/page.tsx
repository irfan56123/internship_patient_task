'use client';

import React, { useState } from 'react';

export default function PatientInfoPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [tokenNumber, setTokenNumber] = useState<number | null>(null);
  const [gender, setGender] = useState<string>('Male');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedToken = Math.floor(1000 + Math.random() * 9000);
    setTokenNumber(generatedToken);
    setShowPopup(true);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white">
      {/* Patient Info Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        🩺 Patient Info
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        Fill out the details below to proceed with your appointment booking.
      </p>

      {/* Patient Details Section */}
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Patient Details <span className="text-gray-400 text-sm">(Optional)</span>
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none"
          placeholder="Patient Name"
        />

        <div className="flex items-center gap-3">
          <input
            type="number"
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Age"
          />
          <div className="flex gap-2">
            {['Male', 'Female', 'Other'].map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setGender(g)}
                className={`px-4 py-2 rounded-lg border ${
                  gender === g
                    ? 'bg-[#00D2FF] text-white border-[#00D2FF]'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <textarea
          className="w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none"
          rows={3}
          placeholder="Write your problem"
        />

        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none"
          placeholder="Brother/sister/mother"
        />

        <input
          type="tel"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none"
          placeholder="Mobile number"
        />

        <button
          type="button"
          className="w-full border border-[#00D2FF] text-[#00D2FF] py-3 rounded-lg font-medium"
        >
          Make Payment
        </button>

        <button
          type="submit"
          className="w-full bg-[#00D2FF] hover:bg-[#00aadd] text-white py-3 rounded-lg font-medium"
        >
          Add Patient Details
        </button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center relative">
            <img
              src="https://cdn-icons-png.freepik.com/512/4322/4322991.png"
              alt="Success"
              className="w-28 h-28 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">
              Appointment Booked <br /> Successfully !
            </h2>
            <p className="mt-3 text-lg">
              Token No{' '}
              <span className="text-[#00D2FF] font-semibold cursor-pointer">
                {tokenNumber}
              </span>
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              You will receive a notification 30 mins before as a reminder. Thank you...
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-5 px-6 py-2 bg-[#00D2FF] hover:bg-[#00aadd] text-white rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



