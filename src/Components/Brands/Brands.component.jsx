import { useContext } from 'react';
import { AppState } from "../../Config/store/state";
import BrandsList from './BrandsList.component';
import classes from './Brands.module.css';

const Brands = () => {
  const { brand } = useContext(AppState);

  return (
    <>
      <header>
        <h4 className={classes.greyText}>Pick a brand</h4>
      </header>
      <BrandsList
        brands={brand.list}
      />
    </>
  )
}

export default Brands;