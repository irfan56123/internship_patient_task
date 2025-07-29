// src/app/api/doctors/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { doctors } from '@/data/doctors';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const doctor = doctors.find((doc) => doc.id === Number(params.id));

  if (!doctor) {
    return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
  }

  return NextResponse.json(doctor);
}
