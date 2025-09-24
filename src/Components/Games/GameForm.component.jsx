import { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, InputGroup, Badge, Accordion } from 'react-bootstrap';
import proptypes from 'prop-types';
import { XCircle } from "react-bootstrap-icons";
import { InfoTooltip } from '../../Common';
import { GAME_LIST_OPTIONS } from '../../utils/constants';
import useAppState from '../../hooks/useAppState';
import { gameObjectSanitizer } from '../../utils/requestSanitizer';
import classes from './Games.module.css';

const GAME_DEFAULT = {
  title: "",
  consoleId: "",
  sagaText: "",
  saga: [],
  year: "",
  developer: "",
  publisher: "",
  isNew: 0,
  isComplete: 0,
  isWishlist: 0,
  isDigital: 0,
  isFinished: 0,
  isBacklog: 0,
  notes: "",
  coverUrl: "",
  genres: [],
  selectedGenre: "",
};

const GameForm = ({
  addNewGame,
  currentConsoleId,
  isEdit,
  onHide,
  saveUpdatedChanges,
  show,
  ...rest
}) => {
  const { game: {selected, listOption}, setSelectedGame, genre, misc: { consoles } } = useAppState();
  const [gameObj, setGameObj] = useState(GAME_DEFAULT);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const genreDictionary = genre?.list.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }),{})

  useEffect(() => {
    return () => {
      setGameObj({...GAME_DEFAULT, saga: [], genres: []})
      setValidated(false)
    }
  },[])

  useEffect(() => {
    let isWishlist = false;
    if(listOption === GAME_LIST_OPTIONS.WISHLIST) isWishlist = true

    setGameObj({
      ...gameObj,
      isWishlist,
      ...(currentConsoleId && {consoleId: currentConsoleId})
    }) 
    return () => {
      setGameObj({...GAME_DEFAULT, saga: [], genres: []})
      setValidated(false)
      setErrors([])
    }
  },[show])

  useEffect(() => {
    setGameObj(isEdit ? selected : {...GAME_DEFAULT, saga: [], genres: []}) 
  },[isEdit])

  const handleChange = (field, value) => {
    setGameObj({
      ...gameObj,
      [field]: value
    }) 
  }

  const handleCheckBoxChange = (field, value) => {
    if(field === 'isNew' && value) {
      setGameObj({
        ...gameObj,
        isNew: value,
      }) 
    } else if(field === 'isWishlist' && value) {
      setGameObj({
        ...gameObj,
        isWishlist: value,
        isNew: !value,
        isComplete: !value,
        isDigital: !value,
        isFinished: !value,
        isBacklog: !value,
      }) 
    } else {
      setGameObj({
        ...gameObj,
        [field]: value
      }) 
    }
  }

  const validateForm = (formValues) => {
    let isValid = false;
    if (formValues.checkValidity()) isValid = true
    setValidated(true)
    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors([])
    const sanitizedGameObj = gameObjectSanitizer({...gameObj})
    
    const form = e.currentTarget;

    if(validateForm(form)) {
      try {
        if(isEdit) await saveUpdatedChanges(selected.id, sanitizedGameObj)
        else await addNewGame(sanitizedGameObj)
        closeForm()
      } catch(e) {
        setErrors(err => [...err, e])
      }
    }
    setIsSubmitting(false)
  }

  const closeForm = () => {
    setSelectedGame(null)
    setGameObj({...GAME_DEFAULT, saga: [], genres: []})
    setValidated(false)
    setErrors([])
    onHide()
  }

  const renderYearsSelect = () => {
    let options = []
    for(let i = 1970; i<=2020; i++) {
      options.push(<option key={i} value={i}>{i}</option>)
    }
    return options
  }

  const handleAddSaga = () => {
    const sagasArr = gameObj?.saga;
    sagasArr.push(gameObj.sagaText);

    setGameObj({
      ...gameObj,
      saga: sagasArr,
      sagaText: "",
    }) 
  }

  const handleAddGenre = () => {
    const genresArr = gameObj?.genres;
    genresArr.push(gameObj.selectedGenre);

    setGameObj({
      ...gameObj,
      genres: genresArr,
      selectedGenre: "",
    }) 
  }

  const handleRemoveSaga = (sagaText) => {
    const sagasArr = gameObj?.saga.filter(s => s !== sagaText);

    setGameObj({
      ...gameObj,
      saga: sagasArr,
    }) 
  }

  const handleRemoveGenre = (selectedGenre) => {
    const genresArr = gameObj?.genres.filter(g => g !== selectedGenre);

    setGameObj({
      ...gameObj,
      genres: genresArr,
    }) 
  }

  return (
    <Modal
      {...rest}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen="md-down"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          {isEdit ? 'Edit' : 'Add'} Game
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.customModalBody}>
        <Form id="gameForm" noValidate validated={validated} onSubmit={handleSubmit}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Game Data</Accordion.Header>
              <Accordion.Body>
                {errors.length > 0 && <div className="error-container">{errors.map((e, i) => <p key={i}>{e.message}</p>)}</div>}
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter game title"
                    maxLength={100}
                    value={gameObj.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    isInvalid={errors.length > 0}
                    required
                  />
                </Form.Group>
                <Row className="form-row">
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="consoleId">
                      <Form.Label>Console</Form.Label>
                      <Form.Select
                        aria-label="consoleId"
                        name="consoleId"
                        value={gameObj.consoleId || ''}
                        onChange={(e) => handleChange("consoleId", e.target.value)}
                        disabled={gameObj.consoleId}
                        required
                      >
                        <option value=''>Select a console</option>
                        {consoles?.map(c =>
                          <option key={c.id} value={c.id}>{c.name}</option>
                        )}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a valid console.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                  <Form.Group className="mb-3" controlId="year">
                    <Form.Label>Year</Form.Label>
                      <Form.Select
                        aria-label="year"
                        name="year"
                        value={gameObj.year || ''}
                        onChange={(e) => handleChange("year", e.target.value)}
                      >
                        <option value=''>Enter release year (America)</option>
                        {renderYearsSelect()}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="form-row">
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="developer">
                      <Form.Label>Developer</Form.Label>
                      <Form.Control
                        type="text"
                        name="developer"
                        placeholder="Enter game developer"
                        maxLength={100}
                        value={gameObj.developer}
                        onChange={(e) => handleChange("developer", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="publisher">
                    <Form.Label>Publisher</Form.Label>
                      <Form.Control
                        type="text"
                        name="publisher"
                        placeholder="Enter game publisher"
                        maxLength={100}
                        value={gameObj.publisher}
                        onChange={(e) => handleChange("publisher", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="coverUrl">
                <Row className="form-row">
                  <Col>
                    <Form.Label>Game media status</Form.Label>
                    <Form.Check
                      type="checkbox"
                      id="isNew"
                      name="isNew"
                      label="New"
                      checked={gameObj.isNew}
                      disabled={gameObj.isWishlist}
                      onChange={(e) => handleCheckBoxChange("isNew", e.target.checked)}
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      id="isComplete"
                      name="isComplete"
                      label="Complete (CIB)"
                      checked={gameObj.isComplete}
                      disabled={gameObj.isWishlist}
                      onChange={(e) => handleCheckBoxChange("isComplete", e.target.checked)}
                    />
                    <InfoTooltip infoText='If a game contains box and manual is considered complete' />
                    <Form.Check
                      type="checkbox"
                      id="isDigital"
                      name="isDigital"
                      label="Digital"
                      checked={gameObj.isDigital}
                      disabled={gameObj.isWishlist}
                      onChange={(e) => handleCheckBoxChange("isDigital", e.target.checked)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Game playable status</Form.Label>
                    <Form.Check
                      type="checkbox"
                      id="isWishlist"
                      name="isWishlist"
                      label="Wishlist (don't have game yet)"
                      checked={gameObj.isWishlist}
                      onChange={(e) => handleCheckBoxChange("isWishlist", e.target.checked)}
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      id="isFinished"
                      name="isFinished"
                      label="Finished"
                      checked={gameObj.isFinished}
                      onChange={(e) => handleCheckBoxChange("isFinished", e.target.checked)}
                    />
                    <InfoTooltip infoText='A game is considered finished if was played until see the credits or a season was completed' />
                    <Form.Check
                      type="checkbox"
                      id="isBacklog"
                      name="isBacklog"
                      label="Is on Backlog"
                      checked={gameObj.isBacklog}
                      onChange={(e) => handleCheckBoxChange("isBacklog", e.target.checked)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="coverUrl">
                <Form.Label>Cover URL</Form.Label>
                <Form.Control
                  type="text"
                  name="coverUrl"
                  placeholder="Enter cover url"
                  maxLength={255}
                  value={gameObj.coverUrl}
                  onChange={(e) => handleChange("coverUrl", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="notes">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="notes"
                  maxLength={255}
                  value={gameObj.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Sagas and Genres</Accordion.Header>
              <Accordion.Body>
                <Row className={classes.customContainer}>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="sagaText">
                      <Form.Label>Saga</Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Add a saga"
                          name="sagaText"
                          value={gameObj.sagaText || ""}
                          onChange={(e) => handleChange("sagaText", e.target.value)}
                        />
                        <Button
                          variant="primary"
                          onClick={handleAddSaga}
                          disabled={gameObj.sagaText?.length === 0}
                        >
                          Add
                        </Button>
                      </InputGroup>
                    </Form.Group>
                    
                  </Col>
                  <Col md={8}>
                    <div className={classes.customList}>
                      {gameObj?.saga?.length > 0 &&
                        gameObj?.saga?.map(s => 
                          <Badge key={s} pill bg="secondary" className={classes.badge}>
                            <span className={classes.badgeText}>{s}</span>
                            <XCircle
                              className={classes.badgeButton}
                              onClick={() => handleRemoveSaga(s)}
                            />
                          </Badge>
                        )
                      }
                    </div>
                  </Col>
                </Row>
                <Row className={classes.customContainer}>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="selectedGenre">
                      <Form.Label>Genre</Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Select
                          aria-label="selectedGenre"
                          name="selectedGenre"
                          value={gameObj.selectedGenre || ""}
                          onChange={(e) => handleChange("selectedGenre", e.target.value)}
                        >
                          <option value=''>Add a genre</option>
                          {genre?.list.map(g =>
                            <option key={g.id} value={g.id}>{g.name}</option>
                          )}
                        </Form.Select>
                        <Button
                          variant="primary"
                          onClick={handleAddGenre}
                          disabled={gameObj.selectedGenre === ''}
                        >
                          Add
                        </Button>
                      </InputGroup>
                    </Form.Group>
                    
                  </Col>
                  <Col md={8}>
                    <div className={classes.customList}>
                      {gameObj?.genres?.length > 0 &&
                        gameObj.genres.map(s => 
                          <Badge key={s} pill bg="secondary" className={classes.badge}>
                            <span className={classes.badgeText}>
                              {genreDictionary[s]}
                            </span>
                            <XCircle
                              className={classes.badgeButton}
                              onClick={() => handleRemoveGenre(s)}
                            />
                          </Badge>
                        )
                      }
                    </div>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            
          </Accordion>
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeForm}>Cancel</Button>
        <Button variant="primary" form="gameForm" type="submit" disabled={isSubmitting}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

GameForm.propTypes = {
  addNewGame: proptypes.func,
  currentConsoleId: proptypes.string,
  isEdit: proptypes.bool,
  onHide: proptypes.func,
  saveUpdatedChanges: proptypes.func,
  show: proptypes.bool,
}

export default GameForm