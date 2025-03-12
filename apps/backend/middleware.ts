import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const authMiddleware = (req : Request,res : Response,next : NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        res.status(401).json({
            message : "Token Not Found"
        })
    }
    const decoded = jwt.verify(token!,process.env.JWT_SECRET!);
    next();
}