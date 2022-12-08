import { User } from "@/entities/User";

import { JwtPayload } from "jsonwebtoken";

// to make the file a module and avoid the TypeScript error
export {}

declare global {
  namespace Express {
    export interface Request {
      user?: Omit<User, 'password'> & JwtPayload;
    }
  }
}
