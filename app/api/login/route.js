import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_super_secret_key';

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}