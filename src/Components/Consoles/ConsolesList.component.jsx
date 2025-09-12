import { Container, Row, Col } from "react-bootstrap";
import proptypes from "prop-types";
import useAppState from "../../hooks/useAppState";
import ConsoleCard from "./ConsoleCard.component";
import { Spinner } from "../../Common";
import classes from "./Consoles.module.css";

const ConsolesList = ({ editConsole, deleteConsole, viewDetails }) => {
  const { isLoading, console } = useAppState();

  if (isLoading) return <Spinner />;

  let consoles = console?.list || [];

  return (
    <Container className={classes.mainDashboardContainer}>
      {consoles.length > 0 ? (
        <Row className={`justify-content-md-center`}>
          {consoles.map((c) => (
            <Col key={c.id} lg={12} className={classes.customCol}>
              <ConsoleCard
                consoleData={c}
                editConsole={editConsole}
                deleteConsole={deleteConsole}
                viewDetails={viewDetails}
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
  viewDetails: proptypes.func,
};

export default ConsolesList;
