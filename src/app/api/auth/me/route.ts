// pages/api/auth/signup.ts
import dbConnected from '@/configs/db'; // Make sure to import your DB connection
import userModel from '@/model/user'; // Import your user model
import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/auth';
import { cookies } from 'next/headers';

export const GET = async (req: Request) => {
    await dbConnected();
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: "You are not login" }, { status: 401 });
        }

        const verifyUser = verifyToken(token);

        if (!verifyUser) {
            return NextResponse.json({ message: "You are not login" }, { status: 401 });
        }

        const userDetails = await userModel.findOne({ email: verifyUser.email }, "-password");

        return NextResponse.json(userDetails, { status: 200 });


    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}