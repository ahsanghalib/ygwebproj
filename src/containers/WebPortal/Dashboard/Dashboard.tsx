import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppStateType } from "../../../types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { UserLogout, getEmployee } from "../../../store/Effects";
import classes from "./Dashboard.module.scss";
import Policy from "../../../components/Policy/Policy";
import LeaveForm from "../LeaveForm/LeaveForm";
import EmployeeList from "../Employee/EmployeeList";
import UserForm from "../Employee/UserForm";
import Snackbar from "@material-ui/core/Snackbar";
import Loader from "../../../components/Loader";

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
  const [editId, setEditId] = useState<string | number>(0);

  useEffect(() => {
    setShowAlert(store.lastAction !== "");
  }, [store.lastAction]);

  useEffect(() => {
    dispatch(getEmployee(store.currentUser.id));
  }, [dispatch, store.currentUser.id]);

  useEffect(() => {
    if (store.currentUser.role === "admin") {
      setShowLeaveApp(false);
    }
  }, [store.currentUser.role]);

  const userAddEditForm = (edit: boolean, id: string | number) => {
    setShowAddEmployee(!showAddEmployee);
    setEditForm(edit);
    setEditId(id);
  };

  const cancelFormHandler = () => {
    setShowAddEmployee(false);
    setEditForm(false);
    setEditId(0);
  };

  const cancelFormHandlerUser = () => {
    setShowLeaveApp(true);
    setEditForm(false);
    setEditId(0);
  };

  const leaveApplicationToggle = () => {
    setShowLeaveApp(!showLeaveApp);
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

      <Paper className={classes.LeaveAppStatus}>
        <div className={classes.Head}>Leave Application Status</div>
        <div className={classes.Status}>
          <div className={classes.Counter}>
            <div className={classes.Sent}>
              <div className={classes.Count}>0</div>
              <div className={classes.Title}>Sent</div>
            </div>
          </div>
          <div className={classes.Counter}>
            <div className={classes.Approved}>
              <div className={classes.Count}>0</div>
              <div className={classes.Title}>Approved</div>
            </div>
          </div>
          <div className={classes.Counter}>
            <div className={classes.Rejected}>
              <div className={classes.Count}>0</div>
              <div className={classes.Title}>Rejected</div>
            </div>
          </div>
        </div>
      </Paper>
      {showLeaveApp ? (
        <LeaveForm />
      ) : store.currentUser.role === "user" ? (
        <UserForm
          editForm={true}
          editId={store.currentUser.id}
          cancelButton={cancelFormHandlerUser}
        />
      ) : null}
      {store.currentUser.role === "user" ? <Policy /> : null}
      {showAddEmployee ? (
        <UserForm
          editForm={editForm}
          editId={editId}
          cancelButton={cancelFormHandler}
        />
      ) : (
        <EmployeeList userAddEditForm={userAddEditForm} />
      )}
    </div>
  );
}

export default Dashboard;
