export class UserModel {
  public id: string;
  public fullName: string;
  public email: string;
  public password: string;
  public doj: string;
  public department: string;
  public designation: string;
  public role: string;
  public supervisorEmail: string[];
  public clientTime: string;
  public isActive: boolean;
  public timestamp: string;
}
