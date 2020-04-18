import { ThunkAction } from "redux-thunk";
import { AppAction, AppState, LoginForm, UserFormModel } from "../types";
import {
  appStatusAction,
  userLoginAction,
  userLogoutAction,
  getAllUsersAction,
  tabelPaginationAction,
  lastAction,
  getLeaveApplicationsByUsersIdAction,
  ResetStateAction,
  GetDashBoardInfoAction,
  getAllLeaveApplicationsAdminAction,
} from "./Actions";
import { axiosClient, axiosWithAuth } from "../helpers";

type Effect = ThunkAction<any, AppState, any, AppAction>;

function checkAuthTimeOut(expTime: number): Effect {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(UserLogout());
    }, expTime);
  };
}

export function checkAuthState(): Effect {
  return function (dispatch) {
    dispatch(appStatusAction(true, false, "CHECK_AUTH"));
    const accessToken = localStorage.getItem("token") || "";
    if (!accessToken) {
      dispatch(UserLogout());
    } else {
      const expiresIn = localStorage.getItem("expiresIn") || "0";
      const expirationDate = new Date(parseInt(expiresIn));
      if (expirationDate < new Date()) {
        dispatch(UserLogout());
      } else {
        const data = { jwtToken: accessToken };
        axiosClient()
          .post("/checkUserStatus", data)
          .then((res) => {
            dispatch(userLoginAction(res.data.userData));
            dispatch(appStatusAction(false, false, ""));
          })
          .catch((err) => {
            if (err.message) {
              dispatch(appStatusAction(false, true, err.message));
              dispatch(UserLogout());
            } else {
              dispatch(appStatusAction(false, true, err.response.data.error));
              dispatch(UserLogout());
            }
          });
        dispatch<any>(
          checkAuthTimeOut(expirationDate.getTime() - new Date().getTime())
        );
      }
    }
  };
}

export function UserLogin(data: LoginForm): Effect {
  return function (dispatch) {
    dispatch(appStatusAction(true, false, "Login Action"));
    axiosClient()
      .post("/login", data)
      .then((res) => {
        const expirationDate = new Date().getTime() + res.data.token.expiresIn;
        localStorage.setItem("token", res.data.token.accessToken);
        localStorage.setItem("expiresIn", expirationDate.toString());
        dispatch(userLoginAction(res.data.userData));
        dispatch(appStatusAction(false, false, ""));
        dispatch(lastAction("User Login"));
      })
      .catch((err) => {
        if (err.response.data) {
          dispatch(appStatusAction(false, true, err.response.data.error));
        } else {
          dispatch(appStatusAction(false, true, err.message));
        }
      });
  };
}

export function UserLogout(): Effect {
  return function (dispatch) {
    dispatch(userLogoutAction());
    dispatch(appStatusAction(false, false, ""));
    dispatch(lastAction("User Logout"));
    dispatch(ResetStateAction());
  };
}

export function getAllUsersList(): Effect {
  return function (dispatch) {
    dispatch(appStatusAction(true, false, "Loading All Users"));
    axiosWithAuth()
      .get(`/allUsers`)
      .then((res) => {
        dispatch(appStatusAction(true, false, ""));
        dispatch(tabelPaginationAction(res.data.pagination));
        dispatch(getAllUsersAction(res.data.query));
        dispatch(appStatusAction(false, false, ""));
      })
      .catch((err) => {
        if (err.response.data) {
          dispatch(appStatusAction(false, true, err.response.data.error));
        } else {
          dispatch(appStatusAction(false, true, err.message));
        }
      });
  };
}

export function deleteUser(userId: string): Effect {
  return function (dispatch) {
    dispatch(appStatusAction(true, false, "Deleting Employee"));
    axiosWithAuth()
      .delete(`/deleteUser/${userId}`)
      .then((res) => {
        dispatch(getAllUsersList());
        dispatch(appStatusAction(false, false, ""));
        dispatch(lastAction(res.data.message));
      })
      .catch((err) => {
        if (err.response.data) {
          dispatch(appStatusAction(false, true, err.response.data.error));
        } else {
          dispatch(appStatusAction(false, true, err.message));
        }
      });
  };
}

