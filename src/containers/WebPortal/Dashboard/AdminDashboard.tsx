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
import AdminLeaveReport from "../LeaveForm/AdminLeaveReport";
import { appStatusAction } from "../../../store/Actions";
import { axiosWithAuth } from "../../../helpers";

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

  const [editForm, setEditForm] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | number>(0);
  const [addEmployeeForm, setAddEmployeeForm] = useState<boolean>(false);
  const [showEmployeeList, setShowEmployeeList] = useState<boolean>(false);
  const [showLeaveReport, setShowLeaveReport] = useState<{
    show: boolean;
    status: string;
  }>({ show: false, status: "all" });

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

  const donwloadData = async () => {
    try {
      dispatch(appStatusAction(true, false, ""));
      await axiosWithAuth()
        .get("/downloadData", { responseType: "blob" })
        .then((res) => {
          // trick to download file from axios
          const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.setAttribute("download", `webportal-data-${Date.now()}.csv`); //any other extension
          document.body.appendChild(link);
          link.click();
          dispatch(appStatusAction(false, false, ""));
          link.remove();
        })
        .catch((err) => {
          if (err.response.data.error) {
            dispatch(appStatusAction(false, true, err.response.data.error));
          } else {
            dispatch(appStatusAction(false, true, err.message));
          }
        });
    } catch (err) {
      dispatch(
        appStatusAction(
          false,
          true,
          "Sorry, Something went wrong, please call us or retry."
        )
      );
    }
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
                disableElevation={true}
              >
                Add Employee
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowEmployeeList(true)}
                disableElevation={true}
              >
                Employees List
              </Button>
            </Paper>
          </div>
          <div>
            <Paper className={classes.MenuItems}>
              <Button
                variant="contained"
                color="secondary"
                disableElevation={true}
                onClick={() =>
                  setShowLeaveReport({ show: true, status: "open" })
                }
              >
                Pending (
                {props.sentCounter -
                  (props.approvedCounter + props.rejectedCounter)}
                ) Applications
              </Button>
              <Button
                variant="contained"
                color="primary"
                disableElevation={true}
                onClick={() =>
                  setShowLeaveReport({ show: true, status: "all" })
                }
              >
                All Leave Applications
              </Button>
              <Button
                variant="contained"
                color="primary"
                disableElevation={true}
                onClick={() =>
                  setShowLeaveReport({ show: true, status: "approved" })
                }
              >
                Approved Applications
              </Button>
              <Button
                variant="contained"
                color="primary"
                disableElevation={true}
                onClick={() =>
                  setShowLeaveReport({ show: true, status: "rejected" })
                }
              >
                Rejected Applications
              </Button>

              <Button
                variant="contained"
                color="primary"
                disableElevation={true}
                onClick={() => donwloadData()}
              >
                Download All Data
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
  ) : showLeaveReport.show ? (
    <AdminLeaveReport
      backButtonClick={() => setShowLeaveReport({ show: false, status: "all" })}
      status={showLeaveReport.status}
    />
  ) : (
    dashboard()
  );
}

export default AdminDashboard;
