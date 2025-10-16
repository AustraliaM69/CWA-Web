import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const game = await prisma.gameSession.findUnique({
      where: { id: parseInt(params.id) },
    });
    
    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }
    
    return NextResponse.json(game);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get game' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    await prisma.gameSession.delete({
      where: { id: parseInt(params.id) },
    });
    
    return NextResponse.json({ message: 'Game deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete game' }, { status: 500 });
  }
}

