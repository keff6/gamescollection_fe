import { useEffect } from "react";
import proptypes from 'prop-types';
import useAppState from "../../hooks/useAppState";

const InfoGraphics = ({ getTotals }) => {
  const { info } = useAppState();

  useEffect(() => {
    getTotals();
  },[])

  return (
    <div>
      Total Games: {info.totalGames}
    </div>
  )
}

InfoGraphics.propTypes = {
  getTotals: proptypes.func,
}

export default InfoGraphics;
