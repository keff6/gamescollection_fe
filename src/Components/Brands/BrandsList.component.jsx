import { Container, Row, Col } from "react-bootstrap";
import { useAppState } from "../../hooks";
import BrandCard from "./BrandCard.component";
import classes from "./Brands.module.css";

const BrandsList = () => {
  const { brand } = useAppState();

  let brands = brand?.list || [];

  return (
    <Container className={classes.mainDashboardContainer}>
      {brands.length > 0 ? (
        <Row>
          {brands.map((b) => (
            <Col key={b.id} lg={6} md={12} className={classes.customCol}>
              <BrandCard brandData={b} />
            </Col>
          ))}
        </Row>
      ) : <h3 className="empty-list-text">There are no brands yet!</h3>}
    </Container>
  );
};

export default BrandsList;
