import React from "react";
import Paper from "@material-ui/core/Paper";
import classes from "./Dashboard.module.scss";

interface Props {
  sentCounter: number;
  approvedCounter: number;
  rejectedCounter: number;
}

function AppStatusBar(props: Props) {
  return (
    <Paper className={classes.LeaveAppStatus}>
      <div className={classes.Head}>Leave Application Status</div>
      <div className={classes.Status}>
        <div className={classes.Counter}>
          <div className={classes.Sent}>
            <div className={classes.Count}>{props.sentCounter}</div>
            <div className={classes.Title}>Sent</div>
          </div>
        </div>
        <div className={classes.Counter}>
          <div className={classes.Approved}>
            <div className={classes.Count}>{props.approvedCounter}</div>
            <div className={classes.Title}>Approved</div>
          </div>
        </div>
        <div className={classes.Counter}>
          <div className={classes.Rejected}>
            <div className={classes.Count}>{props.rejectedCounter}</div>
            <div className={classes.Title}>Rejected</div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default AppStatusBar;
