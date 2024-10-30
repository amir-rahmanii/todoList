import dbConnected from '@/configs/db'; // Make sure to import your DB connection
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const POST = async (req: Request) => {
    await dbConnected();
    try {
        const cookieStore = await cookies();
        cookieStore.delete('token')
        return NextResponse.json({message : "Log out successfuly"}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}