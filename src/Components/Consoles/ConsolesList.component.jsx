import { Container, Row, Col } from "react-bootstrap";
import proptypes from "prop-types";
import { useAppState } from "../../hooks";
import ConsoleCard from "./ConsoleCard.component";
import classes from "./Consoles.module.css";

const ConsolesList = ({ editConsole, deleteConsole }) => {
  const { console } = useAppState();
  let consoles = console?.list || [];

  return (
    <Container className={classes.mainDashboardContainer}>
      {consoles.length > 0 ? (
        <Row>
          {consoles.map((c) => (
            <Col key={c.id} lg={6} md={12} className={classes.customCol}>
              <ConsoleCard
                consoleData={c}
                editConsole={editConsole}
                deleteConsole={deleteConsole}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <h3 className="empty-list-text">There are no consoles yet!</h3>
      )}
    </Container>
  );
};

ConsolesList.propTypes = {
  deleteConsole: proptypes.func,
  editConsole: proptypes.func,
};

export default ConsolesList;
