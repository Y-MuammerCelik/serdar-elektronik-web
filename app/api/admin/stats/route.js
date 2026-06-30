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
    const totalReviews = await prisma.review.count();
    const pendingReviews = await prisma.review.count({ where: { approved: false } });
    const approvedReviews = await prisma.review.count({ where: { approved: true } });
    const totalContacts = await prisma.contactRequest.count();
    const newContacts = await prisma.contactRequest.count({ where: { status: 'new' } });

    return NextResponse.json({
      totalReviews,
      pendingReviews,
      approvedReviews,
      totalContacts,
      newContacts,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
