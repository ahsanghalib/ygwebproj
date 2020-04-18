import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DialogBox from "../../../components/DialogBox";
import classes from "./Leave.module.scss";
import format from "date-fns/format";

interface LeaveCardProps {
  leaveId: string;
  userId: string;
  serialNo: number;
  sentDate: string;
  leaveDays: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  statusRemarks: string;
  fullName?: string;
  email?: string;
  designation?: string;
  department?: string;
  displayHead: boolean;
  displayButtons: boolean;
  approveRejectClick?: (leaveId: string, approval: boolean) => void;
  deleteClickHanlde?: (leaveId: string) => void
}

function LeaveCard(props: LeaveCardProps) {
  const [showConfim, setShowConfirm] = useState<boolean>(false);

  const deleteLeave = (leaveId: string) => {
    setShowConfirm(false)
    props.deleteClickHanlde!(leaveId)
  }

  return (
    <Paper className={classes.LeaveCard} elevation={0}>
      <DialogBox
        content="Are you sure you want to delete this record?"
        title="Delete"
        open={showConfim}
        onCancel={() => setShowConfirm(false)}
        onOkay={() => deleteLeave(props.leaveId)}
      />
      {props.displayHead ? (
        <div className={classes.EmployeeInfo}>
          <div className={classes.Block}>
            <div className={classes.Title}>Name: </div>
            <div className={classes.Data}>{props.fullName}</div>
          </div>
          <div className={classes.Block}>
            <div className={classes.Title}>Email: </div>
            <div className={classes.Data}>{props.email}</div>
          </div>
          <div className={classes.Block}>
            <div className={classes.Title}>Designation: </div>
            <div className={classes.Data}>{props.designation}</div>
          </div>
          <div className={classes.Block}>
            <div className={classes.Title}>Department: </div>
            <div className={classes.Data}>{props.department}</div>
          </div>
        </div>
      ) : null}

      <div className={classes.Row1}>
        <div className={classes.Block}>
          <div className={classes.Title}>No.: </div>
          <div className={classes.Data}>{props.serialNo}</div>
        </div>
        <div className={classes.Block}>
          <div className={classes.Title}>Sent Date: </div>
          <div className={classes.Data}>
            {format(new Date(props.sentDate), "dd-MMM-yyyy")}
            <br />
            {format(new Date(props.sentDate), "hh:mm a")}
          </div>
        </div>
        <div className={classes.Block}>
          <div className={classes.Title}>Days: </div>
          <div className={classes.Data}>
            {props.leaveDays}
            {props.leaveDays > 0 ? " Days " : " Day "}
            <br />[{props.startDate}
            {props.endDate !== props.startDate ? ` to ${props.endDate}` : null}]
          </div>
        </div>
      </div>
      <div className={classes.Row2}>
        <div className={classes.Block}>
          <div className={classes.Title}>Reason: </div>
          <div className={classes.Data}>{props.reason}</div>
        </div>
      </div>
      <div className={classes.Row3}>
        <div className={classes.Block}>
          <div className={classes.Title}>Status:</div>
          <div
            className={classes.Data}
            style={{
              backgroundColor: `${
                props.status === "approved"
                  ? "lightgreen"
                  : props.status === "rejected"
                  ? "lightcoral"
                  : "#eee"
              }`,
              textTransform: "capitalize",
              padding: "5px 10px",
              textAlign: "center",
            }}
          >
            {props.status === 'open' ? 'Pending' : props.status}
          </div>
        </div>
        <div className={classes.Block}>
          <div className={classes.Title}>Status Remarks:</div>
          <div className={classes.Data}>
            {props.statusRemarks.length === 0
              ? "No Remarks"
              : props.statusRemarks}
          </div>
        </div>
      </div>
      {props.displayButtons ? (
        <div className={classes.Buttons}>
          <Button
            variant={"contained"}
            color={"primary"}
            disableElevation={true}
            disabled={props.status !== "open"}
            onClick={() => props.approveRejectClick!(props.leaveId, true)}
          >
            Approve
          </Button>
          <Button
            variant={"contained"}
            color={"secondary"}
            style={{ marginLeft: "15px", marginRight: "15px" }}
            disableElevation={true}
            disabled={props.status !== "open"}
            onClick={() => props.approveRejectClick!(props.leaveId, false)}
          >
            Reject
          </Button>
          <Button
            variant={"contained"}
            color={"default"}
            disableElevation={true}
            onClick={() => setShowConfirm(true)}
          >
            Delete
          </Button>
        </div>
      ) : null}
    </Paper>
  );
}

export default LeaveCard;
