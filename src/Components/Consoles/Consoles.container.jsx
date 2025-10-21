import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useAppState from "../../hooks/useAppState";
import Consoles from "./Consoles.component";
import { OPERATION_OUTCOME, ERROR_CODES, SESSION_STORAGE, ENTITIES, API_ROUTES, CONSOLE_FILTER_OPTIONS } from "../../utils/constants";
import useSessionStorage from "../../hooks/useSessionStorage";
import useAPI from "../../hooks/useAPI";

const ConsolesContainer = () => {
  const { setConsolesList, openSnackbar, setInitialLetter, setBrandsListMisc, console, brand: { selected: selectedBrand } } = useAppState();
  const { brandId } = useParams();
  const { get, post, del, put, error } = useAPI(true, ENTITIES.CONSOLE);
  const { get: getBrands, error: errorBrands } = useAPI(true, ENTITIES.BRAND);
  const [, setStoredBrand] = useSessionStorage(SESSION_STORAGE.BRAND, null)

  const getConsolesByBrand = useCallback(async (typeFilter = CONSOLE_FILTER_OPTIONS.ALL) => {
      const consoles = await get(API_ROUTES.CONSOLES.GET_BY_BRAND(brandId, typeFilter));
      const brands = await getBrands(API_ROUTES.BRANDS.GET_ALL);
      setConsolesList(consoles || []);
      setBrandsListMisc(brands)
    }, [])

  useEffect(() => {
    getConsolesByBrand()
    setInitialLetter('#')
    selectedBrand && setStoredBrand({...selectedBrand})

    return () => {
      setConsolesList([])
    }
  }, []);

  useEffect(() => {
    const hasError = error || errorBrands
    if(hasError) {
      const errorCode = hasError?.response?.data || "";
      let message = errorCode === ERROR_CODES.IS_REFERENCED ? "Cannot delete! It has games" : hasError.message;

      openSnackbar({message, type: OPERATION_OUTCOME.FAILED});
      getConsolesByBrand();
    }
    
  }, [error, errorBrands, openSnackbar, getConsolesByBrand]);

  useEffect(() => {
    handleFilterConsoles();
  }, [console.listFilter]);

  const handleFilterConsoles = () => {
    const { listFilter } = console;
    getConsolesByBrand(listFilter);
  }

  const addConsole = async (consoleObj) => {
    const responseMessage = await post(API_ROUTES.CONSOLES.ADD, consoleObj)
    openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
    getConsolesByBrand();
  }

  const updateConsole = async (consoleId, consoleObj) => {
    const responseMessage = await put(API_ROUTES.CONSOLES.UPDATE(consoleId), consoleObj);
    openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
    getConsolesByBrand()
  }

  const deleteConsole = async (selectedConsole) => {
    const responseMessage = await del(API_ROUTES.CONSOLES.DELETE(selectedConsole.id));
    openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
    getConsolesByBrand()
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