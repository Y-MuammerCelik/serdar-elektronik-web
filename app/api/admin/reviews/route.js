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
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
