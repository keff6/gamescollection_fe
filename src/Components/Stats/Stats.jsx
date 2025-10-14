import { useEffect } from "react";
import useAppState from "../../hooks/useAppState";
import { useInfoAPI } from "../../hooks/api";
import Stats from "./Stats.component";
import { OPERATION_OUTCOME } from "../../utils/constants";

const InfoContainer = () => {
  const { setInfoTotals, openSnackbar, setIsLoading } = useAppState();
  const infoAPI = useInfoAPI()

  useEffect(() => {
    getTotals();
  },[])

  const getTotals = async () => {
    try {
      setIsLoading(true)
      const totalsResponse = await infoAPI.getTotals();
      setInfoTotals(totalsResponse.data || null);
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Stats
      getTotals={getTotals}
    />
    )
}

export default InfoContainer