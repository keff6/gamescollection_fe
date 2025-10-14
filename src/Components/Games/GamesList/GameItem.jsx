import proptypes from "prop-types";
import { Col, Row, Dropdown } from "react-bootstrap";
import { PencilSquare, Trash, ChatRightText } from 'react-bootstrap-icons';
import useAppState from '../../../hooks/useAppState';
import { NO_DATA } from "../../../utils/constants";
import { Badge, MoreButton, Tooltip, MiniLabel } from "../../../Common";
import classes from '../Games.module.css';

const GameItem = ({ gameData, deleteGame, editGame }) => {
  const { 
      user,
      genre: { list: genresList }
    } = useAppState();
  const selectedGenres = genresList.filter(g => gameData?.genres?.includes(g.id));
  const genresLabel = selectedGenres.length > 0 ? selectedGenres.map(g => g.name).join(', ') : NO_DATA;

  const getConditionBadge = () => {
    const { isNew, isComplete, isDigital } = gameData;
    const badgeType = (isNew && 'NEW') || (isComplete && 'COMPLETE') || (isDigital && 'DIGITAL') || null

    return badgeType ? <MiniLabel labelText="Condition"><Badge type={badgeType}/></MiniLabel> : null
  }

  const getStatusBadge = () => {
    const { isBacklog, isFinished, isPlaying } = gameData;
    const badgeType = (isBacklog && 'BACKLOG') || (isFinished && 'FINISHED') || (isPlaying && 'PLAYING') || null

    return badgeType ? <MiniLabel labelText="Status"><Badge type={badgeType}/></MiniLabel> : null
  }

  return (
    <li className={classes.gameItemContainer}>
      <Row className={classes.gameItemRow}>
        <Col lg={6}>
          <div>
            <h1>{gameData?.title || '--'}</h1>
            <MiniLabel labelText="Year">
            <h3>{gameData?.year || '--'}</h3>
            </MiniLabel>
          </div>
        </Col>
        
        <Col lg={4}>
        <MiniLabel labelText="Genre"><p>{genresLabel}</p></MiniLabel>
        <MiniLabel labelText="Developer / Publisher">
          <p>{gameData?.developer || NO_DATA} / {gameData?.publisher || NO_DATA}</p>
        </MiniLabel>
        </Col>
        <Col lg={2}>
        <div className={classes.smallColumn}>
          <div className={classes.badgesColumn}>
            {getConditionBadge()}
            {getStatusBadge()}
          </div>
          <div className={classes.buttonsColumn}>
            {gameData?.notes && <Tooltip text={gameData?.notes}>
              <ChatRightText className={classes.noteIcon}/>
            </Tooltip>}
            {user && (
              <Tooltip text="See more options">
                <Dropdown>
                  <Dropdown.Toggle as={MoreButton} />
                  <Dropdown.Menu size="sm" title="">
                    <Dropdown.Item onClick={() => editGame(gameData)}>
                      <PencilSquare />
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => deleteGame(gameData)}
                      className={classes.dangerLink}
                    >
                      <Trash />
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Tooltip>
            )}
          </div>
        </div>
        </Col>
      </Row>
    </li>
  )
}

GameItem.propTypes = {
  gameData: proptypes.object,
  deleteGame: proptypes.func,
  editGame: proptypes.func,
}

export default GameItem;