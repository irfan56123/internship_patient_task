// src/app/api/doctors/route.ts
import { NextResponse } from 'next/server';
import { doctors } from '@/data/doctors';

export async function GET() {
  return NextResponse.json(doctors);
}
