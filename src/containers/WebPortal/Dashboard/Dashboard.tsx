import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppStateType } from "../../../types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {
  UserLogout,
  getEmployee,
  leaveApplicationsByUserId,
} from "../../../store/Effects";
import classes from "./Dashboard.module.scss";
import Policy from "../../../components/Policy/Policy";
import LeaveForm from "../LeaveForm/LeaveForm";
import EmployeeList from "../Employee/EmployeeList";
import UserForm from "../Employee/UserForm";
import Snackbar from "@material-ui/core/Snackbar";
import Loader from "../../../components/Loader";
import LeaveAppList from "../LeaveForm/LeaveAppList";

function Dashboard() {
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  const dispatch = useDispatch();

  const [showLeaveApp, setShowLeaveApp] = useState<boolean>(true);
  const [showAddEmployee, setShowAddEmployee] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(false);
  const [showLeaveCounter, setShowLeaveCounter] = useState<boolean>(true);
  const [editId, setEditId] = useState<string | number>(0);
  const [sentCount, setSentCount] = useState<number>(0);
  const [approvedCount, setApprovedCount] = useState<string | number>(0);
  const [rejectedCount, setRejectedCount] = useState<string | number>(0);
  const [daysCount, setDaysCount] = useState<number>(0);
  const [daysApprovedCount, setDaysApprovedCount] = useState<string | number>(
    0
  );
  const [daysRejectedCount, setDaysRejectedCount] = useState<string | number>(
    0
  );

  useEffect(() => {
    setShowAlert(store.lastAction !== "");
  }, [store.lastAction]);

  useEffect(() => {
    if (showLeaveApp && store.currentUser.role === "user") {
      dispatch(getEmployee(store.currentUser.id));
      dispatch(leaveApplicationsByUserId(store.currentUser.id));
    }
  }, [dispatch, store.currentUser.id, showLeaveApp, store.currentUser.role]);

  useEffect(() => {
    if (store.currentUser.role === "user") {
      setSentCount(store.currentUserLeaveApplications.length);
      setApprovedCount(
        store.currentUserLeaveApplications.filter(
          (d) => d.status === "approved"
        ).length
      );
      setRejectedCount(
        store.currentUserLeaveApplications.filter(
          (d) => d.status === "rejected"
        ).length
      );
      let totalDays = 0;
      store.currentUserLeaveApplications.map((d) => (totalDays += d.leaveDays));
      setDaysCount(totalDays);

      totalDays = 0;
      store.currentUserLeaveApplications
        .filter((d) => d.status === "approved")
        .map((d) => (totalDays += d.leaveDays));
      setDaysApprovedCount(totalDays);

      totalDays = 0;
      store.currentUserLeaveApplications
        .filter((d) => d.status === "rejected")
        .map((d) => (totalDays += d.leaveDays));
      setDaysRejectedCount(totalDays);
    }
  }, [dispatch, store.currentUser, store.currentUserLeaveApplications]);

  useEffect(() => {
    if (store.currentUser.role === "admin") {
      setShowLeaveApp(false);
    }
  }, [store.currentUser.role]);

  const userAddEditForm = (edit: boolean, id: string | number) => {
    setShowAddEmployee(!showAddEmployee);
    setShowLeaveCounter(!showLeaveCounter);
    setEditForm(edit);
    setEditId(id);
  };

  const cancelFormHandler = () => {
    setShowAddEmployee(false);
    setShowLeaveCounter(true);
    setEditForm(false);
    setEditId(0);
  };

  const cancelFormHandlerUser = () => {
    setShowLeaveApp(true);
    setShowLeaveCounter(true);
    setEditForm(false);
    setEditId(0);
  };

  const leaveApplicationToggle = () => {
    setShowLeaveApp(!showLeaveApp);
    setShowLeaveCounter(!showLeaveCounter);
  };

  return (
    <div className={classes.Main}>
      {store.loading ? <Loader /> : null}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showAlert}
        onClose={() => setShowAlert(false)}
        message={store.lastAction}
      />
      <Paper className={classes.Header}>
        <div className={classes.Rows}>
          <div>
            Welcome! <b>{store.currentUser.fullName}</b> [
            {store.currentUser.email}]
          </div>
          <div>
            {store.currentUser.role === "user" ? (
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                onClick={leaveApplicationToggle}
              >
                {showLeaveApp ? "Edit Profile" : "Leave Application"}
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                onClick={() => userAddEditForm(false, 0)}
              >
                {showAddEmployee ? "List Employees" : "Add Employee"}
              </Button>
            )}
            <Button
              variant="outlined"
              color="secondary"
              disableElevation
              onClick={() => dispatch(UserLogout())}
            >
              Logout
            </Button>
          </div>
        </div>
      </Paper>

      {showLeaveCounter ? (
        <div className={classes.StatusDashboard}>
          <Paper className={classes.LeaveAppStatus}>
            <div className={classes.Head}>Leave Application Status</div>
            <div className={classes.Status}>
              <div className={classes.Counter}>
                <div className={classes.Sent}>
                  <div className={classes.Count}>{sentCount}</div>
                  <div className={classes.Title}>Sent</div>
                </div>
              </div>
              <div className={classes.Counter}>
                <div className={classes.Approved}>
                  <div className={classes.Count}>{approvedCount}</div>
                  <div className={classes.Title}>Approved</div>
                </div>
              </div>
              <div className={classes.Counter}>
                <div className={classes.Rejected}>
                  <div className={classes.Count}>{rejectedCount}</div>
                  <div className={classes.Title}>Rejected</div>
                </div>
              </div>
            </div>
          </Paper>

          <Paper className={classes.LeaveAppStatus}>
            <div className={classes.Head}>Leave Days Status</div>
            <div className={classes.Status}>
              <div className={classes.Counter}>
                <div className={classes.Sent}>
                  <div className={classes.Count}>{daysCount}</div>
                  <div className={classes.Title}>Requested</div>
                </div>
              </div>
              <div className={classes.Counter}>
                <div className={classes.Approved}>
                  <div className={classes.Count}>{daysApprovedCount}</div>
                  <div className={classes.Title}>Approved</div>
                </div>
              </div>
              <div className={classes.Counter}>
                <div className={classes.Rejected}>
                  <div className={classes.Count}>{daysRejectedCount}</div>
                  <div className={classes.Title}>Rejected</div>
                </div>
              </div>
            </div>
          </Paper>
        </div>
      ) : null}

      {showLeaveApp ? (
        <div>
          <LeaveForm />
          <LeaveAppList />
          <Policy />
        </div>
      ) : store.currentUser.role === "user" ? (
        <UserForm
          editForm={true}
          editId={store.currentUser.id}
          cancelButton={cancelFormHandlerUser}
        />
      ) : null}
      {/* {store.currentUser.role === "user" ? <Policy /> : null} */}
      {showAddEmployee ? (
        <UserForm
          editForm={editForm}
          editId={editId}
          cancelButton={cancelFormHandler}
        />
      ) : store.currentUser.role === "admin" ? (
        <div>
          <LeaveAppList />
          <EmployeeList userAddEditForm={userAddEditForm} />
        </div>
      ) : null}

      {/* {store.currentUser.role === "admin" ? (
        <div>
          <LeaveAppList />
          <EmployeeList userAddEditForm={userAddEditForm} />
        </div>
      ) : null} */}
    </div>
  );
}

export default Dashboard;
