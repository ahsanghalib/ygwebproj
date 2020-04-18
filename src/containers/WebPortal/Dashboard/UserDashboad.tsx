import React, { useState, useEffect } from "react";
import AppStatusBar from "./AppStatusBar";
import classes from "./Dashboard.module.scss";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Policy from "../../../components/Policy/Policy";
import LeaveList from "../LeaveForm/LeaveList";
import LeaveForm from "../LeaveForm/LeaveForm";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getEmployee, leaveApplicationsByUserId } from "../../../store/Effects";
import { AppStateType } from "../../../types";
import UserForm from "../Employee/UserForm";

interface Props {
  sentCounter: number;
  approvedCounter: number;
  rejectedCounter: number;
}

function UserDashboard(props: Props) {
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  const dispatch = useDispatch();

  const [showLeaveForm, setShowLeaveForm] = useState<boolean>(false);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);

  useEffect(() => {
    if (!showEditProfile) {
      dispatch(getEmployee(store.currentUser.id));
    }
  }, [dispatch, showEditProfile, store.currentUser.id]);

  useEffect(() => {
    if (!showLeaveForm) {
      dispatch(leaveApplicationsByUserId(store.currentUser.id));
    }
  }, [dispatch, showLeaveForm, store.currentUser.id]);

  const dashBoard = () => {
    return (
      <div className={classes.UserDashboardMain}>
        <AppStatusBar
          sentCounter={props.sentCounter}
          approvedCounter={props.approvedCounter}
          rejectedCounter={props.rejectedCounter}
        />
        <Paper className={classes.UserMenu}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowLeaveForm(true)}
          >
            Send Leave Application
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={() => setShowEditProfile(true)}
          >
            Edit Profile / Change Password
          </Button>
        </Paper>
        <div className={classes.Header}>Leave Applications</div>
        <LeaveList leaveData={store.listLeaveApplications} />
        <Policy />
      </div>
    );
  };

  return showLeaveForm ? (
    <LeaveForm cancelClick={() => setShowLeaveForm(false)} />
  ) : showEditProfile ? (
    <UserForm
      editForm={true}
      editId={store.currentUser.id}
      cancelButton={() => setShowEditProfile(false)}
    />
  ) : (
    dashBoard()
  );
}

export default UserDashboard;
