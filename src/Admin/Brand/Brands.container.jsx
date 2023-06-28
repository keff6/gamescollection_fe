import { useEffect, useState, useContext } from "react";
import { AppState } from "../../Config/store/state";
import { BrandService } from '../../services';
import Brands from "./Brands.component";
import { OPERATION_OUTCOME } from "../../utils/constants";
import Spinner from "../../Common/Spinner/Spinner.component";

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

  const addBrand = async (brandObj) => {
    try {
      setIsLoading(true)
      const response = await BrandService.add(brandObj);
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
      const response = await BrandService.remove(selectedBrand.id);
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
        const response = await BrandService.update(brandId, brandObj);
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

  return isLoading ? <Spinner />
  : brand.list && (
    <Brands
      addBrand={addBrand}
      deleteBrand={deleteBrand}
      updateBrand={updateBrand}
    />
    )
}

export default BrandsContainer