import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import classes from "./Employee.module.scss";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as yup from "yup";
import { UserFormModel } from "../../../types";
import ChipInput from "material-ui-chip-input";
import FormRender, { FormErrors } from "../../../hoc/FormRender";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppStateType } from "../../../types";
import { appStatusAction, lastAction } from "../../../store/Actions";
import { axiosWithAuth } from "../../../helpers";

const validateSchema = yup.object().shape<UserFormModel>({
  fullName: yup.string().required("Required."),
  email: yup.string().required("Required.").email("Enter valid email address"),
  doj: yup.string().required("Required").nullable(true),
  department: yup.string().required("Required."),
  designation: yup.string().required("Required."),
  role: yup.string().required("Required"),
  supervisorEmail: yup.array(yup.string()).required("Required"),
  isActive: yup.bool().required("Required."),
  password: yup.string().when("editPassword", {
    is: true,
    then: yup.string().required("Required").min(8, "Too Short"),
  }),
  confirmPassword: yup.string().when("editPassword", {
    is: true,
    then: yup.string().required("Required").min(8, "Too Short"),
  }),
  editPassword: yup.boolean().required("Required"),
});

interface Props {
  editForm: boolean;
  editId: string | number;
  cancelButton: () => void;
}

function UserForm(props: Props) {
  const formInitValues: UserFormModel = {
    confirmPassword: "",
    department: "",
    designation: "",
    doj: null,
    editPassword: true,
    email: "",
    fullName: "",
    role: "user",
    isActive: true,
    password: "",
    supervisorEmail: ["admin@yaqoobgroup.com"],
  };

  const formErrorsInit: FormErrors<UserFormModel> = {
    confirmPassword: "",
    department: "",
    designation: "",
    doj: "",
    editPassword: "",
    email: "",
    fullName: "",
    role: "",
    isActive: "",
    password: "",
    supervisorEmail: "",
  };

  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<UserFormModel>(formInitValues);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    if (props.editForm && props.editId !== 0) {
      if (store.currentUser.role === "admin") {
        let data = store.allUsers.find((d) => d.id === props.editId);
        if (data) {
          setFormValues({
            confirmPassword: "",
            department: data.department,
            designation: data.designation,
            doj: data.doj,
            editPassword: false,
            email: data.email,
            fullName: data.fullName,
            role: data.role,
            isActive: data.isActive,
            password: "",
            supervisorEmail: data.supervisorEmail,
          });

          if (data.email === "admin@yaqoobgroup.com") {
            setIsActive(true);
          }
          setIsUser(false);
        }
      }

      if (store.currentUser.role === "user") {
        setFormValues({
          confirmPassword: "",
          department: store.currentUser.department,
          designation: store.currentUser.designation,
          doj: store.currentUser.doj,
          editPassword: false,
          email: store.currentUser.email,
          fullName: store.currentUser.fullName,
          role: store.currentUser.role,
          isActive: store.currentUser.isActive,
          password: "",
          supervisorEmail: store.currentUser.supervisorEmail,
        });
        setIsActive(true);
        setIsUser(true);
      }
    }
  }, [props.editForm, props.editId, store.allUsers, store.currentUser]);

  const handleSubmit = async (values: UserFormModel) => {
    if (props.editForm && props.editId) {
      dispatch(appStatusAction(true, false, "Editing Employee"));
      const record = {
        ...values,
        clientTime: new Date().toString(),
      };
      axiosWithAuth()
        .post(`/editUser/${props.editId}`, record)
        .then((res) => {
          dispatch(lastAction(res.data.message));
          dispatch(appStatusAction(false, false, ""));
          setFormValues(formInitValues);
          props.cancelButton();
        })
        .catch((err) => {
          if (err.response.data.error) {
            dispatch(appStatusAction(false, true, err.response.data.error));
          } else {
            dispatch(appStatusAction(false, true, err.message));
          }
        });
    } else {
      dispatch(appStatusAction(true, false, "Adding Employee"));
      const record = {
        ...values,
        clientTime: new Date().toString(),
      };
      axiosWithAuth()
        .post("/register", record)
        .then((res) => {
          dispatch(lastAction(res.data.message));
          dispatch(appStatusAction(false, false, ""));
          setFormValues(formInitValues);
        })
        .catch((err) => {
          if (err.response.data.error) {
            dispatch(appStatusAction(false, true, err.response.data.error));
          } else {
            dispatch(appStatusAction(false, true, err.message));
          }
        });
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormValues({
      ...formValues,
      doj: new Date(date !== null ? date : new Date()).toDateString(),
    });
  };

  const handleChipsAdd = async (chips: string) => {
    const schema = yup.string().email().required();
    if (await schema.isValid(chips)) {
      setFormValues((prevState) => {
        return {
          ...prevState,
          supervisorEmail: [...prevState.supervisorEmail].concat(chips),
        };
      });
    }
  };

  const handleChipsRemove = (chips: string, index: number) => {
    setFormValues((prevState) => {
      return {
        ...prevState,
        supervisorEmail: prevState.supervisorEmail.filter(
          (d, i) => i !== index
        ),
      };
    });
  };

  const handleReset = () => {
    props.cancelButton();
    setFormValues(formInitValues);
  };

  return (
    <Paper className={classes.UserForm}>
      {store.responseText !== "" ? (
        <div
          style={{
            color: `${store.error ? "red" : "green"}`,
            fontSize: "1rem",
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
            <form onSubmit={bag.onSubmit}>
              <div className={classes.IsActive}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={bag.values.isActive}
                      onChange={bag.onChange}
                      name="isActive"
                      id="isActive"
                      color="primary"
                      disabled={isActive}
                    />
                  }
                  label="isActive"
                />
              </div>

              <TextField
                label="Full Name"
                id="fullName"
                name="fullName"
                variant="standard"
                margin={"dense"}
                value={bag.values.fullName}
                onChange={bag.onChange}
                onBlur={bag.onBlur}
                helperText={bag.errors.fullName}
                error={bag.errors.fullName !== ""}
              />

              <TextField
                label="Email"
                id="email"
                name="email"
                variant="standard"
                margin={"dense"}
                value={bag.values.email}
                onChange={bag.onChange}
                onBlur={bag.onBlur}
                helperText={bag.errors.email}
                error={bag.errors.email !== ""}
                disabled={isUser}
              />

              <div className={classes.PasswordField}>
                <div>
                  <TextField
                    label="Password"
                    id="password"
                    name="password"
                    variant="standard"
                    margin={"dense"}
                    type={"password"}
                    value={bag.values.password}
                    onChange={bag.onChange}
                    onBlur={bag.onBlur}
                    helperText={bag.errors.password}
                    error={bag.errors.password !== ""}
                  />
                </div>
                <div>
                  <TextField
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    variant="standard"
                    type={"password"}
                    margin={"dense"}
                    value={bag.values.confirmPassword}
                    onChange={bag.onChange}
                    onBlur={bag.onBlur}
                    helperText={bag.errors.confirmPassword}
                    error={bag.errors.confirmPassword !== ""}
                  />
                </div>
                <div className={classes.Edit}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={bag.values.editPassword}
                        onChange={bag.onChange}
                        name="editPassword"
                        id="editPassword"
                        color="primary"
                        disabled={!props.editForm}
                      />
                    }
                    label="Edit Password"
                  />
                </div>
              </div>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  showTodayButton={true}
                  openTo="date"
                  disabled={isUser}
                  disableFuture={true}
                  format={"MMMM do, yyyy"}
                  label={"Date of Joining"}
                  name={"doj"}
                  id={"doj"}
                  value={bag.values.doj}
                  onChange={handleDateChange}
                  helperText={bag.errors.doj !== "" ? bag.errors.doj : " "}
                  error={bag.errors.doj !== ""}
                />
              </MuiPickersUtilsProvider>

              <TextField
                label="Designation"
                id="designation"
                name="designation"
                variant="standard"
                margin={"dense"}
                disabled={isUser}
                value={bag.values.designation}
                onChange={bag.onChange}
                onBlur={bag.onBlur}
                helperText={bag.errors.designation}
                error={bag.errors.designation !== ""}
              />

              <TextField
                label="Department"
                id="department"
                name="department"
                variant="standard"
                margin={"dense"}
                disabled={isUser}
                value={bag.values.department}
                onChange={bag.onChange}
                onBlur={bag.onBlur}
                helperText={bag.errors.department}
                error={bag.errors.department !== ""}
              />

              <FormControl style={{ minWidth: "120px" }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={bag.values.role}
                  onChange={bag.onChange}
                  disabled={isUser}
                >
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"user"}>
                    User / Employee / Supervisor
                  </MenuItem>
                </Select>
                <FormHelperText>
                  {bag.errors.role ? bag.errors.role : " "}
                </FormHelperText>
              </FormControl>

              <ChipInput
                label="Supervisors / Management Emails"
                id="supervisorEmail"
                newChipKeys={[","]}
                value={bag.values.supervisorEmail}
                onAdd={handleChipsAdd}
                onDelete={handleChipsRemove}
                disabled={isUser}
                helperText={
                  bag.errors.supervisorEmail
                    ? `${bag.errors.supervisorEmail}! Enter comma seperated list of emails`
                    : "Enter comma seperated list of emails"
                }
                error={bag.errors.supervisorEmail !== ""}
              />

              <ButtonGroup className={classes.BtnGroup}>
                <Button
                  type={"submit"}
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  Save
                </Button>
                <Button
                  type={"button"}
                  variant="contained"
                  color="default"
                  disableElevation
                  onClick={handleReset}
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

export default UserForm;
