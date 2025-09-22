
import proptypes from 'prop-types';
import useAppState from "../../hooks/useAppState";

const InfoGraphics = () => {
  const { info } = useAppState();

  return (
    <div>
      <p>Total Consoles: {info.totalConsoles || "--"}</p>
      <p>Total Games: {info.totalGames || "--"}</p>
    </div>
  )
}

InfoGraphics.propTypes = {
  getTotals: proptypes.func,
}

export default InfoGraphics;
