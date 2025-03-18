import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/options";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const token = jwt.sign({ id: session?.user.id }, process.env.NEXTAUTH_SECRET!);
    return NextResponse.json({
        token
    })
}