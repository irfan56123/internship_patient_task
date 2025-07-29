// src/app/api/appointments/route.ts
import { NextRequest, NextResponse } from 'next/server';

let appointments: any[] = []; // in-memory store

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.doctorId || !body.date || !body.slot) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const newAppointment = {
    id: appointments.length + 1,
    doctorId: body.doctorId,
    date: body.date,
    slot: body.slot,
    createdAt: new Date().toISOString(),
  };

  appointments.push(newAppointment);

  return NextResponse.json({
    message: 'Appointment booked successfully!',
    appointment: newAppointment,
  });
}
