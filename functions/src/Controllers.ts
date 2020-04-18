import * as exp from "express";
import * as bcrypt from "bcryptjs";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as jwt from "jsonwebtoken";
import {
  CareerDto,
  ContactDto,
  UserRegistrationDto,
  UserLoginDto,
  EditUserDetail,
  CheckUserDto,
  LeaveApplicationDto,
} from "./Dto";
import { createToken, JWT_SECRET } from "./Helpers";
import { UserModel } from "./Models";
import { DataStoredInToken } from "Interfaces";
import stringify from "csv-stringify";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export class Controllers {
  public async userRegister(req: exp.Request, res: exp.Response) {
    try {
      const data: UserRegistrationDto = req.body;
      const collection = db.collection("userRecords");

      if (data.password !== data.confirmPassword) {
        res
          .status(400)
          .json({ error: "Password and Confirm Password mismatch!" });
        return;
      }

      const userExists = await collection
        .where("email", "==", data.email)
        .get();

      if (userExists.size > 0) {
        res.status(400).json({ error: "User email already exists" });
        return;
      }

      const hashPassword = await bcrypt.hash(data.password, 12);

      const userData = {
        fullName: data.fullName,
        email: data.email,
        password: hashPassword,
        doj: data.doj,
        department: data.department,
        designation: data.designation,
        role: data.role,
        clientTime: data.clientTime,
        supervisorEmail: data.supervisorEmail,
        timestamp: new Date().toISOString(),
        isActive: data.isActive,
      };

      await collection.add(userData);

      res.status(200).json({ message: "User created" });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async userLogin(req: exp.Request, res: exp.Response) {
    try {
      const data: UserLoginDto = req.body;
      const collection = db.collection("userRecords");

      const user = await collection.where("email", "==", data.email).get();
      if (user.empty) {
        res.status(400).json({ error: "Username or Password is incorrect." });
        return;
      }

      const currentUser: UserModel = user.docs.map((d) => {
        return {
          id: d.id,
          role: d.data().role,
          supervisorEmail: d.data().supervisorEmail,
          isActive: d.data().isActive,
          fullName: d.data().fullName,
          clientTime: d.data().clientTime,
          password: d.data().password,
          designation: d.data().designation,
          department: d.data().department,
          email: d.data().email,
          doj: d.data().doj,
          timestamp: d.data().timestamp,
        };
      })[0];

      if (!currentUser.isActive) {
        res.status(400).json({ error: "This user is not active." });
        return;
      }

      const checkPassword = await bcrypt.compare(
        data.password,
        currentUser.password
      );
      if (!checkPassword) {
        res.status(400).json({ error: "Username or Password is incorrect." });
        return;
      }

      const token = createToken(currentUser.id, currentUser.role);

      res.status(200).json({
        token,
        userData: {
          id: currentUser.id,
          role: currentUser.role,
          supervisorEmail: currentUser.supervisorEmail,
          isActive: currentUser.isActive,
          fullName: currentUser.fullName,
          designation: currentUser.designation,
          department: currentUser.department,
          email: currentUser.email,
          doj: currentUser.doj,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async checkUserStatus(req: exp.Request, res: exp.Response) {
    try {
      const data: CheckUserDto = req.body;
      const collection = db.collection("userRecords");
      const token = data.jwtToken.split(" ")[1];
      let decodedToken: any;

      try {
        decodedToken = jwt.verify(token, JWT_SECRET) as DataStoredInToken;
      } catch (err) {
        res.status(400).json({ error: "Invalid JWT Token" });
        return;
      }

      if (!decodedToken) {
        res.status(400).json({ error: "Unauthorized Access! Wrong Token" });
        return;
      }

      const user = await collection.doc(decodedToken.user_id).get();

      if (!user.exists) {
        res.status(400).json({ error: "Unauthorized Access! Wrong User" });
        return;
      }

      res.status(200).json({
        message: "Okay",
        userData: {
          id: user.id,
          role: user.data()!.role,
          supervisorEmail: user.data()!.supervisorEmail,
          isActive: user.data()!.isActive,
          fullName: user.data()!.fullName,
          designation: user.data()!.designation,
          department: user.data()!.department,
          email: user.data()!.email,
          doj: user.data()!.doj,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async dashBoardInfo(req: exp.Request, res: exp.Response) {
    try {
      const collectionUser = db.collection("userRecords");
      const collectionLeave = db.collection("leaveApplications");

      const userRef = await collectionUser.get();
      const leaveRef = await collectionLeave.get();

      const totalUsers = userRef.docs.filter((d) => d.data().role !== "admin")
        .length;

      const sent = leaveRef.size;
      const approved = leaveRef.docs.filter(
        (d) => d.data().status === "approved"
      ).length;
      const rejected = leaveRef.docs.filter(
        (d) => d.data().status === "rejected"
      ).length;

      res.status(200).json({ totalUsers, sent, approved, rejected });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async listAllUsers(req: exp.Request, res: exp.Response) {
    try {
      const sortBy = req.query.sort ? req.query.sort : "fullName";
      // const limitBy = req.query.limit ? parseInt(req.query.limit, 10) : 10;
      // const nextAfter = req.query.after ? req.query.after : "";

      const collection = db.collection("userRecords").orderBy(sortBy);

      // const total = await collection.get().then((d) => {
      //   return d.size;
      // });

      // const queryRef = await collection
      //   .startAfter(nextAfter)
      //   .limit(limitBy)
      //   .get();

      const queryRef = await collection.get();

      const total = queryRef.size;

      if (queryRef.docs.length <= 0) {
        res.status(200).json({ message: "No Result" });
        return;
      }

      const query = queryRef.docs.map((d) => {
        return {
          id: d.id,
          fullName: d.data().fullName,
          email: d.data().email,
          designation: d.data().designation,
          department: d.data().department,
          isActive: d.data().isActive,
          doj: d.data().doj,
          role: d.data().role,
          supervisorEmail: d.data().supervisorEmail,
        };
      });

      const last = query[query.length - 1].fullName;

      res.status(200).json({ query, pagination: { total, last } });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async getUserDetail(req: exp.Request, res: exp.Response) {
    try {
      const userId = req.params.id;
      const collection = db.collection("userRecords");

      if (!userId) {
        res.status(400).json({ error: "Please give user id" });
        return;
      }

      const userRef = await collection.doc(userId).get();

      const user = {
        id: userRef.id,
        role: userRef.data()!.role,
        supervisorEmail: userRef.data()!.supervisorEmail,
        isActive: userRef.data()!.isActive,
        fullName: userRef.data()!.fullName,
        designation: userRef.data()!.designation,
        department: userRef.data()!.department,
        email: userRef.data()!.email,
        doj: userRef.data()!.doj,
      };

      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async editUserDetail(req: exp.Request, res: exp.Response) {
    try {
      const userId = req.params.id;
      const data: EditUserDetail = req.body;

      const collection = db.collection("userRecords");

      if (!userId) {
        res.status(400).json({ error: "Please give user id" });
        return;
      }

      const userRef = await collection.doc(userId).get();

      if (!userRef.exists) {
        res
          .status(400)
          .json({ error: "Invalid user id / User does not exists" });
        return;
      }

      const userExists = await collection
        .where("email", "==", data.email)
        .get();

      if (userExists.size > 0) {
        const ids = userExists.docs.filter((d) => d.id !== userId);
        if (ids.length > 0) {
          res.status(400).json({ error: "User email already exists" });
          return;
        }
      }

      let hashPassword = userRef.data()!.password;

      if (data.editPassword) {
        if (data.password.length < 8) {
          res
            .status(400)
            .json({ error: "Password and Confirm Password mismatch!" });
          return;
        }
        if (data.password !== data.confirmPassword) {
          res
            .status(400)
            .json({ error: "Password and Confirm Password mismatch!" });
          return;
        }

        hashPassword = await bcrypt.hash(data.password, 12);
      }

      const userData = {
        fullName: data.fullName,
        email: data.email,
        doj: data.doj,
        department: data.department,
        designation: data.designation,
        role: data.role,
        clientTime: data.clientTime,
        supervisorEmail: data.supervisorEmail,
        timestamp: new Date().toISOString(),
        isActive: data.isActive,
        password: hashPassword,
      };

      await collection.doc(userId).set({
        ...userData,
      });

      res.status(200).json({ userId, message: "User Edited" });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async deleteUser(req: exp.Request, res: exp.Response) {
    try {
      const userId = req.params.id;
      const collection = db.collection("userRecords");

      if (!userId) {
        res.status(400).json({ error: "Please give user id" });
        return;
      }

      const userRef = await collection.doc(userId).get();

      if (!userRef.exists) {
        res.status(500).json({ error: "User id Invalid" });
        return;
      }

      const collectionLeaves = db.collection("leaveApplications");
      const leavesRef = await collectionLeaves
        .where("userId", "==", userId)
        .get();

      if (!leavesRef.empty) {
        leavesRef.docs.map(async (d) => {
          await collectionLeaves.doc(d.id).delete();
        });
      }

      await collection.doc(userId).delete();

      res.status(200).json({
        userId,
        message: "User Deleted",
        leaves: leavesRef.size,
      });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async addLeaveApplication(req: exp.Request, res: exp.Response) {
    try {
      let data: LeaveApplicationDto = req.body;
      const collection = db.collection("leaveApplications");

      data = {
        ...data,
        timestamp: new Date().toISOString(),
      };

      const leaveRef = await collection.add(data);
      const leave = await leaveRef.get();

      res.status(200).json({
        message: "Thanks you! will contact you shortly." + leave.id,
      });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async getLeaveApplicationByUserId(
    req: exp.Request,
    res: exp.Response
  ) {
    try {
      const userId = req.params.id;
      const collection = db.collection("leaveApplications").limit(50);

      const leaves = await collection.where("userId", "==", userId).get();

      if (leaves.empty) {
        res.status(200).json({ leaves: [] });
        return;
      }

      const sortData = leaves.docs.sort((a, b) => {
        if (a.data().timestamp > b.data().timestamp) {
          return -1;
        }
        if (a.data().timestamp < b.data().timestamp) {
          return 1;
        }

        return 0;
      });

      const data = sortData.map((d) => {
        return {
          id: d.id,
          userId: d.data().userId,
          status: d.data().status,
          statusRemarks: d.data().statusRemarks,
          leaveDays: d.data().leaveDays,
          clientTime: d.data().clientTime,
          startDate: d.data().startDate,
          endDate: d.data().endDate,
          reason: d.data().reason,
          timestamp: d.data().timestamp,
        };
      });

      res.status(200).json({ leaves: data });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async getAllLeaveApplications(req: exp.Request, res: exp.Response) {
    try {
      const status = req.query.status ? req.query.status : "";
      const empId = req.query.empId ? req.query.empId : "";

      const collection = db.collection("leaveApplications");

      const total = await collection.get().then((d) => {
        return d.size;
      });

      if (total === 0) {
        res.status(200).json({
          allLeaves: [],
          leaveStats: {
            sent: 0,
            approved: 0,
            rejected: 0,
          },
          dayStats: {
            applied: 0,
            approved: 0,
            rejected: 0,
          },
        });
      }

      let leaves: any;

      if (empId !== "all" && status !== "all") {
        leaves = await collection
          .where("userId", "==", empId)
          .where("status", "==", status)
          .get();
      }

      if (empId === "all" && status !== "all") {
        leaves = await collection.where("status", "==", status).get();
      }

      if (empId !== "all" && status === "all") {
        leaves = await collection.where("userId", "==", empId).get();
      }

      if (empId === "all" && status === "all") {
        leaves = await collection.get();
      }

      const sortData = leaves.docs.sort((a: any, b: any) => {
        if (a.data().timestamp > b.data().timestamp) {
          return -1;
        }
        if (a.data().timestamp < b.data().timestamp) {
          return 1;
        }

        return 0;
      });

      const data = sortData.map((d: any) => {
        return {
          id: d.id,
          userId: d.data().userId,
          status: d.data().status,
          statusRemarks: d.data().statusRemarks,
          leaveDays: d.data().leaveDays,
          clientTime: d.data().clientTime,
          startDate: d.data().startDate,
          endDate: d.data().endDate,
          reason: d.data().reason,
          timestamp: d.data().timestamp,
        };
      });

      const sent = data;
      const approved = data.filter((d: any) => d.status === "approved");
      const rejected = data.filter((d: any) => d.status === "rejected");

      const appliedDays = sent.reduce((auc: any, cur: any) => {
        return auc + cur.leaveDays;
        // tslint:disable-next-line: align
      }, 0);

      const approvedDays = approved.reduce((auc: any, cur: any) => {
        return auc + cur.leaveDays;
        // tslint:disable-next-line: align
      }, 0);

      const rejectedDays = rejected.reduce((auc: any, cur: any) => {
        return auc + cur.leaveDays;
        // tslint:disable-next-line: align
      }, 0);

      res.status(200).json({
        allLeaves: data,
        leaveStats: {
          sent: sent.length,
          approved: approved.length,
          rejected: rejected.length,
        },
        dayStats: {
          applied: empId === "all" ? 0 : appliedDays,
          approved: empId === "all" ? 0 : approvedDays,
          rejected: empId === "all" ? 0 : rejectedDays,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async editLeaveApplication(req: exp.Request, res: exp.Response) {
    try {
      const data: LeaveApplicationDto = req.body;
      const leaveId = req.params.id;
      const collection = db.collection("leaveApplications");

      const leaveRef = await collection.doc(leaveId).get();

      if (!leaveRef.exists) {
        res.status(400).json({ error: "Invalid leave application id" });
        return;
      }

      await collection.doc(leaveId).set({
        ...data,
      });

      res.status(200).json({ message: "Leave Application Updated." });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async deleteLeaveApplication(req: exp.Request, res: exp.Response) {
    try {
      const leaveId = req.params.id;
      const collection = db.collection("leaveApplications");

      await collection.doc(leaveId).delete();

      res.status(200).json({ message: "Leave Application Deleted." });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async downloadData(req: exp.Request, res: exp.Response) {
    try {
      const leaveCollection = db.collection("leaveApplications");
      const userCollection = db.collection("userRecords");

      const leaveRef = await leaveCollection.get();
      const userRef = await userCollection.get();

      // let data = [
      //   {
      //     index: 0,
      //     fullName: "",
      //     email: "",
      //     dateOfJoining: "",
      //     department: "",
      //     designation: "",
      //     isActive: "",
      //     role: "",
      //     supervisorEmail: "",
      //     status: "",
      //     statusRemarks: "",
      //     leaveDays: "",
      //     startDate: "",
      //     endDate: "",
      //     reason: "",
      //   },
      // ];

      if (leaveRef.empty) {
        res.status(200).json({ message: "No Leave Data Found" });
        return;
      }

      if (userRef.empty) {
        res.status(200).json({ message: "No User Data Found" });
        return;
      }

      const data = leaveRef.docs.map((leave, i) => {
        const user = userRef.docs.find((u) => u.id === leave.data().userId);
        if (user) {
          return {
            index: i + 1,
            fullName: user.data().fullName,
            email: user.data().email,
            dateOfJoining: user.data().doj,
            department: user.data().department,
            designation: user.data().designation,
            isActive: user.data().isActive,
            role: user.data().role,
            supervisorEmail: user.data().supervisorEmail.join(" - "),
            status:
              leave.data().status === "open" ? "pending" : leave.data().status,
            statusRemarks: leave.data().statusRemarks,
            leaveDays: leave.data().leaveDays,
            startDate: leave.data().startDate,
            endDate: leave.data().endDate,
            reason: leave.data().reason,
          };
        } else {
          return user;
        }
      });

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=\\"download-${Date.now()}.csv\\"`
      );
      res.setHeader("Cache-Control", "no-cache");
      stringify(data, { header: true }).pipe(res);
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async addContact(req: exp.Request, res: exp.Response) {
    try {
      let data: ContactDto = req.body;
      const collection = db.collection("contact");

      data = {
        ...data,
        timestamp: new Date().toISOString(),
      };

      const contactRef = await collection.add(data);
      const contact = await contactRef.get();

      res.status(200).json({
        message: "Thanks you! will contact you shortly." + contact.id,
      });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async addCareer(req: exp.Request, res: exp.Response) {
    try {
      let data: CareerDto = req.body;
      const collection = db.collection("career");

      data = {
        ...data,
        timestamp: new Date().toISOString(),
      };

      const careerRef = await collection.add(data);
      const career = await careerRef.get();

      res
        .status(200)
        .json({ message: "Thanks you! your resume received. " + career.id });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }
}