// NOT IN USE
export function addEmployee(data: UserFormModel): Effect {
  return function (dispatch) {
    dispatch(appStatusAction(true, false, "Adding Employee"));
    const record = {
      ...data,
      clientTime: new Date().toString(),
    };
    axiosWithAuth()
      .post("/register", record)
      .then((res) => {
        dispatch(lastAction(res.data.message));
        dispatch(appStatusAction(false, false, ""));
      })
      .catch((err) => {
        if (err.response.data) {
          dispatch(appStatusAction(false, true, err.response.data.error));
        } else {
          dispatch(appStatusAction(false, true, err.message));
        }
      });
  };
}

// NOT IN USE...
export function editEmployee(data: UserFormModel, id: string | number): Effect {
  return function (dispatch) {
    dispatch(appStatusAction(true, false, "Editing Employee"));
    const record = {
      ...data,
      clientTime: new Date().toString(),
    };
    axiosWithAuth()
      .post(`/editUser/${id}`, record)
      .then((res) => {
        dispatch(lastAction(res.data.message));
        dispatch(appStatusAction(false, false, ""));
      })
      .catch((err) => {
        if (err.response.data) {
          dispatch(appStatusAction(false, true, err.response.data.error));
        } else {
          dispatch(appStatusAction(false, true, err.message));
        }
      });
  };
}

export function getEmployee(id: string | number): Effect {
  return function (dispatch) {
    dispatch(appStatusAction(true, false, "Get Update"));
    axiosWithAuth()
      .get(`/getUser/${id}`)
      .then((res) => {
        // dispatch(lastAction(res.data.message));
        dispatch(userLoginAction(res.data.user));
        dispatch(appStatusAction(false, false, ""));
      })
      .catch((err) => {
        if (err.response.data) {
          dispatch(appStatusAction(false, true, err.response.data.error));
        } else {
          dispatch(appStatusAction(false, true, err.message));
        }
      });
  };
}

export function leaveApplicationsByUserId(userId: string): Effect {
  return function (dispatch) {
    dispatch(appStatusAction(true, false, "Get Leave Applications"));
    axiosWithAuth()
      .get(`/getLeaveApplicationByUserId/${userId}`)
      .then((res) => {
        dispatch(getLeaveApplicationsByUsersIdAction(res.data.leaves));
        dispatch(appStatusAction(false, false, ""));
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          dispatch(appStatusAction(false, true, err.response.data.error));
        } else {
          dispatch(appStatusAction(false, true, err.message));
        }
      });
  };
}

export function dashBoardInfoGet(): Effect {
  return function (dispatch) {
    dispatch(appStatusAction(true, false, "Get Dashboard Inof"));
    axiosWithAuth()
      .get(`/dashBoardInfo`)
      .then((res) => {
        dispatch(GetDashBoardInfoAction(res.data));
        dispatch(appStatusAction(false, false, ""));
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          dispatch(appStatusAction(false, true, err.response.data.error));
        } else {
          dispatch(appStatusAction(false, true, err.message));
        }
      });
  };
}

export function getAllLeaveApplicationsAdmin(
  userId: string,
  status: string
): Effect {
  return function (dispatch) {
    dispatch(appStatusAction(true, false, "Getting data... "));
    axiosWithAuth()
      .get(`/getAllLeaveApplications?empId=${userId}&status=${status}`)
      .then((res) => {
        dispatch(
          getAllLeaveApplicationsAdminAction(res.data.allLeaves, {
            leaves: res.data.leaveStats,
            days: res.data.dayStats,
          })
        );
        dispatch(appStatusAction(false, false, ""));
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          dispatch(appStatusAction(false, true, err.response.data.error));
        } else {
          dispatch(appStatusAction(false, true, err.message));
        }
      });
  };
}

export function deleteLeaveApplication(
  leaveId: string,
  userId: string,
  status: string
): Effect {
  return function (dispatch) {
    dispatch(appStatusAction(true, false, "Deleting Employee"));
    axiosWithAuth()
      .delete(`/deleteLeaveApplication/${leaveId}`)
      .then((res) => {
        dispatch(getAllLeaveApplicationsAdmin(userId, status));
        dispatch(dashBoardInfoGet());
        dispatch(appStatusAction(false, false, ""));
        dispatch(lastAction(res.data.message));
      })
      .catch((err) => {
        if (err.response.data) {
          dispatch(appStatusAction(false, true, err.response.data.error));
        } else {
          dispatch(appStatusAction(false, true, err.message));
        }
      });
  };
}
