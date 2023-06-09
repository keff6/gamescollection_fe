import { useContext } from 'react';
import { AppState } from "../Config/store/state";
import BrandsList from './BrandsList.component';

const Brands = () => {
  const { brand } = useContext(AppState);

  return (
    <BrandsList
      brands={brand.list}
    />
  )
}

export default Brands;