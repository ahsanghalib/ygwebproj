import React, { useEffect, useState } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { getAllUsersList, deleteUser } from "../../../store/Effects";
import { AppStateType } from "../../../types";
import Paper from "@material-ui/core/Paper";
import classes from "./Employee.module.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TablePagination from "@material-ui/core/TablePagination";
import Loader from "../../../components/Loader";
import DialogBox from "../../../components/DialogBox";

interface Props {
  userAddEditForm: (edit: boolean, id: string | number) => void;
}

function EmployeeList(props: Props) {
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [showConfim, setShowConfirm] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (store.currentUser.role === "admin") {
      dispatch(getAllUsersList());
    }
  }, [dispatch, store.currentUser.role]);

  const onPageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteRecord = () => {
    setShowConfirm(false);
    if (userId !== "") dispatch(deleteUser(userId));
  };

  const confirmationDialog = (id: string) => {
    setUserId(id);
    setShowConfirm(true);
  };

  const employeeTable = () => {
    return (
      <TableContainer>
        <DialogBox
          content="Are you sure you want to delete this record?"
          title="Delete"
          open={showConfim}
          onCancel={() => setShowConfirm(false)}
          onOkay={deleteRecord}
        />
        <Table
          size="small"
          aria-label="employee list table"
          stickyHeader={true}
        >
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date of Joining</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>isActive</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.allUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => props.userAddEditForm(true, row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => confirmationDialog(row.id)}
                      disabled={row.email === "admin@yaqoobgroup.com"}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.fullName}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.doj}</TableCell>
                  <TableCell style={{ textTransform: "capitalize" }}>
                    {row.designation}
                  </TableCell>
                  <TableCell style={{ textTransform: "capitalize" }}>
                    {row.department}
                  </TableCell>
                  <TableCell>{row.isActive ? "Yes" : "No"}</TableCell>
                  <TableCell style={{ textTransform: "capitalize" }}>
                    {row.role}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className={classes.Pagination}>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, 50]}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onPageChange}
            onChangeRowsPerPage={onRowsPerPageChange}
            count={store.allUsers.length}
          />
        </div>
      </TableContainer>
    );
  };

  return (
    <Paper className={classes.EmployeeList}>
      {store.loading ? <Loader /> : null}
      <div className={classes.Header}>List of All Employees / Records</div>
      {store.allUsers.length === 0 ? (
        <div className={classes.NoRecord}>
          No Employees Added. Please add new.
        </div>
      ) : (
        employeeTable()
      )}
    </Paper>
  );
}

export default EmployeeList;
