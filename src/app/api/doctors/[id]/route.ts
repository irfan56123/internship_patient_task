// src/app/api/doctors/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { doctors } from '@/data/doctors';

export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  const doctor = doctors.find((doc) => doc.id === Number(id));

  if (!doctor) {
    return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
  }

  return NextResponse.json(doctor);
}
