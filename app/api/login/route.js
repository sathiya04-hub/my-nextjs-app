import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'v9%(!esm*#pc1_aiqzfnxef7w!#p4_upw#&l6q6-==2p_anp+$';

export async function POST(req) {
  const { username, password } = await req.json();

  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}