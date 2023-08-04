import { useContext } from "react";
import { AppState } from "../Config/store/state";

const useAppState = () => {
  return useContext(AppState);
}

export default useAppState;