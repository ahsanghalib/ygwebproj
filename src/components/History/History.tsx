import React from "react";
import classes from "./History.module.scss";
import { useSelector, shallowEqual } from "react-redux";
import { AppStateType } from "../../types";

function History() {
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  return (
    <div className={classes.Content}>
      <div className={classes.Title}>{store.historyData.title}</div>

      <div className={classes.Detail}>{store.historyData.data}</div>
    </div>
  );
}

export default History;
