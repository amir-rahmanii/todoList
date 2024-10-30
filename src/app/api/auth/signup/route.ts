// pages/api/auth/signup.ts
import dbConnected from '@/configs/db';
import userModel from '@/model/user';
import { hashPassword, generateToken } from '@/utils/auth';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    await dbConnected();

    try {
        const { username, email, password } = await req.json();

        
        // Check if user already exists
        const isUserExist = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserExist) {
            return NextResponse.json({ message: "User email or username already exists." }, { status: 422 });
        }

        const hashedPassword = await hashPassword(password);
        const token = await generateToken({ email });

        // Create user in database
        const createUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        if (createUser) {
            const response = NextResponse.json({ message: `${createUser.username}, you have successfully registered.`}, { status: 201 });
            response.cookies.set({
                name: 'token',
                value: token,
                httpOnly: true,
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });
            return response;
        }

        return NextResponse.json({ message: "User creation failed." }, { status: 400 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
};
