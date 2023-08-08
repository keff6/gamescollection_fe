import { useContext } from "react";
import { AppState } from "../Config/context/state";

const useAppState = () => {
  return useContext(AppState);
}

export default useAppState;