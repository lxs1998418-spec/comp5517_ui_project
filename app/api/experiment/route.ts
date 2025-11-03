import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ExperimentResult } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { Document } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      version,
      startTime,
      endTime,
      nasatlx,
    } = body;

    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = end.getTime() - start.getTime();
    const confirmationCode = uuidv4().substring(0, 8).toUpperCase();

    const result: ExperimentResult = {
      version,
      startTime: start,
      endTime: end,
      duration,
      confirmationCode,
      nasatlx,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db('ui_experiment');
    // Omit _id when inserting - MongoDB will auto-generate it
    const { _id, ...resultWithoutId } = result;
    await db.collection('results').insertOne(resultWithoutId as Document);

    return NextResponse.json({
      success: true,
      confirmationCode,
    });
  } catch (error) {
    console.error('Error saving experiment result:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save result' },
      { status: 500 }
    );
  }
}

