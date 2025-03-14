import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken"

export const GET = async (req: NextRequest) => {
    const user_data = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! })
    const jwt_token = jwt.sign({ email: user_data?.email }, process.env.NEXTAUTH_SECRET!);
    return NextResponse.json({ jwt_token })
}