import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../models/user.model';

interface UserPayload extends JwtPayload {
    data?: string;
}

declare global {
    namespace Express {
        export interface Request{
            jwt?: UserPayload;
            user?: User
        }
    }
}