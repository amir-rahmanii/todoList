// pages/api/auth/signup.ts
import dbConnected from '@/configs/db'; // Make sure to import your DB connection
import userModel from '@/model/user'; // Import your user model
import { comparePassword, hashPassword } from '@/utils/auth';
import { generateToken } from '@/utils/auth';
import { NextResponse } from 'next/server';


export const POST = async (req: Request) => {
    await dbConnected();

    try {
        const { idenity, password } = await req.json();

        const userDetails = await userModel.findOne({
            $or: [{ username: idenity }, { email: idenity }]
        })

        if (!userDetails) {
            return NextResponse.json({ message: "User Not Found" }, { status: 404 });
        }

        const isPasswordCheck = await comparePassword(password, userDetails.password);


        if (!isPasswordCheck) {
            return NextResponse.json({ message: "Password or Username is Wrong!!!" }, { status: 422 });
        }


        const token = await generateToken({ email: userDetails.email })

        const response = NextResponse.json({ message: `${userDetails.username}, you have successfully logged in.` }, { status: 200 });
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        return response;

    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}