import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { JwtPayload } from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";
import { User } from "../models/user.model";

dotenv.config();

const fetchToken = (headers: IncomingHttpHeaders): string | undefined => {
    const authHeader = headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    return token;
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    // Get JWT from header
    const token = fetchToken(req.headers);
    // Check for token
    if (token === undefined) {
        return res.status(401).json({
            message: "Token is missing or invalid"
        })
    }

    // Verify user from the token
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, data) => {
        if (!!err) {
            return res.status(401).json(err)
        }
        const email = (data as JwtPayload).data
        // fetch user 
        User.findOne({where: {email: email}}).then(user => {
            if (user === null){
                return res.status(401).json({message: "User does not exist"})
            }
            req.user = user;
            next();
        }).catch(e => {
            console.log(e)
            return res.status(500).json({message: "Failed fetching user"});
        })
    })
}

export { authenticateUser }