import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from 'react-bootstrap';
import { Joystick } from 'react-bootstrap-icons';
import proptypes from 'prop-types';
import ControllerImage from '../../images/controller.png'
import classes from "./Login.module.css";

const USER_DEFAULT = {
  username: '',
  password: ''
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter a valid username"),
  password: Yup.string()
    .required("Password is required"),
});

const Login = ({ authenticateUser }) => (
  <div className={classes.loginContainer}>
    <div className={`${classes.leftHalf} d-none d-md-block`}>
      <div className={classes.outerImage}>
        <img src={ControllerImage} alt="Img" />
        <div className={classes.overlay}></div>
      </div>
    </div>
    <div className={classes.rightHalf}>
      <div className={classes.loginFormContainer}>
        <header>
          <h3><Joystick /><span>Games Collection</span></h3>
          <h6 className='sub-title-2'>Sign in to your account</h6>
        </header>
        <Formik
          initialValues={USER_DEFAULT}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await authenticateUser(values);
              resetForm();
            } catch(err) {
              console.log({err})
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form id="loginForm" noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  onChange={handleChange}
                  value={values.username}
                  onBlur={handleBlur}
                  isInvalid={touched.username && !!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" form="loginForm" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Log In"}
              </Button>
            </Form>
            )}
        </Formik>
      </div>
    </div>
</div>
)

Login.propTypes = {
  authenticateUser: proptypes.func,
}

export default Login;