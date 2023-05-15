import { useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import proptypes from 'prop-types';
import { AppContext } from '../../Config/Provider';
import GenresTable from './GenresTable.component';
import GenreForm from './GenreForm.component';
import { deleteConfirm } from '../../Common/DeleteAlertModal/DeleteAlertModal';
import classes from './Genres.module.css';

const Genres = ({
  addGenre,
  deleteGenre,
  updateGenre,
}) => {
  const [state, setState] = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
 
  const handleAddNewGenre = async (genreName) => {
    addGenre(genreName)
  }

  const handleDeleteGenre = async (selectedGenre) => {
    setState(currentState => ({ ...currentState, genre: { ...currentState.genre, selected: selectedGenre }}))
    if (await deleteConfirm()) {
      deleteGenre(selectedGenre)
    }
  }

  const handleEditGenre = (selectedGenre) => {
    setState(currentState => ({ ...currentState, genre: { ...currentState.genre, selected: selectedGenre }}))
    setIsEdit(true)
    setShowForm(true)
  }

  const handleUpdateGenre = async (genreId, updatedName) => {
    updateGenre(genreId, updatedName)
  }

  const handleCloseFormModal = () => {
    setIsEdit(false)
    setShowForm(false)
  }

  return (
    <>
      <GenreForm
        show={showForm}
        onHide={handleCloseFormModal}
        isEdit={isEdit}
        addNewGenre={handleAddNewGenre}
        saveUpdatedChanges={handleUpdateGenre}
      />
      <Container className={classes.container}>
        <header className={classes.header}>
          <h2>Genres</h2>
          <Button onClick={() => setShowForm(true)}>Add Genre</Button>
        </header>
        <GenresTable
          genres={state.genre.list}
          deleteGenre={handleDeleteGenre}
          editGenre={handleEditGenre}
        />
      </Container>
    </>
  )
}

Genres.propTypes = {
  addGenre: proptypes.func,
  deleteGenre: proptypes.func,
  updateGenre: proptypes.func,
}

export default Genres;