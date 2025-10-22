import { useEffect } from "react";
import useAppState from "../../hooks/useAppState";
import Stats from "./Stats.component";
import { OPERATION_OUTCOME, API_ROUTES } from "../../utils/constants";
import useAPI from "../../hooks/useAPI";

const InfoContainer = () => {
  const { setInfoTotals, openSnackbar } = useAppState();
  const { get, error } = useAPI(false);

  useEffect(() => {
    getTotals();
  },[])

  useEffect(() => {
    if(error) {
      openSnackbar({message: error?.message, type: OPERATION_OUTCOME.FAILED});
    }
    
  }, [error, openSnackbar]);

  const getTotals = async () => {
    const totalsResponse = await get(API_ROUTES.STATS.GET_TOTALS);
    setInfoTotals(totalsResponse || null);
  }

  return (
    <Stats
      getTotals={getTotals}
    />
    )
}

export default InfoContainer