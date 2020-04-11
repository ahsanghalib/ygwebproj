import React from "react";
import { createUseStyles } from "react-jss";

interface BackdropProps {
  show: boolean;
  clicked?: () => void;
}

const useStyles = createUseStyles({
  Backdrop: {
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: "100",
    left: "0",
    top: "0",
    backgroundColor: "rgba(0,0,0, .3)",
  },
  "@media (min-width: 769px)": {
    Backdrop: {
      display: "none",
    },
  },
});

function Backdrop(props: BackdropProps) {
  const classes = useStyles();

  return props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked} />
  ) : null;
}

export default Backdrop;
