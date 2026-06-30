import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, deviceType, problem, address } = body;

    if (!name || !phone || !deviceType || !problem) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const contactRequest = await prisma.contactRequest.create({
      data: {
        name,
        phone,
        deviceType,
        problem,
        address: address || '',
      },
    });

    return NextResponse.json({ message: 'Arıza kaydınız oluşturuldu! En kısa sürede sizinle iletişime geçeceğiz.', contactRequest }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact request' }, { status: 500 });
  }
}
