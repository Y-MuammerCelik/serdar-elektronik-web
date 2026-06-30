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
    const contact = await prisma.contactRequest.update({
      where: { id: parseInt(id) },
      data: body,
    });
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.contactRequest.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Contact request deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}
