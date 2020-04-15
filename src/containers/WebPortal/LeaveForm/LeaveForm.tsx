import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import differenceInDays from "date-fns/differenceInDays";
import classes from "./LeaveForm.module.scss";
import * as yup from "yup";
import { LeaveApplication, AppStateType } from "../../../types";
import FormRender, { FormErrors } from "../../../hoc/FormRender";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { leaveApplicationsByUserId } from "../../../store/Effects";
import {
  axiosEmail,
  applicationBody,
  leaveApplicationHtmlEmail,
  leaveApplicationTextEmail,
  axiosWithAuth,
} from "../../../helpers";
import Loader from "../../../components/Loader";
import { appStatusAction } from "../../../store/Actions";

const validateSchema = yup.object().shape<LeaveApplication>({
  startDate: yup.string().required("Please enter start date.").nullable(true),
  endDate: yup.string().required("Please enter end date.").nullable(true),
  reason: yup.string().required("Please enter reason."),
});

function LeaveForm() {
  const formInitValues: LeaveApplication = {
    endDate: null,
    reason: "",
    startDate: null,
  };

  const formErrorsInit: FormErrors<LeaveApplication> = {
    endDate: "",
    reason: "",
    startDate: "",
  };

  const [formValues, setFormValues] = useState<LeaveApplication>(
    formInitValues
  );
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  const dispatch = useDispatch();

  const [days, setDays] = useState<number>(0);

  const emailList = store.currentUser.supervisorEmail.map((d) => {
    return {
      email: d,
    };
  });

  const handleSubmit = async (values: LeaveApplication) => {
    try {
      dispatch(appStatusAction(true, false, ""));

      // const emailId = await axiosEmail()
      //   .post(
      //     "/email",
      //     applicationBody(
      //       store.currentUser.fullName,
      //       store.currentUser.email,
      //       emailList,
      //       `(Leave Application) - ${store.currentUser.fullName}`,
      //       leaveApplicationHtmlEmail(
      //         store.currentUser.fullName,
      //         store.currentUser.designation,
      //         store.currentUser.department,
      //         values.startDate!.toString(),
      //         values.endDate!.toString(),
      //         days,
      //         values.reason
      //       ),
      //       leaveApplicationTextEmail(
      //         store.currentUser.fullName,
      //         store.currentUser.designation,
      //         store.currentUser.department,
      //         values.startDate!.toString(),
      //         values.endDate!.toString(),
      //         days,
      //         values.reason
      //       )
      //     )
      //   )
      //   .catch((err) => {
      //     console.log(err.response.data);
      //     throw new Error(err.response.data);
      //   });

      const record = {
        userId: store.currentUser.id,
        emailSentId: "testing...", //emailId.data.messageId,
        endDate: values.endDate,
        reason: values.reason,
        startDate: values.startDate,
        leaveDays: days,
        status: "open",
        statusRemarks: "",
        clientTime: new Date().toString(),
      };

      axiosWithAuth()
        .post("/addLeaveApplication", record)
        .then((res) => {
          setFormValues(formInitValues);
        })
        .catch((err) => {
          if (err.response.data.error) {
            dispatch(appStatusAction(false, true, err.response.data.error));
          } else {
            dispatch(appStatusAction(false, true, err.message));
          }
        });

      setDays(0);
      
      dispatch(leaveApplicationsByUserId(store.currentUser.id));
      dispatch(appStatusAction(false, false, "Leave Application Submitted"));
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

  const handleStartDateChange = (date: Date | null) => {
    setFormValues({
      ...formValues,
      startDate: new Date(date !== null ? date : new Date()).toDateString(),
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    setFormValues({
      ...formValues,
      endDate: new Date(date !== null ? date : new Date()).toDateString(),
    });

    calculateDays(new Date(date !== null ? date : new Date()).toDateString());
  };

  const calculateDays = (dateEnd: string | null) => {
    let start = formValues.startDate
      ? new Date(formValues.startDate)
      : new Date(0, 0, 0);
    let end = dateEnd ? new Date(dateEnd) : new Date(0, 0, 0);
    setDays(differenceInDays(end, start) + 1);
  };

  return (
    <Paper className={classes.Application}>
      {store.loading ? <Loader /> : null}
      <div className={classes.Header}>
        Leave Application{" "}
        {days > 0 ? (
          <span>
            for{" "}
            <span style={{ fontSize: "1.25rem" }}>
              [ {days} {days > 1 ? "days" : "day"} ]
            </span>
          </span>
        ) : null}
      </div>
      {store.responseText !== "" ? (
        <div
          style={{
            color: `${store.error ? "red" : "green"}`,
            fontSize: "2rem",
            marginTop: "15px",
          }}
        >
          {store.responseText}
        </div>
      ) : null}
      <FormRender
        initValues={formInitValues}
        formValues={formValues}
        setFormValues={setFormValues}
        initErrors={formErrorsInit}
        validateSchema={validateSchema}
        onSubmit={handleSubmit}
        render={(bag) => {
          return (
            <form onSubmit={bag.onSubmit} onReset={bag.onReset}>
              <div className={classes.DatesField}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    showTodayButton={true}
                    openTo="date"
                    disablePast={true}
                    format={"MMMM do, yyyy"}
                    label={"Start Date"}
                    name={"startDate"}
                    id={"startDate"}
                    value={bag.values.startDate}
                    onChange={handleStartDateChange}
                    helperText={
                      bag.errors.startDate !== "" ? bag.errors.startDate : " "
                    }
                    error={bag.errors.startDate !== ""}
                  />
                  <DatePicker
                    showTodayButton={true}
                    openTo="date"
                    disablePast={true}
                    label={"End Date"}
                    format={"MMMM do, yyyy"}
                    name={"endDate"}
                    id={"endDate"}
                    minDate={bag.values.startDate}
                    disabled={bag.values.startDate === null}
                    value={bag.values.endDate}
                    onChange={handleEndDateChange}
                    helperText={
                      bag.errors.endDate !== "" ? bag.errors.endDate : " "
                    }
                    error={bag.errors.endDate !== ""}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <TextField
                id="reason"
                name="reason"
                label={"Reason for leave is: "}
                variant="standard"
                multiline={true}
                rows={8}
                margin={"dense"}
                value={bag.values.reason}
                onChange={bag.onChange}
                onBlur={bag.onBlur}
                className={classes.TextFields}
                error={bag.errors.reason !== ""}
                helperText={bag.errors.reason !== "" ? bag.errors.reason : " "}
              />
              <ButtonGroup className={classes.BtnGroup}>
                <Button
                  type={"submit"}
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  Send
                </Button>
                <Button
                  type={"reset"}
                  variant="contained"
                  color="default"
                  disableElevation
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </form>
          );
        }}
      />
    </Paper>
  );
}

export default LeaveForm;
