import * as exp from "express";
import * as bcrypt from "bcryptjs";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {
  CareerDto,
  ContactDto,
  UserRegistrationDto,
  UserLoginDto,
  EditUserDetail,
  UserPasswordChange,
} from "./Dto";
import { createToken } from "./Helpers";
import { UserModel } from "./Models";

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
        supervisorIds: data.supervisorIds,
        timestamp: new Date().toISOString(),
        isVerified: false,
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
          supervisorIds: d.data().supervisorIds,
          isVerified: d.data().isVerified,
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
          supervisorIds: currentUser.supervisorIds,
          isVerified: currentUser.isVerified,
          fullName: currentUser.fullName,
          clientTime: currentUser.clientTime,
          designation: currentUser.designation,
          department: currentUser.department,
          email: currentUser.email,
          doj: currentUser.doj,
          timestamp: currentUser.timestamp,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err });
      return;
    }
  }

  public async listAllUsers(req: exp.Request, res: exp.Response) {
    try {
      const sortBy = req.query.sort ? req.query.sort : "fullName";
      const limitBy = req.query.limit ? parseInt(req.query.limit, 10) : 10;
      const nextAfter = req.query.after ? req.query.after : "";

      const collection = db.collection("userRecords").orderBy(sortBy);

      const total = await collection.get().then((d) => {
        return d.size;
      });

      const queryRef = await collection
        .startAfter(nextAfter)
        .limit(limitBy)
        .get();

      if (queryRef.docs.length <= 0) {
        res.status(200).json({ message: "No Result" });
        return;
      }

      const query = queryRef.docs.map((d) => {
        return {
          id: d.id,
          ...d.data(),
          fullName: d.data().fullName,
          password: "",
        };
      });

      const last = query[query.length - 1].fullName;

      res.status(200).json({ query, total, last });
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
        ...userRef.data(),
        password: "",
      };

      res.status(200).json({ user, userId });
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

      const userRef = await collection.doc(userId).get();

      const userData = {
        ...userRef.data(),
        fullName: data.fullName,
        email: data.email,
        doj: data.doj,
        department: data.department,
        designation: data.designation,
        role: data.role,
        clientTime: data.clientTime,
        supervisorIds: data.supervisorIds,
        timestamp: new Date().toISOString(),
        isVerified: data.isVerified,
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

  public async userPasswordChange(req: exp.Request, res: exp.Response) {
    try {
      const userId = req.params.id;
      const data: UserPasswordChange = req.body;

      const collection = db.collection("userRecords");

      if (!userId) {
        res.status(400).json({ error: "Please give user id" });
        return;
      }

      if (data.password !== data.confirmPassword) {
        res
          .status(400)
          .json({ error: "Password and Confirm Password mismatch!" });
        return;
      }

      const userRef = await collection.doc(userId).get();
      const hashPassword = await bcrypt.hash(data.password, 12);

      const user = {
        ...userRef.data(),
        password: hashPassword,
      };

      await collection.doc(userId).set({
        ...user,
      });

      res.status(200).json({ userId, message: "Password changed" });
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

      await collection.doc(userId).delete();

      res.status(200).json({ userId, message: "User Deleted" });
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
