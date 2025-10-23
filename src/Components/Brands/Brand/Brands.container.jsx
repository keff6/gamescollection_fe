import { useEffect, useCallback } from "react";
import { useAppState, useAPI, useApiErrorHandler } from "../../../hooks";
import { OPERATION_OUTCOME, ENTITIES, API_ROUTES } from "../../../utils/constants";
import Brands from "./Brands.component";

const BrandsContainer = () => {
  const { setBrandsList, openSnackbar } = useAppState();
  const { get, post, del, put, error } = useAPI(true, ENTITIES.BRAND); 
  useApiErrorHandler(error)

  const getAllBrands = useCallback(async () => {
    const brands = await get(API_ROUTES.BRANDS.GET_ALL);
    setBrandsList(brands)
  }, [])

  useEffect(() => { getAllBrands() }, []);

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