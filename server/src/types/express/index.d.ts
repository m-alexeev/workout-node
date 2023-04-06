import { JwtPayload } from 'jsonwebtoken';

interface UserPayload extends JwtPayload {
    data?: string;
}

declare global {
    namespace Express {
        export interface Request{
            user?: UserPayload
        }
    }
}