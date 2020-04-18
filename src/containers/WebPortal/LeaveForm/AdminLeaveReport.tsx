import React, { useEffect, useState } from "react";
import LeaveList from "./LeaveList";
import AdminLeaveForm from "./AdminLeaveForm";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppStateType } from "../../../types";
import {
  getAllUsersList,
  getAllLeaveApplicationsAdmin,
  dashBoardInfoGet,
  deleteLeaveApplication,
} from "../../../store/Effects";
import classes from "./Leave.module.scss";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

interface Props {
  backButtonClick: () => void;
  status: string;
}

function AdminLeaveReport(props: Props) {
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  const dispatch = useDispatch();

  const [empId, setEmpId] = useState<string>("all");
  const [status, setStatus] = useState<string>(props.status);
  const [adminLeaveForm, setAdminLeaveForm] = useState<{
    show: boolean;
    approval: boolean;
    leaveId: string;
  }>({
    show: false,
    approval: true,
    leaveId: "",
  });

  useEffect(() => {
    dispatch(getAllUsersList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllLeaveApplicationsAdmin(empId, status));
  }, [dispatch, empId, status, adminLeaveForm.show]);

  useEffect(() => {
    dispatch(dashBoardInfoGet());
  }, [adminLeaveForm.show, dispatch]);

  const approveRejectClickHandle = (leaveId: string, approval: boolean) => {
    setAdminLeaveForm({ show: true, leaveId: leaveId, approval: approval });
  };

  const deleteLeaveClickHandle = (leaveId: string) => {
    if (leaveId !== "")
      dispatch(deleteLeaveApplication(leaveId, empId, status));
  };

  const report = () => (
    <div className={classes.LeaveReport}>
      <div className={classes.Header}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: "15px" }}
          onClick={props.backButtonClick}
        >
          Go Back
        </Button>
        Leave Report
      </div>
      <div className={classes.Filters}>
        <div className={classes.Column}>
          <div className={classes.Label}>Employee List: </div>
          <div className={classes.Input}>
            <FormControl style={{ minWidth: "120px" }}>
              <Select
                labelId="employee-select-label"
                id="employee-select"
                name="employee-select"
                value={empId}
                defaultValue={"all"}
                displayEmpty={false}
                onChange={(event: any) => setEmpId(event.target.value)}
              >
                <MenuItem value={"all"}>All</MenuItem>

                {store.allUsers.map((d, i) => {
                  if (d.role !== "admin") {
                    return (
                      <MenuItem value={d.id} key={d.id}>
                        {d.fullName}
                      </MenuItem>
                    );
                  }
                  return false;
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={classes.Column}>
          <div className={classes.Label}>Status: </div>
          <div className={classes.Input}>
            <FormControl style={{ minWidth: "120px" }}>
              <Select
                labelId="status-select-label"
                id="status-select"
                name="status-select"
                value={status}
                defaultValue={"all"}
                displayEmpty={false}
                onChange={(event: any) => setStatus(event.target.value)}
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"open"}>Pending</MenuItem>
                <MenuItem value={"approved"}>Approved</MenuItem>
                <MenuItem value={"rejected"}>Rejected</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className={classes.Stats}>
        <Paper className={classes.Data} elevation={0}>
          <div className={classes.DataHead}>Leaves Applications: </div>
          <div className={classes.Counts}>
            <div className={classes.Head}>
              <b>
                {empId === "all"
                  ? store.dashBoardInfo.sent
                  : store.userLeaveStats.leaves.sent}
              </b>{" "}
              Sent
            </div>
            <div className={classes.Head}>
              <b>
                {empId === "all"
                  ? store.dashBoardInfo.approved
                  : store.userLeaveStats.leaves.approved}
              </b>{" "}
              Approved
            </div>
            <div className={classes.Head}>
              <b>
                {empId === "all"
                  ? store.dashBoardInfo.rejected
                  : store.userLeaveStats.leaves.rejected}
              </b>{" "}
              Rejected
            </div>
            <div className={classes.Head}>
              <b>
                {empId === "all"
                  ? store.dashBoardInfo.sent -
                    (store.dashBoardInfo.approved +
                      store.dashBoardInfo.rejected)
                  : store.userLeaveStats.leaves.sent -
                    (store.userLeaveStats.leaves.approved +
                      store.userLeaveStats.leaves.rejected)}
              </b>{" "}
              Pending
            </div>
          </div>
        </Paper>
        {empId !== "all" ? (
          <Paper className={classes.Data} elevation={0}>
            <div className={classes.DataHead}>Days: </div>
            <div className={classes.Counts}>
              <div className={classes.Head}>
                <b>{store.userLeaveStats.days.applied}</b> Applied
              </div>
              <div className={classes.Head}>
                <b>{store.userLeaveStats.days.approved}</b> Approved
              </div>
              <div className={classes.Head}>
                <b>{store.userLeaveStats.days.rejected}</b> Rejected
              </div>
              <div className={classes.Head}>
                <b>
                  {store.userLeaveStats.days.applied -
                    (store.userLeaveStats.days.approved +
                      store.userLeaveStats.days.rejected)}
                </b>{" "}
                Pending
              </div>
            </div>
          </Paper>
        ) : null}
      </div>
      <LeaveList
        leaveData={store.listLeaveApplications}
        userData={store.allUsers}
        approveRejectClick={approveRejectClickHandle}
        deleteClickHanlde={deleteLeaveClickHandle}
      />
    </div>
  );

  return adminLeaveForm.show ? (
    <AdminLeaveForm
      approvalForm={adminLeaveForm.approval}
      backButtonClick={() =>
        setAdminLeaveForm({ approval: true, leaveId: "", show: false })
      }
      leaveId={adminLeaveForm.leaveId}
    />
  ) : (
    report()
  );
}

export default AdminLeaveReport;
