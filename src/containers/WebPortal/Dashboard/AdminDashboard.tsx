import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import classes from "./Dashboard.module.scss";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppStateType } from "../../../types";
import AppStatusBar from "./AppStatusBar";
import UserForm from "../Employee/UserForm";
import { dashBoardInfoGet } from "../../../store/Effects";
import EmployeeList from "../Employee/EmployeeList";

interface Props {
  sentCounter: number;
  approvedCounter: number;
  rejectedCounter: number;
}

function AdminDashboard(props: Props) {
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  const dispatch = useDispatch();

  const [addEmployeeForm, setAddEmployeeForm] = useState<boolean>(false);
  const [showEmployeeList, setShowEmployeeList] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | number>(0);

  useEffect(() => {
    if (!addEmployeeForm) {
      dispatch(dashBoardInfoGet());
    }
  }, [addEmployeeForm, dispatch]);

  useEffect(() => {
    if (!showEmployeeList) {
      dispatch(dashBoardInfoGet());
    }
  }, [showEmployeeList, dispatch]);

  const userAddEditForm = (edit: boolean, id: string | number) => {
    setAddEmployeeForm(!addEmployeeForm);
    setEditForm(edit);
    setEditId(id);
  };

  const dashboard = () => {
    return (
      <div>
        <AppStatusBar
          sentCounter={props.sentCounter}
          approvedCounter={props.approvedCounter}
          rejectedCounter={props.rejectedCounter}
        />
        <div className={classes.AdminDashboardMain}>
          <div>
            <Paper className={classes.MenuItems}>
              <div className={classes.Info}>
                <div className={classes.Value}>
                  {store.dashBoardInfo.totalUsers}
                </div>
                <div className={classes.Label}>
                  {store.dashBoardInfo.totalUsers <= 1
                    ? "Employee "
                    : "Employees "}
                  in record.
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setAddEmployeeForm(true)}
              >
                Add Employee
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowEmployeeList(true)}
              >
                Employees List
              </Button>
            </Paper>
          </div>
          <div>
            <Paper className={classes.MenuItems}>
              <Button variant="contained" color="secondary">
                Approve / Reject Applications
              </Button>
              <Button variant="contained" color="primary">
                All Leave Applications
              </Button>
              <Button variant="contained" color="primary">
                Leave Applications By Employee
              </Button>
            </Paper>
          </div>
        </div>
      </div>
    );
  };

  return addEmployeeForm ? (
    <UserForm
      editForm={editForm}
      editId={editId}
      cancelButton={() => setAddEmployeeForm(false)}
    />
  ) : showEmployeeList ? (
    <EmployeeList
      userAddEditForm={userAddEditForm}
      backButtonClick={() => setShowEmployeeList(false)}
    />
  ) : (
    dashboard()
  );
}

export default AdminDashboard;
