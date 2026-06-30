import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const user = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: 'Geçersiz kullanıcı adı veya şifre' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: 'Geçersiz kullanıcı adı veya şifre' }, { status: 401 });
    }

    // Simple token (in production use JWT)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

    const response = NextResponse.json({ message: 'Giriş başarılı', token });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
