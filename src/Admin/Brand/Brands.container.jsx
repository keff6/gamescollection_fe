import { useEffect, useContext } from "react";
import { AppState } from "../../Config/store/state";
import { useBrandsAPI } from "../../hooks/api";
import Brands from "./Brands.component";
import { OPERATION_OUTCOME } from "../../utils/constants";

const BrandsContainer = () => {
  const { setBrandsList, openSnackbar, setIsLoading } = useContext(AppState);
  const brandsAPI = useBrandsAPI()

  useEffect(() => {
    getAllBrands();
  }, []);

  const getAllBrands = async () => {
    try {
      setIsLoading(true)
      const response = await brandsAPI.getAll();
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

  const addBrand = async (brandObj) => {
    try {
      setIsLoading(true)
      const response = await brandsAPI.add(brandObj);
      openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      getAllBrands()
    }
  }

  const deleteBrand = async (selectedBrand) => {
    try {
      setIsLoading(true)
      const response = await brandsAPI.remove(selectedBrand.id);
      openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      getAllBrands()
    }
  }

  const updateBrand = async (brandId, brandObj) => {
    try {
        setIsLoading(true)
        const response = await brandsAPI.update(brandId, brandObj);
        openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
      }
      catch(e){
        console.log(e)
        openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
      }
      finally {
        getAllBrands()
      }
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