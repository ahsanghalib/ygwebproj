import React from "react";
import classes from "./Leave.module.scss";
import LeaveCard from "./LeaveCard";
import Paper from "@material-ui/core/Paper";
import { LeaveApplicationModel, UserState } from "../../../types";

interface Props {
  leaveData: LeaveApplicationModel[];
  userData?: UserState[];
  approveRejectClick?: (leaveId: string, approval: boolean) => void;
  deleteClickHanlde?: (leaveId: string) => void
}

function LeaveList(props: Props) {

  const list = () => {
    return props.leaveData.length === 0 ? (
      <Paper
        elevation={0}
        style={{
          fontSize: "1.25rem",
          textAlign: "center",
          padding: "15px",
        }}
      >
        No Leave Applications
      </Paper>
    ) : (
      props.leaveData.map((d, i) => {
        if (props.userData) {
          const user = props.userData.find((u) => u.id === d.userId);
          return (
            <LeaveCard
              key={d.id}
              leaveId={d.id}
              userId={d.userId}
              displayButtons={true}
              displayHead={true}
              serialNo={i + 1}
              endDate={d.endDate ? d.endDate.toString() : ""}
              startDate={d.startDate ? d.startDate.toString() : ""}
              leaveDays={d.leaveDays}
              reason={d.reason}
              sentDate={d.clientTime}
              status={d.status}
              statusRemarks={d.statusRemarks}
              department={user ? user.department : "No User Found"}
              designation={user ? user.designation : "No User Found"}
              email={user ? user.email : "No User Found"}
              fullName={user ? user.fullName : "No User Found"}
              approveRejectClick={props.approveRejectClick}
              deleteClickHanlde={props.deleteClickHanlde}
            />
          );
        } else {
          return (
            <LeaveCard
              key={d.id}
              leaveId={d.id}
              userId={d.userId}
              displayButtons={false}
              displayHead={false}
              serialNo={i + 1}
              endDate={d.endDate ? d.endDate.toString() : ""}
              startDate={d.startDate ? d.startDate.toString() : ""}
              leaveDays={d.leaveDays}
              reason={d.reason}
              sentDate={d.clientTime}
              status={d.status}
              statusRemarks={d.statusRemarks}
            />
          );
        }
      })
    );
  };
  return (
    <div className={classes.LeaveAppList}>
      {list()}
    </div>
  );
}

export default LeaveList;
