import { Card, Button } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import proptypes from 'prop-types';
import useAppState from '../../hooks/useAppState';
import classes from './Brands.module.css';

const BrandCard = ({brandData}) => {
  const { setSelectedBrand } = useAppState();
  const navigate = useNavigate();

  const navigateToConsoleHandler = () => {
    setSelectedBrand({...brandData})
    sessionStorage.setItem("brandData", JSON.stringify(brandData))
    navigate(`/${brandData.id}/consoles`)
  }

  return (
    <Card className={classes.card}>
      <Card.Body className={classes.cardBody}>
        <Card.Title>
          {brandData.logoUrl ?
          <img className={classes.logoImg} src={brandData.logoUrl} alt={brandData.name} />
          : <span className={classes.brandText}>{brandData.name}</span>}
        </Card.Title>
        <Button
          variant="primary"
          onClick={navigateToConsoleHandler}
        >
          Go <ArrowRight />
        </Button>
      </Card.Body>
    </Card>
  ) 
}

BrandCard.propTypes = {
  brandData: proptypes.object,
}

export default BrandCard;