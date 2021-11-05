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

routes.post("/checkUserStatus", controllers.checkUserStatus);

routes.get("/allUsers", isAuth, controllers.listAllUsers);

routes.get("/getUser/:id", isAuth, controllers.getUserDetail);

routes.post(
  "/editUser/:id",
  isAuth,
  validationMiddleware(EditUserDetail),
  controllers.editUserDetail
);

routes.delete("/deleteUser/:id", isAuth, controllers.deleteUser);

routes.get("/dashBoardInfo", isAuth, controllers.dashBoardInfo);

routes.post("/addLeaveApplication", isAuth, controllers.addLeaveApplication);

routes.get(
  "/getLeaveApplicationByUserId/:id",
  isAuth,
  controllers.getLeaveApplicationByUserId
);

routes.get(
  "/getAllLeaveApplications",
  isAuth,
  controllers.getAllLeaveApplications
);

routes.post(
  "/editLeaveApplication/:id",
  isAuth,
  controllers.editLeaveApplication
);

routes.delete(
  "/deleteLeaveApplication/:id",
  isAuth,
  controllers.deleteLeaveApplication
);

routes.post(
  "/contact",
  validationMiddleware(ContactDto),
  controllers.addContact
);

routes.post("/career", validationMiddleware(CareerDto), controllers.addCareer);

routes.get("/downloadData", isAuth, controllers.downloadData);

app.use(routes);

export const api = functions.https.onRequest(app);
