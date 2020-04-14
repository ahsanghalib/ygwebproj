import { NextFunction, Request, RequestHandler, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate, ValidationError } from "class-validator";
import { ClassType } from "class-transformer/ClassTransformer";
import { plainToClass } from "class-transformer";
import { RequestWithUserID, DataStoredInToken } from "./Interfaces";
import { JWT_SECRET } from "./Helpers";

export function validationMiddleware<T>(
  type: ClassType<T>,
  skipMissingProperties = false
): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    const message: string[] = [];
    validate(plainToClass(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          // eslint-disable-next-line array-callback-return
          errors.map((error: ValidationError) => {
            message.push(Object.values(error.constraints).join(", "));
          });
          res.status(400).json({ errors: message });
          return;
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(400).json({ errors: message });
        return;
      });
  };
}

export function isAuth(expReq: Request, res: Response, next: NextFunction) {
  const req = expReq as RequestWithUserID;

  const authHeader = req.get("Authorization");
  const secret = JWT_SECRET;

  if (!authHeader) {
    res.status(400).json({ error: "Unauthorized Access! No Header" });
    return;
  }

  const token = authHeader.split(" ")[1];

  let decodedToken: any;

  try {
    decodedToken = jwt.verify(token, secret) as DataStoredInToken;
  } catch (err) {
    res.status(400).json({ error: "Invalid JWT Token" });
    return;
  }

  if (!decodedToken) {
    res.status(400).json({ error: "Unauthorized Access! Wrong Token" });
    return;
  }

  req.userId = decodedToken.user_id;
  req.userRole = decodedToken.user_role;

  next();
}

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const header = req.get("Authorization");

  if (!header) {
    res.status(400).json({ error: "Header not sent" });
    return;
  }

  const key = header.split(" ")[2];

  const secretKey =
    "$2a$12$2nEhn.w/tpRO8LzX1D7bueNu05.WxZlS6hpBR8AkofGton7R1KWiO";
  if (key !== secretKey) {
    res.status(400).json({ error: "Invalid key" });
    return;
  }
  next();
}
