import { ChevronDoubleRight } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import proptypes from 'prop-types';
import { useAppState } from '../../hooks';
import classes from './Brands.module.css';
import { Link } from "react-router-dom";

const BrandCard = ({brandData}) => {
  const { setSelectedBrand } = useAppState();
  const navigate = useNavigate();

  const navigateToConsoleHandler = () => {
    setSelectedBrand({...brandData})
    navigate(`/${brandData.id}/consoles`)
  }

  return (
    <Link className={classes.brandCard} as="button" onClick={navigateToConsoleHandler}>
      <div className={classes.brandMainContainer}>
        <div className={classes.cardText}>
          {brandData.logoUrl ?
            <img className={classes.logoImg} src={brandData.logoUrl} alt={brandData.name} />
              : <span className={classes.brandText}>{brandData.name}</span>}
            <p>{brandData?.totalConsoles || '0'} {brandData?.totalConsoles === 1 ? 'Console' : 'Consoles'}</p>
        </div>
        <ChevronDoubleRight />
      </div>
    </Link>
  ) 
}

BrandCard.propTypes = {
  brandData: proptypes.object,
}

export default BrandCard;