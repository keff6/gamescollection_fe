import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppState } from "../../Config/store/state";
import { ConsoleService, BrandService } from '../../services';
import Consoles from "./Consoles.component";
import { OPERATION_OUTCOME } from "../../utils/constants";

const ConsolesContainer = () => {
  const { setConsolesList, openSnackbar, setBrandsList, setIsLoading, setInitialLetter } = useContext(AppState);
  const { brandId } = useParams()

  useEffect(() => {
    getConsolesByBrand()
    setInitialLetter('#')
  }, []);

  const getConsolesByBrand = async () => {
    try {
      setIsLoading(true)
      const consolesResponse = await ConsoleService.getByBrand(brandId);
      const brandsResponse = await BrandService.getAll();
      setConsolesList(consolesResponse.data || []);
      setBrandsList(brandsResponse.data || []);
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

  return (
    <Consoles
      addConsole={addConsole}
      updateConsole={updateConsole}
      deleteConsole={deleteConsole}
    />
  )
}

export default ConsolesContainer