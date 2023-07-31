import { Form, Button } from 'react-bootstrap';
import ControllerImage from '../../images/controller.png'

import classes from "./Login.module.css";

const Login = () => {
  const handleSubmit = () => {
    console.log('Submitted')
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
              <h3>Games Collection</h3>
              <h6>Sign in to your account</h6>
            </header>
            <Form id="loginForm" noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  // value={consoleObj.name}
                  // onChange={(e) => handleChange("name", e.target.value)}
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
                  // value={consoleObj.name}
                  // onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password.
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" form="loginForm" type="submit">Log In</Button>
            </Form>
          </div>
        </div>

    </div>
  )
}

export default Login;