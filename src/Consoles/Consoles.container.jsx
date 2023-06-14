import { useEffect, useState, useContext } from "react";
import { AppState } from "../Config/store/state";
import ConsoleService from '../services/ConsoleService';
import Consoles from "./Consoles.component";
import { OPERATION_OUTCOME } from "../utils/constants";
import Spinner from "../Common/Spinner/Spinner.component";

const ConsolesContainer = () => {
  const { brand, console, setConsolesList, openSnackbar } = useContext(AppState);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getConsolesByBrand()
  }, []);

  const getConsolesByBrand = async () => {
    try {
      setIsLoading(true)
      const response = await ConsoleService.getByBrand(brand.selected.id);
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

  return isLoading ? <Spinner />
  : console.list && (
    <Consoles />
    )
}

export default ConsolesContainer