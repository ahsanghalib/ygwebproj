import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import classes from "./Login.module.scss";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import * as yup from "yup";
import FormRender, { FormErrors } from "../../../hoc/FormRender";
import Loader from "../../../components/Loader";
import { LoginForm, AppStateType } from "../../../types";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { UserLogin } from "../../../store/Effects";

const validateSchema = yup.object().shape<LoginForm>({
  email: yup.string().required("Required").email("Enter valid email address"),
  password: yup.string().required("Required."),
});

function Login() {
  const formInitValues: LoginForm = {
    password: "",
    email: "",
  };

  const formInitErrors: FormErrors<LoginForm> = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState<LoginForm>(formInitValues);
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  const dispatch = useDispatch();

  const handleSubmit = async (value: LoginForm) => {
    dispatch(UserLogin(value));
  };

  return (
    <div className={classes.Login}>
      {store.loading ? <Loader /> : null}
      <Paper className={classes.Outer}>
        <div className={classes.Header}>Login</div>
        {store.error ? (
          <div
            style={{
              paddingTop: "10px",
              textAlign: "center",
              color: "red",
              fontSize: "1rem",
            }}
          >
            {store.responseText}
          </div>
        ) : null}
        <FormRender
          initValues={formInitValues}
          initErrors={formInitErrors}
          validateSchema={validateSchema}
          onSubmit={handleSubmit}
          setFormValues={setFormValues}
          formValues={formValues}
          render={(bag) => {
            return (
              <form onSubmit={bag.onSubmit} onReset={bag.onReset}>
                <TextField
                  id="email"
                  label={"Email Address"}
                  name="email"
                  variant="standard"
                  margin={"dense"}
                  value={bag.values.email}
                  onChange={bag.onChange}
                  onBlur={bag.onBlur}
                  className={classes.TextFields}
                  helperText={bag.errors.email !== "" ? bag.errors.email : " "}
                  error={bag.errors.email !== ""}
                />
                <TextField
                  id="password"
                  name="password"
                  label={"Password"}
                  variant="standard"
                  margin={"dense"}
                  type={"password"}
                  value={bag.values.password}
                  onChange={bag.onChange}
                  onBlur={bag.onBlur}
                  className={classes.TextFields}
                  helperText={
                    bag.errors.password !== "" ? bag.errors.password : " "
                  }
                  error={bag.errors.password !== ""}
                />
                <ButtonGroup className={classes.BtnGroup}>
                  <Button
                    type={"submit"}
                    variant="contained"
                    color="primary"
                    disableElevation
                  >
                    Login
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
    </div>
  );
}

export default Login;
