import proptypes from 'prop-types';
import { MiniLabel } from '../../../Common';
import classes from './Graphs.module.css';

const GeneralStats = ({ data }) => {
  const {
    totalBrands = 0,
    totalConsoles = 0,
    totalGames = 0,
    portable = 0,
    oldestConsole = "",
    newestConsole = '',
  } = data;
  
  return (
    <section className={classes.sectionContainer}>
      <h5>General Info</h5>
      <div className={classes.totalsContainer}>
        <MiniLabel labelText='Total Games'><span className={classes.mainText}>{totalGames || "--"}</span></MiniLabel>
        <MiniLabel labelText='Total Brands'>{totalBrands || "--"}</MiniLabel>
        <MiniLabel labelText='Total Consoles'>{totalConsoles} <span className={classes.smallText}>({totalConsoles - portable} Home - {portable} Portable)</span></MiniLabel>
        <MiniLabel labelText='Oldest Console'>{oldestConsole || "--"}</MiniLabel>
        <MiniLabel labelText='Newest Console'>{newestConsole || "--"}</MiniLabel>
      </div> 
    </section>     
  )
}

GeneralStats.propTypes = {
  data: proptypes.object
}

export default GeneralStats;