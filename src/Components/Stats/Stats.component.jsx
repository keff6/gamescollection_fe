
import proptypes from 'prop-types';
import useAppState from "../../hooks/useAppState";

const Stats = () => {
  const { info } = useAppState();

  return (
    <div>
      <p>Total Consoles: {info.totalConsoles || "--"}</p>
      <p>Total Games: {info.totalGames || "--"}</p>
    </div>
  )
}

Stats.propTypes = {
  getTotals: proptypes.func,
}

export default Stats;
