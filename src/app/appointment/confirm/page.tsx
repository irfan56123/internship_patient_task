'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ConfirmPage() {
  const params = useSearchParams();
  const doctorId = params.get('doctorId');
  const date = params.get('date');
  const slot = params.get('slot');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    const bookAppointment = async () => {
      if (!doctorId || !date || !slot) return;

      setStatus('loading');
      try {
        const res = await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ doctorId, date, slot }),
        });

        const data = await res.json();
        if (res.ok) {
          setResponse(data);
          setStatus('success');
        } else {
          setResponse(data);
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    };

    bookAppointment();
  }, [doctorId, date, slot]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Confirmation of Appointment</h2>

      {status === 'loading' && <p>Booking your appointment...</p>}

      {status === 'success' && response && (
        <div className="space-y-2">
          <p className="text-green-600 font-medium">{response.message}</p>
          <p><strong>Doctor ID:</strong> {response.appointment.doctorId}</p>
          <p><strong>Date:</strong> {response.appointment.date}</p>
          <p><strong>Slot:</strong> {response.appointment.slot}</p>
          <p><strong>Booked at:</strong> {response.appointment.createdAt}</p>
        </div>
      )}

      {status === 'error' && (
        <p className="text-red-600">Failed to book appointment. Please try again.</p>
      )}
    </div>
  );
}
