import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"

export const isUserAuthenticated = async (req: Request, res: Response, nextFunc: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const user = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload;
    req.user = {id : user.id}
    nextFunc()
}

declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string;
            }
        }
    }
}
