
import proptypes from 'prop-types';
import { Col, Row, Container } from 'react-bootstrap';
import ConditionGraph from './graphs/ConditionGraph.component';
import TimelineGraph from './graphs/TimelineGraph.component';
import GenresDistribution from './graphs/GenresDistribuition';
import TopConsolesByGames from './graphs/TopConsolesByGames.component';
import GeneralStats from './graphs/GeneralStats.component';
import LatestAdditions from './graphs/LatestAdditions.component';
import PlayingStatus from './graphs/PlayingStatus';
import classes from './Stats.module.css';

const Stats = ({ totals, byCondition, totalByConsole, top5Consoles, genresDist, latestAdditions, nowPlaying }) => {

  return (
    <>
      <h2 className={classes.welcomeLabel}>Welcome back, Visitor!</h2>
      <Container>
        <Row>
          <Col md={12} lg={3}>
            {totals && <GeneralStats data={totals}/>}
          </Col>
          <Col md={12} lg={5}>
            <ConditionGraph data={byCondition}/>
          </Col>
          <Col md={12} lg={4}>
            <TopConsolesByGames data={top5Consoles}/>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <TimelineGraph data={totalByConsole}/>
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={4}>
            <GenresDistribution data={genresDist}/>
          </Col>
          <Col md={12} lg={4}>
            <LatestAdditions data={latestAdditions}/>
          </Col>
          <Col md={12} lg={4}>
            <PlayingStatus data={nowPlaying}/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

Stats.propTypes = {
  totals: proptypes.object,
  byCondition: proptypes.array,
  totalByConsole: proptypes.array,
  top5Consoles: proptypes.array,
  genresDist: proptypes.array,
  latestAdditions: proptypes.array,
  nowPlaying: proptypes.array,
}

export default Stats;
