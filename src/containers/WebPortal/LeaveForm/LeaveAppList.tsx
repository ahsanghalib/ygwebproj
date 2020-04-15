import React from "react";
import Paper from "@material-ui/core/Paper";
import classes from "./LeaveForm.module.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSelector, shallowEqual } from "react-redux";
import { AppStateType } from "../../../types";
import format from "date-fns/format";

function LeaveAppList() {
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );

  const userApplicatoinsList = () => {
    return (
      <TableContainer>
        <Table
          size="small"
          aria-label="employee list table"
          stickyHeader={true}
        >
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sent Date</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.currentUserLeaveApplications.length < 0 ? (
              <div style={{ fontWeight: 500, textAlign: "center" }}>
                No Leave Applications
              </div>
            ) : (
              store.currentUserLeaveApplications.map((row, index) => (
                <TableRow
                  key={row.id}
                  style={{
                    backgroundColor: `${
                      row.status === "open"
                        ? "#eee"
                        : row.status === "approved"
                        ? "lightgreen"
                        : "lightcoral"
                    }`,
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell style={{ textTransform: "capitalize" }}>
                    {row.status}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ minWidth: "100px" }}
                  >
                    {format(new Date(row.clientTime), "dd-MMM-yyyy, hh:mm a")}
                  </TableCell>
                  <TableCell style={{ width: "15%", minWidth: "200px" }}>
                    {row.leaveDays}
                    {row.leaveDays > 0 ? " Days " : " Day "}
                    <br />[{row.startDate}
                    {row.endDate !== row.startDate
                      ? ` to ${row.endDate}`
                      : null}
                    ]
                  </TableCell>
                  <TableCell
                    style={{
                      textTransform: "capitalize",
                      width: "25%",
                      minWidth: "300px",
                    }}
                  >
                    {row.reason}
                  </TableCell>
                  <TableCell
                    style={{ textTransform: "capitalize", minWidth: "100px" }}
                  >
                    {row.statusRemarks}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  return (
    <Paper className={classes.LeaveAppList}>
      {store.currentUser.role === "user" ? userApplicatoinsList() : null}
    </Paper>
  );
}

export default LeaveAppList;
