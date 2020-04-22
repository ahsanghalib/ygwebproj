import React from "react";
import classes from "./Management.module.scss";
import { Link } from "react-router-dom";
import Image from "../Image";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { pageModalAction } from "../../store/Actions";
import { PageModelEnum, AppStateType } from "../../types";

function Management() {
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  const dispatch = useDispatch();
  return (
    <div className={classes.Content}>
      {store.managementData.map((d, i) => (
        <Link
          to="/"
          className={classes.Person}
          key={d.id}
          onClick={() =>
            dispatch(
              pageModalAction(
                true,
                i,
                store.managementData.length,
                PageModelEnum.mange,
                "Management"
              )
            )
          }
        >
          <div className={classes.Image}>
            <Image src={d.img} alt={d.name} />
          </div>
          <div className={classes.Detail}>
            <div className={classes.Quote}>{d.quote}</div>
            <div className={classes.Name}>
              <h3>{d.name}</h3>
              <h5>{d.designation}</h5>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Management;
