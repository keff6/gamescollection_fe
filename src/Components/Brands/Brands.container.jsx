import { useEffect, useCallback } from "react";
import { useAppState, useAPI, useApiErrorHandler} from "../../hooks";
import { ENTITIES, API_ROUTES } from "../../utils/constants";
import Brands from "./Brands.component";

const BrandsContainer = () => {
  const { setBrandsList } = useAppState();
  const { get, error } = useAPI(true, ENTITIES.BRAND);
  useApiErrorHandler(error)

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

  return (
    <Brands />
  )
}

export default BrandsContainer