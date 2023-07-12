import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import proptypes from "prop-types";
import { AppState } from "../Config/store/state";
import ConsoleCard from "./ConsoleCard.component";
import { Spinner } from "../Common";
import classes from './Consoles.module.css';

const ConsolesList = ({consoles, editConsole, deleteConsole}) => {
  const { isLoading } = useContext(AppState);

  if(isLoading) return <Spinner />

  return (
    <Container className={classes.mainDashboardContainer}>
      {(consoles.length > 0) &&
      <Row className={`justify-content-md-center`} >
        {consoles.map(c => (
          <Col key={c.id} lg={12} className={classes.customCol}>
            <ConsoleCard consoleData={c} editConsole={editConsole} deleteConsole={deleteConsole} />
          </Col>
        ))}
      </Row>}
      {(consoles.length === 0) && <h3>There are no consoles yet!</h3>}
    </Container>
  )
}

ConsolesList.propTypes = {
  consoles: proptypes.array,
  deleteConsole: proptypes.func,
  editConsole: proptypes.func,
}

export default ConsolesList;