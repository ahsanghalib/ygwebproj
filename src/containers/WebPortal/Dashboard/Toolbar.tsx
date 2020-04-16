import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import classes from "./Dashboard.module.scss";

interface Props {
  fullName: string;
  email: string;
  logoutClick: () => void;
}

function Toolbar(props: Props) {
  return (
    <Paper className={classes.Header}>
      <div className={classes.Rows}>
        <div>
          Welcome! <b>{props.fullName}</b> [{props.email}]
        </div>
        <div>
          <Button
            variant="outlined"
            color="secondary"
            disableElevation
            onClick={props.logoutClick}
          >
            Logout
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default Toolbar;
