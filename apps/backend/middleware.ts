import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import prismaClient from "db/client"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log("calling");
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({
            message: "Token Not Found"
        })
    }
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload;
    const user = await prismaClient.user.findFirst({
        where: {
            email: decoded.email
        }
    })
    if (user) {
        req.userId = user.Id;
        next();
        return;
    }
    res.status(401).json({
        message: "Forbidden"
    })
}