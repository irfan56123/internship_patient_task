import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  // Always return success, no validation
  return NextResponse.json({
    message: 'Login successful',
    user: {
      id: 1,
      name: 'Dr. Demo',
      email,
    },
    token: 'mock-token-123', // Optional
  });
}
