import * as functions from "firebase-functions";
import express, { Request, Response } from "express";
import cors from "cors";
import { validationMiddleware, isAuth } from "./Middleware";
import {
  CareerDto,
  ContactDto,
  UserRegistrationDto,
  UserLoginDto,
  EditUserDetail,
  UserPasswordChange,
} from "./Dto";
import { Controllers } from "./Controllers";
import { RequestWithUserID } from "./Interfaces";

const app = express();
const routes = express.Router();
const controllers = new Controllers();

app.use(cors({ origin: true }));
app.use(express.json());

routes.get("/hello", isAuth, (expReq: Request, res: Response) => {
  const req = expReq as RequestWithUserID;
  res
    .status(200)
    .json({ message: "Hello World! " + req.userId + " " + req.userRole });
});

routes.post(
  "/register",
  validationMiddleware(UserRegistrationDto),
  controllers.userRegister
);

routes.post(
  "/login",
  validationMiddleware(UserLoginDto),
  controllers.userLogin
);

routes.get("/allUsers", controllers.listAllUsers);

routes.get("/getUser/:id", controllers.getUserDetail);

routes.post(
  "/editUser/:id",
  validationMiddleware(EditUserDetail),
  controllers.editUserDetail
);

routes.post(
  "/editPassword/:id",
  validationMiddleware(UserPasswordChange),
  controllers.userPasswordChange
);

routes.delete("/deleteUser/:id", controllers.deleteUser);

routes.post(
  "/contact",
  validationMiddleware(ContactDto),
  controllers.addContact
);

routes.post("/career", validationMiddleware(CareerDto), controllers.addCareer);

app.use(routes);

export const api = functions.https.onRequest(app);
