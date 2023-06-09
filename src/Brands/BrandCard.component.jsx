import { Card, Button } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import proptypes from 'prop-types';
import classes from './Brands.module.css';


const BrandCard = ({brandName, brandLogoUrl}) => (
    <Card className={classes.card}>
      <Card.Body className={classes.cardBody}>
        <Card.Title>
          {brandLogoUrl ?
          <img className={classes.logoImg} src={brandLogoUrl} alt={brandName} />
          : <span className={classes.brandText}>{brandName}</span>}
        </Card.Title>
        <Button variant="primary">Go <ArrowRight /></Button>
      </Card.Body>
    </Card>
);

BrandCard.propTypes = {
  brandLogoUrl: proptypes.string,
  brandName: proptypes.string,
}

export default BrandCard;