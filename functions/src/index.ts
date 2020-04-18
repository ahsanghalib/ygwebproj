import * as functions from "firebase-functions";
import express, { Request, Response } from "express";
import cors from "cors";
import { validationMiddleware, isAuth, checkApiKey } from "./Middleware";
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
  checkApiKey,
  validationMiddleware(UserRegistrationDto),
  controllers.userRegister
);

routes.post(
  "/login",
  checkApiKey,
  validationMiddleware(UserLoginDto),
  controllers.userLogin
);

routes.post("/checkUserStatus", checkApiKey, controllers.checkUserStatus);

routes.get("/allUsers", checkApiKey, isAuth, controllers.listAllUsers);

routes.get("/getUser/:id", checkApiKey, isAuth, controllers.getUserDetail);

routes.post(
  "/editUser/:id",
  checkApiKey,
  isAuth,
  validationMiddleware(EditUserDetail),
  controllers.editUserDetail
);

routes.delete("/deleteUser/:id", checkApiKey, isAuth, controllers.deleteUser);

routes.get("/dashBoardInfo", checkApiKey, isAuth, controllers.dashBoardInfo);

routes.post(
  "/addLeaveApplication",
  checkApiKey,
  isAuth,
  controllers.addLeaveApplication
);

routes.get(
  "/getLeaveApplicationByUserId/:id",
  checkApiKey,
  isAuth,
  controllers.getLeaveApplicationByUserId
);

routes.get(
  "/getAllLeaveApplications",
  checkApiKey,
  isAuth,
  controllers.getAllLeaveApplications
);

routes.post(
  "/editLeaveApplication/:id",
  checkApiKey,
  isAuth,
  controllers.editLeaveApplication
);

routes.delete(
  "/deleteLeaveApplication/:id",
  checkApiKey,
  isAuth,
  controllers.deleteLeaveApplication
);

routes.post(
  "/contact",
  checkApiKey,
  validationMiddleware(ContactDto),
  controllers.addContact
);

routes.post(
  "/career",
  checkApiKey,
  validationMiddleware(CareerDto),
  controllers.addCareer
);

routes.get('/downloadData', checkApiKey, isAuth, controllers.downloadData)

app.use(routes);

export const api = functions.https.onRequest(app);
