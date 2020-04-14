import * as jwt from "jsonwebtoken";
import { DataStoredInToken, TokenData } from "./Interfaces";

export const JWT_SECRET = "Q9jgg6Qy,#vrg~VrVa9'75b9{w5^b?";

export function createToken(userId: string, role: string): TokenData {
  const expiresIn = 3600 * 24 * 100;
  const secret = JWT_SECRET;
  const dataStoredInToken: DataStoredInToken = {
    user_role: role,
    user_id: userId,
  };

  const token = jwt.sign(dataStoredInToken, secret, {
    expiresIn,
    algorithm: "HS512",
    issuer: "YGWEB",
    noTimestamp: true,
  });

  const accessToken = "Bearer " + token;

  return { expiresIn, accessToken };
}
