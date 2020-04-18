import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppStateType } from "../../../types";
import { UserLogout, dashBoardInfoGet } from "../../../store/Effects";
import classes from "./Dashboard.module.scss";
import Snackbar from "@material-ui/core/Snackbar";
import Loader from "../../../components/Loader";
import AdminDashboard from "./AdminDashboard";
import Toolbar from "./Toolbar";
import UserDashboard from "./UserDashboad";

function Dashboard() {
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [sentCount, setSentCount] = useState<number>(0);
  const [approvedCount, setApprovedCount] = useState<number>(0);
  const [rejectedCount, setRejectedCount] = useState<number>(0);

  useEffect(() => {
    setShowAlert(store.lastAction !== "");
  }, [store.lastAction]);

  // don't delete
  useEffect(() => {
    if (store.currentUser.role === "user") {
      setSentCount(store.listLeaveApplications.length);
      setApprovedCount(
        store.listLeaveApplications.filter(
          (d) => d.status === "approved"
        ).length
      );
      setRejectedCount(
        store.listLeaveApplications.filter(
          (d) => d.status === "rejected"
        ).length
      );
    }
  }, [store.currentUser.role, store.listLeaveApplications]);

  // don't delete
  useEffect(() => {
    if (store.currentUser.role === "admin") {
      dispatch(dashBoardInfoGet());
    }
  }, [dispatch, store.currentUser.role]);

  // don't delete
  useEffect(() => {
    setSentCount(store.dashBoardInfo.sent);
    setApprovedCount(store.dashBoardInfo.approved);
    setRejectedCount(store.dashBoardInfo.rejected);
  }, [
    store.dashBoardInfo.approved,
    store.dashBoardInfo.rejected,
    store.dashBoardInfo.sent,
  ]);

  return (
    <div className={classes.Main}>
      {store.loading ? <Loader /> : null}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showAlert}
        onClose={() => setShowAlert(false)}
        message={store.lastAction}
      />

      <Toolbar
        email={store.currentUser.email}
        fullName={store.currentUser.fullName}
        logoutClick={() => dispatch(UserLogout())}
      />

      {store.currentUser.role === "admin" ? (
        <AdminDashboard
          sentCounter={sentCount}
          approvedCounter={approvedCount}
          rejectedCounter={rejectedCount}
        />
      ) : null}
      {store.currentUser.role === "user" ? (
        <UserDashboard
          sentCounter={sentCount}
          approvedCounter={approvedCount}
          rejectedCounter={rejectedCount}
        />
      ) : null}
    </div>
  );
}

export default Dashboard;
