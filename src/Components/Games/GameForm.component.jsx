import { useState } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Modal, Form, Row, Col, InputGroup, Badge, Accordion } from 'react-bootstrap';
import proptypes from 'prop-types';
import { XCircle } from "react-bootstrap-icons";
import { InfoTooltip } from '../../Common';
import { useAppState } from '../../hooks';
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
  isPlaying: 0,
  notes: "",
  coverUrl: "",
  genres: [],
  selectedGenre: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Please enter a valid text"),
  consoleId: Yup.string()
    .required("Please select a valid console"),
});

const GameForm = ({
  addNewGame,
  currentConsoleId,
  isEdit,
  onHide,
  saveUpdatedChanges,
  show,
  ...rest
}) => {
  const { game: {selected }, setSelectedGame, genre, misc: { consoles } } = useAppState();
  const [serverErrors, setServerErrors] = useState([]);
  const genreDictionary = genre?.list.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }),{})

  const closeForm = () => {
    setSelectedGame(null)
    setServerErrors([])
    onHide()
  }

  const renderYearsSelect = () => {
    let options = []
    for(let i = 1970; i<=2020; i++) {
      options.push(<option key={i} value={i}>{i}</option>)
    }
    return options
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
      <Formik
        initialValues={isEdit ? selected : { ...GAME_DEFAULT, consoleId: currentConsoleId || ''}}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const sanitizedGameObj = gameObjectSanitizer({...values})
            if(isEdit) await saveUpdatedChanges(selected.id, sanitizedGameObj)
            else await addNewGame(sanitizedGameObj)
            closeForm()
            resetForm();
          } catch(e) {
            setServerErrors(err => [...err, e])
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <>
          <Modal.Header closeButton={false}>
            <Modal.Title id="contained-modal-title-vcenter" className='main-title'>
              {isEdit ? 'Edit' : 'Add'} Game
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={classes.customModalBody}>
            <Form id="gameForm" noValidate onSubmit={handleSubmit}>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Game Data</Accordion.Header>
                  <Accordion.Body>
                    {serverErrors.length > 0 && <div className="error-container">{serverErrors.map((e, i) => <p key={i}>{e.message}</p>)}</div>}
                    <Form.Group className="mb-3" controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        placeholder="Enter game title"
                        maxLength={100}
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={serverErrors.length > 0 || touched.title && !!errors.title}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Row className="form-row">
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="consoleId">
                          <Form.Label>Console</Form.Label>
                          <Form.Select
                            aria-label="consoleId"
                            name="consoleId"
                            value={values.consoleId || ''}
                            onChange={handleChange}
                            disabled={values.consoleId}
                            onBlur={handleBlur}
                            isInvalid={touched.consoleId && !!errors.consoleId}
                          >
                            <option value=''>Select a console</option>
                            {consoles?.map(c =>
                              <option key={c.id} value={c.id}>{c.name}</option>
                            )}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.consoleId}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                      <Form.Group className="mb-3" controlId="year">
                        <Form.Label>Year</Form.Label>
                          <Form.Select
                            aria-label="year"
                            name="year"
                            value={values.year || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                            value={values.developer}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                            value={values.publisher}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                          checked={values.isNew}
                          disabled={values.isWishlist}
                          onChange={(e) => setFieldValue("isNew", e.target.checked)}
                        />
                        <Form.Check
                          inline
                          type="checkbox"
                          id="isComplete"
                          name="isComplete"
                          label="Complete (CIB)"
                          checked={values.isComplete}
                          disabled={values.isWishlist}
                          onChange={(e) => setFieldValue("isComplete", e.target.checked)}
                        />
                        <InfoTooltip infoText='If a game contains box and manual is considered complete' />
                        <Form.Check
                          type="checkbox"
                          id="isDigital"
                          name="isDigital"
                          label="Digital"
                          checked={values.isDigital}
                          disabled={values.isWishlist}
                          onChange={(e) => setFieldValue("isDigital", e.target.checked)}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Game playable status</Form.Label>
                        <Form.Check
                          type="checkbox"
                          id="isWishlist"
                          name="isWishlist"
                          label="Wishlist (don't have game yet)"
                          checked={values.isWishlist}
                          onChange={(e) => setFieldValue("isWishlist", e.target.checked)}
                        />
                        <Form.Check
                          type="checkbox"
                          id="isBacklog"
                          name="isBacklog"
                          label="Is on Backlog"
                          checked={values.isBacklog}
                          onChange={(e) => setFieldValue("isBacklog", e.target.checked)}
                        />
                        <Form.Check
                          type="checkbox"
                          id="isPlaying"
                          name="isPlaying"
                          label="Currently Playing"
                          checked={values.isPlaying}
                          onChange={(e) => setFieldValue("isPlaying", e.target.checked)}
                        />
                        <Form.Check
                          inline
                          type="checkbox"
                          id="isFinished"
                          name="isFinished"
                          label="Finished"
                          checked={values.isFinished}
                          onChange={(e) => setFieldValue("isFinished", e.target.checked)}
                        />
                        <InfoTooltip infoText='A game is considered finished if was played until see the credits or a season was completed' />
                      </Col>
                    </Row>
                  </Form.Group>
                  {/* TODO: If using images is not viable then remove
                    <Form.Group className="mb-3" controlId="coverUrl">
                    <Form.Label>Cover URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="coverUrl"
                      placeholder="Enter cover url"
                      maxLength={255}
                      value={values.coverUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group> */}
                  <Form.Group className="mb-3" controlId="notes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="notes"
                      maxLength={255}
                      value={values.notes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Sagas and Genres</Accordion.Header>
                  <Accordion.Body>
                    <Row className={classes.customContainer}>
                      <Col md={5}>
                        <Form.Group className="mb-3" controlId="sagaText">
                          <Form.Label>Saga</Form.Label>
                          <InputGroup className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Add a saga"
                              name="sagaText"
                              value={values.sagaText || ""}
                              onChange={handleChange}
                            />
                            <Button
                              variant="primary"
                              onClick={() => {
                                const sagasArr = [...values.saga, values.sagaText];
                                setFieldValue('saga', sagasArr)
                              }}
                              disabled={values.sagaText?.length === 0}
                            >
                              Add
                            </Button>
                          </InputGroup>
                        </Form.Group>
                        
                      </Col>
                      <Col md={7}>
                        <div className={classes.customList}>
                          {values?.saga?.length > 0 &&
                            values?.saga?.map(s => 
                              <Badge key={s} pill bg="secondary" className={classes.badge}>
                                <span className={classes.badgeText}>{s}</span>
                                <XCircle
                                  className={classes.badgeButton}
                                  onClick={() => {
                                    const updatedSagas = values.saga.filter(sagaDel => sagaDel !== s)
                                    setFieldValue('saga', updatedSagas)
                                    setFieldValue('sagaText', "")
                                  }}
                                />
                              </Badge>
                            )
                          }
                        </div>
                      </Col>
                    </Row>
                    <Row className={classes.customContainer}>
                      <Col md={5}>
                        <Form.Group className="mb-3" controlId="selectedGenre">
                          <Form.Label>Genre</Form.Label>
                          <InputGroup className="mb-3">
                            <Form.Select
                              aria-label="selectedGenre"
                              name="selectedGenre"
                              value={values.selectedGenre || ""}
                              onChange={handleChange}
                            >
                              <option value=''>Add a genre</option>
                              {genre?.list.map(g =>
                                <option key={g.id} value={g.id}>{g.name}</option>
                              )}
                            </Form.Select>
                            <Button
                              variant="primary"
                              onClick={() => {
                                const genresArr = [...values.genres, values.selectedGenre]
                                setFieldValue('genres', genresArr)
                                setFieldValue('selectedGenre', "")
                              }}
                              disabled={values.selectedGenre === ''}
                            >
                              Add
                            </Button>
                          </InputGroup>
                        </Form.Group>
                        
                      </Col>
                      <Col md={7}>
                        <div className={classes.customList}>
                          {values?.genres?.length > 0 &&
                            values.genres.map(g => 
                              <Badge key={g} pill bg="secondary" className={classes.badge}>
                                <span className={classes.badgeText}>
                                  {genreDictionary[g]}
                                </span>
                                <XCircle
                                  className={classes.badgeButton}
                                  onClick={() => {
                                    const updatedGenres = values.genres.filter(genDel => genDel !== g)
                                    setFieldValue('genres', updatedGenres)
                                  }}
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
            <Button variant="primary" form="gameForm" type="submit" disabled={isSubmitting}>
              {isSubmitting ? '...Saving' : 'Save changes'}
            </Button>
          </Modal.Footer>
        </>
        )}
      </Formik>
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