/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ERROR_CODES, OPERATION_OUTCOME } from "../utils/constants";
import useAppState from "./useAppState";

const useApiErrorHandler = (error) => {
  const { openSnackbar } = useAppState();

  useEffect(() => {
    if (error) {
      const errorCode = error?.response?.data || "";
      let message = errorCode === ERROR_CODES.IS_REFERENCED ? "Cannot delete! It has dependencies" :
      (errorCode !== "") ? errorCode : error.message;
      
      openSnackbar({message: message || "Something went wrong!", type: OPERATION_OUTCOME.FAILED});
    }
  }, [error]);
}

export default useApiErrorHandler;