import { Form, Button, Alert, NavItem } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { ModalWindow } from "../components/ModalWindow";
import * as yup from 'yup';
import { Formik } from "formik";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().required().max(256).matches(/^[A-Za-z0-9_.]+$/),
  password: yup.string().required().max(256).matches(/^[A-Za-z0-9_.]+$/),
});

export function SignIn({ isAuth, setUserAuthName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const handleSubmit = async (values, { setStatus }) => {
    const response = await fetch("api/auth/signin", {
      method: "Post",
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
      headers: { 'Content-type': 'application/json' }
    });

    if (response.ok) {
      const data = await response.json();
      setUserAuthName(data["username"]);

      if (!params.get("returnUrl"))
        navigate("/", { replace: true });
      else
        navigate(`${params.get("returnUrl")}`, { replace: true });
    }
    else {
      const data = await response.json();
      setStatus(data["errorMessage"]);
    }
  }

  useEffect(() => {
    if (isAuth)
      navigate("/", { replace: true });
  }, [isAuth]);

  return (
    <ModalWindow show={true} onHide={() => navigate("/")} header={"Sign in"} size="none">
      <Formik
        validationSchema={schema}
        initialValues={{
          username: "",
          password: "",
        }}
        initialErrors={{
          username: true,
          password: true,
        }}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          isSubmitting,
          errors,
          status,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="Enter username"
                disabled={isSubmitting}
                isValid={!errors.username}
                isInvalid={!!errors.username} />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                value={values.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                disabled={isSubmitting}
                isValid={!errors.password}
                isInvalid={!!errors.password} />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            {!!status && <Alert variant="danger">
              {status}
            </Alert>}
            <NavItem>
              <NavLink className="text-dark fw-bolder bg-light ms-1" to={`/signup${!params.get("returnUrl") ? "" : "?returnUrl=" + params.get("returnUrl")}`}>
                Sign up instead
              </NavLink>
            </NavItem>
            <Button variant="primary" type="submit" disabled={isSubmitting} >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
    </ModalWindow>
  );
}