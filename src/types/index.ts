import { Action } from "redux";

// Webportal Modals
export interface LoginForm {
  email: string;
  password: string;
}

export interface LeaveApplication {
  startDate: Date | null | string;
  endDate: Date | null | string;
  reason: string;
}

export interface UserFormModel {
  fullName: string;
  email: string;
  doj: string | null | Date;
  department: string;
  designation: string;
  isActive: boolean;
  role: string;
  supervisorEmail: string[];
  password: string;
  confirmPassword: string;
  editPassword: boolean;
}

export interface LeaveApplicationModel extends LeaveApplication {
  id: string;
  userId: string;
  emailSentId: string;
  status: string;
  statusRemarks: string;
  leaveDays: number;
  clientTime: string;
  timestamp: string;
}

// App store types
export enum PageModelEnum {
  mange = "MANAGEMENT PAGE",
  prod = "PRODUCT PAGE",
  com = "COMPANY PAGE",
  NONE = "NONE",
}

export interface UserState {
  id: string;
  fullName: string;
  email: string;
  doj: string | null | Date;
  department: string;
  designation: string;
  isActive: boolean;
  role: string;
  supervisorEmail: string[];
}

export interface Pagination {
  total: number; // maped to count of matrial pagination
  last: string;
}

export interface DashboardInfo {
  totalUsers: number;
  sent: number;
  approved: number;
  rejected: number;
}

export interface UserLeaveStats {
  leaves: {
    sent: number;
    approved: number;
    rejected: number;
  };
  days: {
    applied: number;
    approved: number;
    rejected: number;
  };
}

export interface IBusinessData {
  id: string;
  detail: string;
  imgAlt: string;
  logoUrl: string;
  slog: string;
  title: string;
}

export interface IManagementData {
  designation: string;
  full: string;
  id: string;
  img: string;
  name: string;
  quote: string;
}

export interface IValueData {
  desc: string;
  title: string;
}

export interface IHistoryData {
  title: string;
  data: string;
}

export interface IToEmail {
  name: string;
  email: string;
}

export interface AppState {
  loading: boolean;
  error: boolean;
  responseText: string;
  showPageModal: boolean;
  pageIndex: number;
  pageTotal: number;
  pageModalType: PageModelEnum;
  pageModalTitle: string;
  currentUser: UserState;
  allUsers: UserState[];
  pagination: Pagination;
  lastAction: string;
  listLeaveApplications: LeaveApplicationModel[];
  dashBoardInfo: DashboardInfo;
  userLeaveStats: UserLeaveStats;
  businessData: IBusinessData[];
  managementData: IManagementData[];
  valuesData: IValueData[];
  historyData: IHistoryData;
  backend: string;
  formEmailTo: IToEmail[];
}

export interface AppStateType {
  mainStore: AppState;
}

// App action types
export interface AppStatusActionType extends Action {
  type: "APP STATUS";
  loading: boolean;
  error: boolean;
  responseText: string;
}

export interface UserLoginActionType extends Action {
  type: "USER LOGIN";
  user: UserState;
}

export interface UserLogoutActionType extends Action {
  type: "LOGOUT";
}

export interface ResetStateActionType extends Action {
  type: "RESET";
}

export interface GetAllUsersActionType extends Action {
  type: "GET ALL USERS";
  allUsers: UserState[];
}

export interface GetLeaveApplicationsByUsersIdActionType extends Action {
  type: "GET LEAVE APPLICATIONS USER ID";
  data: LeaveApplicationModel[];
}

export interface GetAllLeaveApplicationsAdminActionType extends Action {
  type: "LEAVE APPLICATIONS ADMIN";
  data: LeaveApplicationModel[];
  stats: UserLeaveStats;
}

export interface LastActionType extends Action {
  type: "LAST ACTION";
  data: string;
}

export interface TabelPaginationActionType extends Action {
  type: "TABLE PAGINATION";
  data: Pagination;
}

export interface PageModalActionType extends Action {
  type: "PAGE MODAL";
  showPageModal: boolean;
  pageIndex: number;
  pageTotal: number;
  pageModalType: PageModelEnum;
  pageModalTitle: string;
}

export interface NextPaginationActionType extends Action {
  type: "NEXT PAGINATION";
}

export interface PrevPaginationActionType extends Action {
  type: "PREV PAGINATION";
}

export interface GetDashBoardInfoActionType extends Action {
  type: "DASHBOARD DATA";
  data: DashboardInfo;
}

export interface GetHomePageDataActionType extends Action {
  type: "HOME PAGE DATA";
  businessData: IBusinessData[];
  managementData: IManagementData[];
  valueData: IValueData[];
  historyData: IHistoryData;
  backend: string;
  formEmailTo: IToEmail[];
}

export type AppAction =
  | AppStatusActionType
  | GetAllLeaveApplicationsAdminActionType
  | GetHomePageDataActionType
  | PageModalActionType
  | NextPaginationActionType
  | UserLoginActionType
  | UserLogoutActionType
  | GetAllUsersActionType
  | LastActionType
  | GetDashBoardInfoActionType
  | ResetStateActionType
  | GetLeaveApplicationsByUsersIdActionType
  | TabelPaginationActionType
  | PrevPaginationActionType;

export const DefaultToEmail: IToEmail[] = [
  {
    email: "yaqoobgroupweb@gmail.com",
    name: "Yaqoob Group Web",
  },
];
