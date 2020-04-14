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

export interface GetAllUsersActionType extends Action {
  type: "GET ALL USERS";
  allUsers: UserState[];
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

export type AppAction =
  | AppStatusActionType
  | PageModalActionType
  | NextPaginationActionType
  | UserLoginActionType
  | UserLogoutActionType
  | GetAllUsersActionType
  | LastActionType
  | TabelPaginationActionType
  | PrevPaginationActionType;
