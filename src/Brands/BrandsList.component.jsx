import { Container, Row, Col } from "react-bootstrap";
import proptypes from "prop-types";
import BrandCard from "./BrandCard.component";
import classes from './Brands.module.css';

const BrandsList = ({brands}) => (
    <Container className={classes.mainDashboardContainer}>
        {(brands.length > 0) &&
        <Row className={`justify-content-md-center`} >
          {brands.map(b => (
            <Col key={b.id} lg={6} md={12} className={classes.customCol}>
              <BrandCard brandName={b.name} brandLogoUrl={b.logourl} />
            </Col>
          ))}
        </Row>}
        {(brands.length === 0) && <h3>There are no brands yet!</h3>}
      </Container>
)

BrandsList.propTypes = {
  brands: proptypes.array,
}

export default BrandsList;