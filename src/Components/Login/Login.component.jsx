import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Joystick } from 'react-bootstrap-icons';
import proptypes from 'prop-types';
import ControllerImage from '../../images/controller.png'
import classes from "./Login.module.css";

const USER_DEFAULT = {
  username: '',
  password: ''
}

const Login = ({authenticateUser}) => {
  const [userObj, setUserObj] = useState(USER_DEFAULT);
  const [validated, setValidated] = useState(false);


  const handleChange = ({target}) => {
    const {name, value} = target;
    setUserObj({
      ...userObj,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if(validateForm(form)) {
      console.warn("Valida data submitted")
      authenticateUser(userObj)
    }  
  }

  const validateForm = (formValues) => {
    let isValid = false;
    if (formValues.checkValidity()) isValid = true
    setValidated(true)
    return isValid;
  }

  return (
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
              <h6>Sign in to your account</h6>
            </header>
            <Form id="loginForm" validated={validated} noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={userObj.username}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={userObj.password}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password.
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" form="loginForm" type="submit">Log In</Button>
            </Form>
          </div>
          <p className={classes.version}>{`ver. ${import.meta.env.PACKAGE_VERSION}`}</p>
        </div>

    </div>
  )
}

Login.propTypes = {
  authenticateUser: proptypes.func,
}

export default Login;