import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  return !!token;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const contacts = await prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}
