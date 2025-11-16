import proptypes from 'prop-types';
import { MiniLabel } from '../../../Common';
import classes from './Graphs.module.css';

const PlayingStatus = ({ data }) => {
  const { finishedGames = 0, playingGames = [] } = data;

  return (
    <section className={classes.sectionContainer}>
        <h5>Playing Status </h5>
        <MiniLabel labelText='Total Games Finished'>
          {finishedGames}
        </MiniLabel>
        <h6>Now Playing</h6>
        <ul className={classes.gamesList}>
          {playingGames && playingGames.map((item, index) => (
            <li key={index}>
            <MiniLabel labelText={`${item.year} - ${item.console}`}>
              {item.title}
            </MiniLabel>
          </li>))}
        </ul>
      </section>  
  )
}

PlayingStatus.propTypes = {
  data: proptypes.array
}

export default PlayingStatus;