import { useEffect } from "react";
import { useAppState, useAPI, useApiErrorHandler } from "../../hooks";
import Stats from "./Stats.component";
import { API_ROUTES } from "../../utils/constants";

const StatsContainer = () => {
  const { setStatsTotals } = useAppState();
  const { get, error } = useAPI(false);
  useApiErrorHandler(error);

  useEffect(() => {
    getTotals();
  },[])

  const getTotals = async () => {
    const totalsResponse = await get(API_ROUTES.STATS.GET_TOTALS);
    setStatsTotals(totalsResponse || null);
  }

  return (
    <Stats
      getTotals={getTotals}
    />
    )
}

export default StatsContainer