import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  return !!token;
}

export async function PATCH(request, { params }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const review = await prisma.review.update({
      where: { id: parseInt(id) },
      data: body,
    });
    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.review.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Review deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
