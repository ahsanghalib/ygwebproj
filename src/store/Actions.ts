import {
  AppStatusActionType,
  NextPaginationActionType,
  PageModalActionType,
  PageModelEnum,
  PrevPaginationActionType,
  UserState,
  UserLoginActionType,
  UserLogoutActionType,
  GetAllUsersActionType,
  Pagination,
  TabelPaginationActionType,
  LastActionType,
  LeaveApplicationModel,
  GetLeaveApplicationsByUsersIdActionType,
  ResetStateActionType,
} from "../types";

export function appStatusAction(
  loading: boolean,
  error: boolean,
  responseText: string
): AppStatusActionType {
  return {
    type: "APP STATUS",
    error,
    loading,
    responseText,
  };
}

export function userLoginAction(userdata: UserState): UserLoginActionType {
  return {
    type: "USER LOGIN",
    user: userdata,
  };
}

export function userLogoutAction(): UserLogoutActionType {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
  return {
    type: "LOGOUT",
  };
}

export function getAllUsersAction(all: UserState[]): GetAllUsersActionType {
  return {
    type: "GET ALL USERS",
    allUsers: all,
  };
}

export function lastAction(data: string): LastActionType {
  return {
    type: "LAST ACTION",
    data: data,
  };
}

export function tabelPaginationAction(
  data: Pagination
): TabelPaginationActionType {
  return {
    type: "TABLE PAGINATION",
    data: data,
  };
}

export function pageModalAction(
  show: boolean,
  index: number,
  total: number,
  pageType: PageModelEnum,
  title: string
): PageModalActionType {
  return {
    type: "PAGE MODAL",
    showPageModal: show,
    pageModalType: pageType,
    pageModalTitle: title,
    pageTotal: total,
    pageIndex: index,
  };
}

export function nextPaginationAction(): NextPaginationActionType {
  return {
    type: "NEXT PAGINATION",
  };
}

export function prevPaginationAction(): PrevPaginationActionType {
  return {
    type: "PREV PAGINATION",
  };
}

export function ResetStateAction(): ResetStateActionType {
  return {
    type: "RESET",
  };
}

export function getLeaveApplicationsByUsersIdAction(
  data: LeaveApplicationModel[]
): GetLeaveApplicationsByUsersIdActionType {
  return {
    type: "GET LEAVE APPLICATIONS USER ID",
    data: data,
  };
}
