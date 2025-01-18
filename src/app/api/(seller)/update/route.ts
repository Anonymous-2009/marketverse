import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
    const data = req.json()
    console.log(data)

    return NextResponse.json({ message : 'working'})
}
