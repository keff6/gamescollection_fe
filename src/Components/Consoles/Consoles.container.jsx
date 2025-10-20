import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAppState from "../../hooks/useAppState";
import { useConsolesAPI, useBrandsAPI } from "../../hooks/api";
import Consoles from "./Consoles.component";
import { OPERATION_OUTCOME, ERROR_CODES, CONSOLE_FILTER_OPTIONS } from "../../utils/constants";
import useSessionStorage from "../../hooks/useSessionStorage";

const ConsolesContainer = () => {
  const { setConsolesList, openSnackbar, setIsLoading, setInitialLetter, setBrandsListMisc, console, brand: { selected: selectedBrand } } = useAppState();
  const { brandId } = useParams()
  const consolesAPI = useConsolesAPI()
  const brandsAPI = useBrandsAPI()
  const [, setStoredBrand] = useSessionStorage("brandData", null)

  useEffect(() => {
    getConsolesByBrand()
    setInitialLetter('#')
    selectedBrand && setStoredBrand({...selectedBrand})

    return () => {
      setConsolesList([])
    }
  }, []);

  useEffect(() => {
    handleFilterConsoles();
  }, [console.listFilter]);
  
  const handleFilterConsoles = () => {
    const { listFilter } = console;
    getConsolesByBrand(listFilter);
  };

  const getConsolesByBrand = async (typeFilter = CONSOLE_FILTER_OPTIONS.AL) => {
    try {
      setIsLoading(true)
      const consolesResponse = await consolesAPI.getByBrand(brandId, typeFilter);
      const brandsResponse = await brandsAPI.getAll();
      setConsolesList(consolesResponse.data || []);
      setBrandsListMisc(brandsResponse.data || [])
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
      const response = await consolesAPI.add(consoleObj);
      openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
    }
    catch(e){
      const errorCode = e?.response?.data || "";
      if(errorCode === ERROR_CODES.DUPLICATED) {
        throw new Error("Console already exists in database")
      }
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      getConsolesByBrand()
    }
  }

  const updateConsole = async (consoleId, consoleObj) => {
    try {
        setIsLoading(true)
        const response = await consolesAPI.update(consoleId, consoleObj);
        openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
      }
      catch(e){
        const errorCode = e?.response?.data || "";
        if(errorCode === ERROR_CODES.DUPLICATED) {
          throw new Error("Console already exists in database")
        }
        openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
      }
      finally {
        getConsolesByBrand()
      }
  }

  const deleteConsole = async (selectedConsole) => {
    try {
      setIsLoading(true)
      const response = await consolesAPI.remove(selectedConsole.id);
      openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
    }
    catch(e){
      const errorCode = e?.response?.data || "";
      let message = e.message;
      if(errorCode === ERROR_CODES.IS_REFERENCED) {
        message = "Cannot delete this console because it has games"
      }
      openSnackbar({message, type: OPERATION_OUTCOME.FAILED})
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