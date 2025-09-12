import BrandsList from './BrandsList.component';
import classes from './Brands.module.css';

const Brands = () => {
  return (
    <>
      <header>
        <h4 className={classes.greyText}>Pick a brand</h4>
      </header>
      <BrandsList />
    </>
  )
}

export default Brands;