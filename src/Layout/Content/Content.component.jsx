import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import proptypes from 'prop-types';
// import classes from './content.module.css'

const Content = ({children}) => {
  return (
      <main >
        <Container>
          <Row>
            <Col lg={2} />
            <Col lg={8}>{children}</Col>
            <Col lg={2} />
          </Row>
        </Container>
      </main>
    )
  }

Content.propTypes = {
  children: proptypes.node,
}


export default Content;