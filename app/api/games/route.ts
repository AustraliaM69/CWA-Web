import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playerName, completed, timeUsed, stagesCompleted, score } = body;

    const gameSession = await prisma.gameSession.create({
      data: {
        playerName,
        completed,
        timeUsed,
        stagesCompleted,
        score,
      },
    });

    return NextResponse.json(gameSession);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save game' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const games = await prisma.gameSession.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get games' }, { status: 500 });
  }
}

