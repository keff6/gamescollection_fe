import { useEffect, useCallback } from "react";
import useAppState from "../../../hooks/useAppState";
import Brands from "./Brands.component";
import { OPERATION_OUTCOME, ERROR_CODES, ENTITIES, API_ROUTES } from "../../../utils/constants";
import useAPI from "../../../hooks/useAPI";

const BrandsContainer = () => {
  const { setBrandsList, openSnackbar } = useAppState();
  const { get, post, del, put, error } = useAPI(true, ENTITIES.BRAND); 

  const getAllBrands = useCallback(async () => {
    const brands = await get(API_ROUTES.BRANDS.GET_ALL);
    setBrandsList(brands)
  }, [])

  useEffect(() => { getAllBrands() }, []);

  useEffect(() => {
    if(error) {
      const errorCode = error?.response?.data || "";
      let message = errorCode === ERROR_CODES.IS_REFERENCED ? "Cannot delete! It has consoles" : error.message;

      openSnackbar({message, type: OPERATION_OUTCOME.FAILED});
      getAllBrands();
    }
    
  }, [error, openSnackbar, getAllBrands]);

  const addBrand = async (brandObj) => {
    const responseMessage = await post(API_ROUTES.BRANDS.ADD, brandObj)
    openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
    getAllBrands();
  }

  const deleteBrand = async (selectedBrand) => {
    const responseMessage = await del(API_ROUTES.BRANDS.DELETE(selectedBrand.id));
    openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
    getAllBrands()
  }

  const updateBrand = async (brandId, brandObj) => {
    const responseMessage = await put(API_ROUTES.BRANDS.UPDATE(brandId), brandObj);
    openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
    getAllBrands()
  }

  return (
    <Brands
      addBrand={addBrand}
      deleteBrand={deleteBrand}
      updateBrand={updateBrand}
    />
  )
}

export default BrandsContainer