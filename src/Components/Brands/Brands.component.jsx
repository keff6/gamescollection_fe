import useAppState from '../../hooks/useAppState';
import BrandsList from './BrandsList.component';
import classes from './Brands.module.css';

const Brands = () => {
  const { brand } = useAppState();

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