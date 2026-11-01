import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();
  let dbStatus = 'disconnected';

  try {
    await connectToDatabase();
    const readyState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };
    dbStatus = states[readyState] || 'unknown';
  } catch (error) {
    dbStatus = `error: ${error.message}`;
  }

  const responseTimeMs = Date.now() - startTime;

  const isHealthy = dbStatus === 'connected';

  return NextResponse.json(
    {
      status: isHealthy ? 'healthy' : 'degraded',
      service: 'SwasthyaTap Hospital Workstation Portal',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      database: {
        status: dbStatus,
        latencyMs: responseTimeMs,
      },
      version: '1.0.0',
    },
    {
      status: isHealthy ? 200 : 503,
    }
  );
}
