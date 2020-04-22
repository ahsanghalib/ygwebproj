import React from "react";
import classes from "./Business.module.scss";
import BusinessCard from "./BusinessCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { pageModalAction } from "../../store/Actions";
import { PageModelEnum, AppStateType } from "../../types";

function BusinessList() {
  const dispatch = useDispatch();
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  return (
    <div className={classes.List}>
      {store.businessData.map((d, i) => (
        <Link
          to={"/"}
          key={d.id}
          onClick={() =>
            dispatch(
              pageModalAction(
                true,
                i,
                store.businessData.length,
                PageModelEnum.com,
                "Business Details"
              )
            )
          }
        >
          <BusinessCard
            id={d.id}
            logoUrl={d.logoUrl}
            title={d.title}
            slog={d.slog}
            imgAlt={d.imgAlt}
          />
        </Link>
      ))}
    </div>
  );
}

export default BusinessList;
