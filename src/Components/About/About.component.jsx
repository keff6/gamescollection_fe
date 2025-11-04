import {
  Linkedin,
  Github,
  Envelope,
  FileTextFill,
  Joystick
} from "react-bootstrap-icons";
import { Nav } from "react-bootstrap";
import MeImage from '../../images/me.png'
import classes from "./About.module.css";

const About = () => (
  <div>
    <div className={classes.aboutProjectContainer}>
        <div className={classes.titleContainer}>
          <Joystick />
          <span>About the project</span>
        </div>
      <p>
        As a lifelong gamer and collector, keeping track of my growing library
        became a challenge — I even bought the same game twice! That’s what
        inspired me to create this app: a simple way to organize my collection
        and a chance to grow as a developer.
      </p>
      <p>
        What started as sketches in a notebook has become a working project
        built from scratch, shaped by curiosity, learning, and a love for both
        gaming and coding.
      </p>
    </div>
    <div className={classes.aboutMeContainer}>
      <div className={classes.titleContainer}>
        <img src={MeImage} alt="Profile Image" className={classes.profileImage}/>
        <span>About me</span>
      </div>
      <p>
        Hi, my name is Kevin, I’m a software engineer with over 10 years of
        experience in web development and a lifelong passion for creating
        useful, well-crafted tools. I enjoy turning ideas into working projects,
        learning something new with each one.
      </p>
      <p>
        Whether collaborating in a team or building solo projects like this app,
        I love exploring new technologies and finding elegant solutions to real
        problems. For me, every project is both a challenge and a chance to
        grow.
      </p>
      <p>
        When I’m not coding, I’m probably gaming or tinkering with new ideas.
        You can check out what I’ve been up to through the links below.
      </p>
      <div className={classes.iconsContainer}>
        <Nav.Link
          href="https://www.linkedin.com/in/kevin-fallas/"
          target="_blank"
        >
          <Linkedin />
          <span className={classes.linkLabel}>linkedin.com/in/kevin-fallas</span>
        </Nav.Link>
        <Nav.Link href="https://github.com/keff6" target="_blank">
          <Github />
          <span className={classes.linkLabel}>github.com/keff6</span>
        </Nav.Link>
        <Nav.Link as="a" href="mailto:kev.fallas@gmail.com" target="_blank">
          <Envelope />
          <span className={classes.linkLabel}>Send me an eMail!</span>
        </Nav.Link>
        <Nav.Link
          as="a"
          href="https://keff6.github.io/my-resume/"
          target="_blank"
        >
          <FileTextFill />
          <span className={classes.linkLabel}>My Resume</span>
        </Nav.Link>
      </div>
    </div>
  </div>
);

export default About;
