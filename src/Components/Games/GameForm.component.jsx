import { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form, Row, Col, InputGroup, Badge, Accordion } from 'react-bootstrap';
import proptypes from 'prop-types';
import { XCircle } from "react-bootstrap-icons";
import { AppState } from "../../Config/store/state";
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
  const { game: {selected}, setSelectedGame, console, genre } = useContext(AppState);
  const [gameObj, setGameObj] = useState(GAME_DEFAULT);
  const [validated, setValidated] = useState(false);
  const genreDictionary = genre?.list.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }),{})

  useEffect(() => () => {
    setGameObj({...GAME_DEFAULT, saga: [], genres: []})
    setValidated(false)
  },[show])

  useEffect(() => {
    if(isEdit) setGameObj(selected)
  },[isEdit])

  const handleChange = (field, value) => {
    setGameObj({
      ...gameObj,
      [field]: value
    }) 
  }

  const validateForm = (formValues) => {
    let isValid = false;
    if (formValues.checkValidity()) isValid = true
    setValidated(true)
    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const sanitizedGameObj = gameObjectSanitizer({...gameObj})
    

    const form = e.currentTarget;

    if(validateForm(form)) {
      if(isEdit) await saveUpdatedChanges(selected.id, sanitizedGameObj)
      else await addNewGame(sanitizedGameObj)
      closeForm()
    }
  }

  const closeForm = () => {
    setSelectedGame(null)
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
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter game title"
                    value={gameObj.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid text.
                  </Form.Control.Feedback>
                </Form.Group>
                <Row className="form-row">
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="consoleId">
                      <Form.Label>Console</Form.Label>
                      <Form.Select
                        aria-label="consoleId"
                        name="consoleId"
                        value={gameObj.consoleId || currentConsoleId || ''}
                        onChange={(e) => handleChange("consoleId", e.target.value)}
                        required
                      >
                        <option value=''>Select a console</option>
                        {console?.list?.map(c =>
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
                        <option value=''>Enter console release year (America)</option>
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
                        value={gameObj.publisher}
                        onChange={(e) => handleChange("publisher", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mb-3">
                  <Form.Check
                    inline
                    type="checkbox"
                    id="isNew"
                    name="isNew"
                    label="Is New"
                    checked={gameObj.isNew}
                    onChange={(e) => handleChange("isNew", e.target.checked)}
                  />
                  <Form.Check
                    inline
                    type="checkbox"
                    id="isComplete"
                    name="isComplete"
                    label="Is Complete"
                    checked={gameObj.isComplete}
                    onChange={(e) => handleChange("isComplete", e.target.checked)}
                  />
                  <Form.Check
                    inline
                    type="checkbox"
                    id="isDigital"
                    name="isDigital"
                    label="Is Digital"
                    checked={gameObj.isDigital}
                    onChange={(e) => handleChange("isDigital", e.target.checked)}
                  />
                </div>
                <Form.Group className="mb-3" controlId="coverUrl">
                <Form.Label>Cover URL</Form.Label>
                <Form.Control
                  type="text"
                  name="coverUrl"
                  placeholder="Enter cover url"
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
                          variant="secondary"
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
                          variant="secondary"
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
        <Button variant="primary" form="gameForm" type="submit">Save changes</Button>
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