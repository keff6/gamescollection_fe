import useAppState from "../../hooks/useAppState";
import { useInfoAPI } from "../../hooks/api";
import InfoGraphics from "./InfoGraphics.component";
import { OPERATION_OUTCOME } from "../../utils/constants";

const InfoContainer = () => {
  const { setInfoTotals, openSnackbar, setIsLoading } = useAppState();
  const infoAPI = useInfoAPI()

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
    <InfoGraphics
      getTotals={getTotals}
    />
    )
}

export default InfoContainer