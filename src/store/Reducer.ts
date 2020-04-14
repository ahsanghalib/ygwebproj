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
  lastAction: ""
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
    case "PAGE MODAL":
      return produce(state, (draft) => {
        draft.pageIndex = action.pageIndex;
        draft.pageTotal = action.pageTotal;
        draft.showPageModal = action.showPageModal;
        draft.pageModalType = action.pageModalType;
        draft.pageModalTitle = action.pageModalTitle;
      });
    case "NEXT PAGINATION":
      return produce(state, (draft) => {
        draft.pageIndex += 1;
      });
    case "PREV PAGINATION":
      return produce(state, (draft) => {
        draft.pageIndex -= 1;
      });
    default:
      return state;
  }
}

export default Reducer;
