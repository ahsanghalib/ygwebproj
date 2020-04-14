import React, { useEffect } from "react";
import classes from "./WebPortals.module.scss";
import Login from "./Login/Login";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppStateType } from "../../types";
import { checkAuthState } from "../../store/Effects";
import Dashboard from "./Dashboard/Dashboard";
import Loader from "../../components/Loader";

const WebPortal: React.FC = (props) => {
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  const dispatch = useDispatch();

  let isAuth = store.currentUser.id !== "";

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <div>
      <div className={classes.Hero} />
      <div className={classes.Container}>
        {store.responseText === "CHECK_AUTH" ? <Loader /> : isAuth ? (
          <Dashboard />
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default WebPortal;
