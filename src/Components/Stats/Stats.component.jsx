
import proptypes from 'prop-types';
import { useAppState } from "../../hooks";

const Stats = () => {
  const { stats } = useAppState();

  return (
    <div>
      <p>Total Consoles: {stats.totalConsoles || "--"}</p>
      <p>Total Games: {stats.totalGames || "--"}</p>
    </div>
  )
}

Stats.propTypes = {
  getTotals: proptypes.func,
}

export default Stats;
