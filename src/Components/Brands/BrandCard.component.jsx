import { useContext } from 'react';
import { Card, Button } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import proptypes from 'prop-types';
import { AppState } from "../../Config/store/state";
import classes from './Brands.module.css';

const BrandCard = ({brandData}) => {
  const { setSelectedBrand } = useContext(AppState);
  const navigate = useNavigate();

  const navigateToConsoleHandler = () => {
    setSelectedBrand({...brandData})
    navigate(`/${brandData.id}/consoles`)
  }

  console.log(brandData.logoUrl)
  return (
    <Card className={classes.card}>
      <Card.Body className={classes.cardBody}>
        <Card.Title>
          {brandData.logoUrl ?
          <img className={classes.logoImg} src={brandData.logoUrl} alt={brandData.name} />
          : <span className={classes.brandText}>{brandData.name}</span>}
        </Card.Title>
        <footer className={classes.cardFooter}>
          <Button
            variant="primary"
            onClick={navigateToConsoleHandler}
          >
            Go <ArrowRight />
          </Button>
        </footer>
      </Card.Body>
    </Card>
  ) 
}

BrandCard.propTypes = {
  brandData: proptypes.object,
}

export default BrandCard;