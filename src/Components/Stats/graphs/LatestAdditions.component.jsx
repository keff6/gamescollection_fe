import proptypes from 'prop-types';
import { MiniLabel } from '../../../Common';
import classes from './Graphs.module.css';

const LatestAdditions = ({ data }) => (
  <section className={classes.sectionContainer}>
    <h5>Latest Additions </h5>
    <ul className={classes.gamesList}>
      {data && data.map((item, index) => (
        <li key={index}>
        <MiniLabel labelText={`${item.year} - ${item.console}`}>
          {item.title}
        </MiniLabel>
      </li>))}
    </ul>
  </section>     
)

LatestAdditions.propTypes = {
  data: proptypes.array
}

export default LatestAdditions;