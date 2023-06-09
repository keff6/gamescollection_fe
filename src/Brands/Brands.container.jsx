import { useEffect, useState, useContext } from "react";
import { AppState } from "../Config/store/state";
import BrandService from '../services/BrandService';
import Brands from "./Brands.component";
import { OPERATION_OUTCOME } from "../utils/constants";
import Spinner from "../Common/Spinner/Spinner.component";

const BrandsContainer = () => {
  const { brand, setBrandsList, openSnackbar } = useContext(AppState);
  const [isLoading, setIsLoading] = useState(false)

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

  return isLoading ? <Spinner />
  : brand.list && (
    <Brands />
    )
}

export default BrandsContainer