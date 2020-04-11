import { Request } from "express";

export interface RequestWithUserID extends Request {
  userId: string;
  userRole: string;
}

export interface TokenData {
  expiresIn: number;
  accessToken: string;
}

export interface DataStoredInToken {
  user_id: string;
  user_role: string;
}
