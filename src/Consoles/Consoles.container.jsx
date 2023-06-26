import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppState } from "../Config/store/state";
import ConsoleService from '../services/ConsoleService';
import BrandService from "../services/BrandService";
import Consoles from "./Consoles.component";
import { OPERATION_OUTCOME } from "../utils/constants";
import Spinner from "../Common/Spinner/Spinner.component";

const ConsolesContainer = () => {
  const { console, setConsolesList, openSnackbar, setBrandsList } = useContext(AppState);
  const [isLoading, setIsLoading] = useState(false)
  const { brandId } = useParams()

  useEffect(() => {
    getConsolesByBrand()
  }, []);

  const getConsolesByBrand = async () => {
    try {
      setIsLoading(true)
      const response = await ConsoleService.getByBrand(brandId);
      const brandsResponse = await BrandService.getAll();
      setBrandsList(brandsResponse.data)
      setConsolesList(response.data)
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      setIsLoading(false)
    }
  }

  const addConsole = async (consoleObj) => {
    try {
      setIsLoading(true)
      const response = await ConsoleService.add(consoleObj);
      openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      getConsolesByBrand()
    }
  }

  const updateConsole = async (consoleId, consoleObj) => {
    try {
        setIsLoading(true)
        const response = await ConsoleService.update(consoleId, consoleObj);
        openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
      }
      catch(e){
        console.log(e)
        openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
      }
      finally {
        getConsolesByBrand()
      }
  }

  const deleteConsole = async (selectedConsole) => {
    try {
      setIsLoading(true)
      const response = await ConsoleService.remove(selectedConsole.id);
      openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      getConsolesByBrand()
    }
  }

  return isLoading ? <Spinner />
  : console.list && (
    <Consoles
      addConsole={addConsole}
      updateConsole={updateConsole}
      deleteConsole={deleteConsole}
    />
    )
}

export default ConsolesContainer