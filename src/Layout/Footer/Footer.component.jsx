import { Linkedin, Github, Envelope } from 'react-bootstrap-icons'
import { Nav } from 'react-bootstrap'
import classes from './Footer.module.css'

const Footer = () => (
  <div className={classes.footerContainer}>
    <div className={classes.footerContent}>
      <span className={classes.nameLabel}>2025 Kevin Fallas</span>
      <div className={classes.divider}></div>
      <div className={classes.iconsContainer}>
        <Nav.Link href="https://www.linkedin.com/in/kevin-fallas/" target="_blank"><Linkedin /></Nav.Link>
        <Nav.Link href="https://github.com/keff6" target="_blank"><Github /></Nav.Link>
        <Nav.Link as="a" href="mailto:kev.fallas@gmail.com" target="_blank"><Envelope /></Nav.Link>
      </div>
    </div>
  </div>
)

export default Footer