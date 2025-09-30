import { STATUS_CODE } from "@trable/shared";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "@/consts";

export function healthRoute(req: Request, res: Response) {
    res.status(200).json({ status: "ok" });
}

export async function userRoute(req: Request, res: Response) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(STATUS_CODE.UNAUTHORIZED);
    }

    if (!authorizationHeader.startsWith("Bearer ")) {
        return res.status(STATUS_CODE.UNAUTHORIZED);
    }

    const bearerToken = authorizationHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(bearerToken, JWT_SECRET);
        return res.status(STATUS_CODE.OK).json({ payload: decoded });
    } catch (err) {
        return res.status(STATUS_CODE.UNAUTHORIZED);
    }
}
