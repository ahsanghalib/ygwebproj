import produce from "immer";
import { AppAction, AppState, PageModelEnum } from "../types";

const initialState: AppState = {
  pageIndex: 0,
  pageTotal: 0,
  pageModalTitle: "",
  pageModalType: PageModelEnum.NONE,
  showPageModal: false,
  loading: false,
  error: false,
  responseText: "",
  currentUser: {
    department: "",
    designation: "",
    doj: "",
    email: "",
    fullName: "",
    id: "",
    isActive: false,
    role: "",
    supervisorEmail: [""],
  },
  allUsers: [],
  pagination: {
    last: "",
    total: 0,
  },
  lastAction: "",
  listLeaveApplications: [],
  dashBoardInfo: {
    approved: 0,
    rejected: 0,
    sent: 0,
    totalUsers: 0,
  },
  userLeaveStats: {
    days: {
      applied: 0,
      approved: 0,
      rejected: 0,
    },
    leaves: {
      approved: 0,
      rejected: 0,
      sent: 0,
    },
  },
  businessData: [],
  managementData: [],
  historyData: {
    data: "",
    title: "",
  },
  valuesData: [],
};

function Reducer(state = initialState, action: AppAction) {
  switch (action.type) {
    case "APP STATUS":
      return produce(state, (draft) => {
        draft.error = action.error;
        draft.loading = action.loading;
        draft.responseText = action.responseText;
      });
    case "USER LOGIN":
      return produce(state, (draft) => {
        draft.currentUser = action.user;
      });
    case "LOGOUT":
      return produce(state, (draft) => {
        const current = {
          department: "",
          designation: "",
          doj: "",
          email: "",
          fullName: "",
          id: "",
          isActive: false,
          role: "",
          supervisorEmail: [""],
        };
        draft.currentUser = current;
      });
    case "GET ALL USERS":
      return produce(state, (draft) => {
        draft.allUsers = action.allUsers;
      });
    case "LAST ACTION":
      return produce(state, (draft) => {
        draft.lastAction = action.data;
      });
    case "TABLE PAGINATION":
      return produce(state, (draft) => {
        draft.pagination = action.data;
      });
    case "GET LEAVE APPLICATIONS USER ID":
      return produce(state, (draft) => {
        draft.listLeaveApplications = action.data;
      });
    case "PAGE MODAL":
      return produce(state, (draft) => {
        draft.pageIndex = action.pageIndex;
        draft.pageTotal = action.pageTotal;
        draft.showPageModal = action.showPageModal;
        draft.pageModalType = action.pageModalType;
        draft.pageModalTitle = action.pageModalTitle;
      });
    case "DASHBOARD DATA":
      return produce(state, (draft) => {
        draft.dashBoardInfo = action.data;
      });
    case "NEXT PAGINATION":
      return produce(state, (draft) => {
        draft.pageIndex += 1;
      });
    case "PREV PAGINATION":
      return produce(state, (draft) => {
        draft.pageIndex -= 1;
      });
    case "LEAVE APPLICATIONS ADMIN":
      return produce(state, (draft) => {
        draft.listLeaveApplications = action.data;
        draft.userLeaveStats = action.stats;
      });
    case "HOME PAGE DATA":
      return produce(state, (draft) => {
        draft.businessData = action.businessData;
        draft.managementData = action.managementData;
        draft.valuesData = action.valueData;
        draft.historyData = action.historyData;
      });
    case "RESET":
      return (state = initialState);
    default:
      return state;
  }
}

export default Reducer;
