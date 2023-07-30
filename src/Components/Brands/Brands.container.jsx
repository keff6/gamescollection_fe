import { useEffect, useContext } from "react";
import { AppState } from "../../Config/store/state";
import { BrandService } from '../../services';
import { OPERATION_OUTCOME } from "../../utils/constants";
import Brands from "./Brands.component";

const BrandsContainer = () => {
  const { setBrandsList, openSnackbar, setIsLoading } = useContext(AppState);

  useEffect(() => {
    getAllBrands();
  }, []);

  const getAllBrands = async () => {
    try {
      setIsLoading(true)
      const response = await BrandService.getAll();
      setBrandsList(response.data)
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Brands />
  )
}

export default BrandsContainer