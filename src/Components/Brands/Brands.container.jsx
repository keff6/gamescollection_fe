import { useEffect, useCallback } from "react";
import useAppState from "../../hooks/useAppState";
import { OPERATION_OUTCOME, ENTITIES, API_ROUTES } from "../../utils/constants";
import Brands from "./Brands.component";
import useAPI from "../../hooks/useAPI";

const BrandsContainer = () => {
  const { setBrandsList, openSnackbar } = useAppState();
  const { get, error } = useAPI(true, ENTITIES.BRAND); 

  const getAllBrands = useCallback(async () => {
      const brands = await get(API_ROUTES.BRANDS.GET_ALL);
      setBrandsList(brands)
    }, [])

  useEffect(() => {
    getAllBrands();

    return () => {
      setBrandsList([])
    }
  }, []);

  useEffect(() => {
    if(error) {
      openSnackbar({message: error?.message, type: OPERATION_OUTCOME.FAILED});
    }
    
  }, [error, openSnackbar, getAllBrands]);

  return (
    <Brands />
  )
}

export default BrandsContainer