import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import classes from "./Leave.module.scss";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { AppStateType, LeaveApplicationModel, UserState } from "../../../types";
import {
  axiosEmail,
  adminLeaveAppBody,
  adminLeaveAppHTML,
  adminLeaveAppText,
  axiosWithAuth,
} from "../../../helpers";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";
import { appStatusAction } from "../../../store/Actions";

interface Props {
  approvalForm: boolean;
  backButtonClick: () => void;
  leaveId: string;
}

function AdminLeaveForm(props: Props) {
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );

  const dispatch = useDispatch();

  const [leaveData, setLeaveData] = useState<LeaveApplicationModel>({
    clientTime: "",
    emailSentId: "",
    endDate: "",
    id: "",
    leaveDays: 0,
    reason: "",
    startDate: "",
    status: "",
    statusRemarks: "",
    userId: "",
    timestamp: "",
  });
  const [userData, setUserData] = useState<UserState>({
    department: "",
    designation: "",
    doj: "",
    email: "",
    fullName: "",
    id: "",
    isActive: false,
    role: "",
    supervisorEmail: [],
  });

  useEffect(() => {
    if (props.leaveId !== "") {
      let leave = store.listLeaveApplications.find(
        (d) => d.id === props.leaveId
      );
      if (leave) {
        let user = store.allUsers.find((d) => d.id === leave!.userId);
        if (user) {
          setUserData(user);
          setLeaveData({
            ...leave,
            status: props.approvalForm ? "approved" : "rejected",
          });
        }
      }
    }
  }, [
    props.approvalForm,
    props.leaveId,
    store.allUsers,
    store.listLeaveApplications,
  ]);

  const changeRemarksHanlder = (event: any) => {
    const value = event.target.value;
    setLeaveData({ ...leaveData, statusRemarks: value });
  };

  const submitHandle = async () => {
    try {
      dispatch(appStatusAction(true, false, ""));

      await axiosEmail()
        .post(
          "/email",
          adminLeaveAppBody(
            store.currentUser.fullName,
            store.currentUser.email,
            { email: userData.email, name: userData.fullName },
            `(Leave Application [${leaveData.leaveDays} Day(s)]) - ${
              props.approvalForm ? "APPROVED" : "REJECTED"
            }`,
            adminLeaveAppHTML(
              store.currentUser.fullName,
              store.currentUser.designation,
              store.currentUser.department,
              leaveData.startDate!.toString(),
              leaveData.endDate!.toString(),
              leaveData.leaveDays,
              leaveData.reason,
              props.approvalForm ? "APPROVED" : "REJECTED",
              leaveData.statusRemarks
            ),
            adminLeaveAppText(
              store.currentUser.fullName,
              store.currentUser.designation,
              store.currentUser.department,
              leaveData.startDate!.toString(),
              leaveData.endDate!.toString(),
              leaveData.leaveDays,
              leaveData.reason,
              props.approvalForm ? "APPROVED" : "REJECTED",
              leaveData.statusRemarks
            )
          )
        )
        .catch((err) => {
          console.log(err.response.data);
          throw new Error(err.response.data);
        });

      const record = {
        userId: leaveData.userId,
        emailSentId: leaveData.emailSentId,
        endDate: leaveData.endDate,
        reason: leaveData.reason,
        startDate: leaveData.startDate,
        leaveDays: leaveData.leaveDays,
        status: leaveData.status,
        statusRemarks: leaveData.statusRemarks,
        clientTime: leaveData.clientTime,
        timestamp: leaveData.timestamp,
      };

      await axiosWithAuth()
        .post(`/editLeaveApplication/${leaveData.id}`, record)
        .then((res) => {
          props.backButtonClick();
        })
        .catch((err) => {
          if (err.response.data.error) {
            dispatch(appStatusAction(false, true, err.response.data.error));
          } else {
            dispatch(appStatusAction(false, true, err.message));
          }
        });

      dispatch(
        appStatusAction(
          false,
          false,
          `Leave Application ${leaveData.status.toUpperCase}`
        )
      );
    } catch (err) {
      dispatch(
        appStatusAction(
          false,
          true,
          "Sorry, Something went wrong, please call us or retry."
        )
      );
    }
  };

  return (
    <Paper className={classes.AdminLeaveForm}>
      <div className={classes.FormHeader}>
        <div>
          Leave Application&nbsp;
          <span
            style={{
              textTransform: "initial",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            {leaveData.leaveDays}
            {leaveData.leaveDays > 0 ? " Days " : " Day "} [
            {leaveData.startDate}
            {leaveData.endDate !== leaveData.startDate
              ? ` to ${leaveData.endDate}`
              : null}
            ]
          </span>
        </div>
        <div
          className={classes.FormStatus}
          style={{
            backgroundColor: `${
              props.approvalForm ? "lightgreen" : "lightcoral"
            }`,
          }}
        >
          {props.approvalForm ? "Approval Form" : "Rejection Form"}
        </div>
      </div>
      <div>
        <div className={classes.Title}>Leave Application Date:</div>
        <div className={classes.Data}>
          {format(
            new Date(
              leaveData.clientTime !== "" ? leaveData.clientTime : new Date()
            ),
            "dd-MMM-yyyy, hh:mm a"
          )}
        </div>
      </div>
      <div>
        <div className={classes.Title}>Full Name: </div>
        <div className={classes.Data}>{userData.fullName}</div>
      </div>
      <div>
        <div className={classes.Title}>Email: </div>
        <div className={classes.Data}>{userData.email}</div>
      </div>
      <div>
        <div className={classes.Title}>Designation: </div>
        <div className={classes.Data}>{userData.designation}</div>
      </div>
      <div>
        <div className={classes.Title}>Department: </div>
        <div className={classes.Data}>{userData.department}</div>
      </div>
      <div>
        <div className={classes.Title}>Date of Joining:</div>
        <div className={classes.Data}>{userData.doj}</div>
      </div>
      <div>
        <div className={classes.Title}>Superviors Emails: </div>
        <div className={classes.Data}>
          {userData.supervisorEmail.join(", ")}
        </div>
      </div>

      <div>
        <div className={classes.Title}>Leave Days Requested</div>
        <div className={classes.Data}>
          {leaveData.leaveDays}
          {leaveData.leaveDays > 0 ? " Days " : " Day "}[{leaveData.startDate}
          {leaveData.endDate !== leaveData.startDate
            ? ` to ${leaveData.endDate}`
            : null}
          ]
        </div>
      </div>
      <div>
        <div className={classes.Title}>Leave Reason</div>
        <div className={classes.Data}>{leaveData.reason}</div>
      </div>

      <TextField
        id="statusRemarks"
        name="statusRemarks"
        label={"Remarks: "}
        variant="standard"
        multiline={true}
        rows={4}
        margin={"dense"}
        value={leaveData.statusRemarks}
        onChange={changeRemarksHanlder}
      />

      <ButtonGroup className={classes.BtnGroup}>
        <Button
          type={"submit"}
          variant="contained"
          color={props.approvalForm ? "primary" : "secondary"}
          disableElevation
          onClick={() => submitHandle()}
        >
          {props.approvalForm ? "Approve" : "Reject"}
        </Button>
        <Button
          type={"button"}
          variant="contained"
          color="default"
          onClick={props.backButtonClick}
          disableElevation
        >
          Back
        </Button>
      </ButtonGroup>
    </Paper>
  );
}

export default AdminLeaveForm;
