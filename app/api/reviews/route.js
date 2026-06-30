import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, text, rating } = body;

    if (!name || !text || !rating) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        name,
        text,
        rating: parseInt(rating),
        approved: false,
      },
    });

    return NextResponse.json({ message: 'Yorumunuz onay bekliyor. Teşekkürler!', review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
