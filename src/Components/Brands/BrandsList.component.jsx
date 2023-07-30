import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import proptypes from "prop-types";
import { AppState } from "../../Config/store/state";
import Spinner from "../../Common/Spinner/Spinner.component";
import BrandCard from "./BrandCard.component";
import classes from './Brands.module.css';

const BrandsList = ({brands}) => {
  const { isLoading } = useContext(AppState);

  if(isLoading) return <Spinner />

  return (
    <Container className={classes.mainDashboardContainer}>
        {(brands.length > 0) &&
        <Row>
          {brands.map(b => (
            <Col key={b.id} lg={6} md={12} className={classes.customCol}>
              <BrandCard brandData={b} />
            </Col>
          ))}
        </Row>}
        {(brands.length === 0) && <h3 className="empty-list-text">There are no brands yet!</h3>}
      </Container>
)
          }

BrandsList.propTypes = {
  brands: proptypes.array,
}

export default BrandsList;