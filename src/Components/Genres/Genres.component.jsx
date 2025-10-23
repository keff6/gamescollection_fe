import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import proptypes from 'prop-types';
import { useAppState } from '../../hooks';
import GenresTable from './GenresTable.component';
import GenreForm from './GenreForm.component';
import DeleteAlertModal from '../../Common/DeleteAlertModal/DeleteAlertModal.component';
import classes from './Genres.module.css';

const Genres = ({
  addGenre,
  deleteGenre,
  updateGenre,
}) => {
  const { genre, setSelectedGenre } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleDeleteGenre = async (selectedGenre) => {
    setSelectedGenre({...selectedGenre})
    setShowConfirmDelete(true)
  }

  const handleEditGenre = (selectedGenre) => {
    setSelectedGenre({...selectedGenre})
    setIsEdit(true)
    setShowForm(true)
  }

  const handleCloseFormModal = () => {
    setIsEdit(false)
    setShowForm(false)
  }

  const handleCancelDelete = () => {
    setSelectedGenre(null)
    setShowConfirmDelete(false)
  }

  const handleConfirmDelete = () => {
    deleteGenre(genre.selected)
    setSelectedGenre(null)
    setShowConfirmDelete(false)
  }

  return (
    <>
      <GenreForm
        show={showForm}
        onHide={handleCloseFormModal}
        isEdit={isEdit}
        addNewGenre={addGenre}
        saveUpdatedChanges={updateGenre}
      />
      <Container className={classes.container}>
        <header className={classes.header}>
          <h2>Genres</h2>
          <Button className="d-none d-md-block" onClick={() => setShowForm(true)}>Add Genre</Button>
          <Button className="d-block d-md-none" onClick={() => setShowForm(true)}>Add+</Button>
        </header>
        <GenresTable
          genres={genre.list}
          deleteGenre={handleDeleteGenre}
          editGenre={handleEditGenre}
        />
      </Container>
      <DeleteAlertModal
        show={showConfirmDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

Genres.propTypes = {
  addGenre: proptypes.func,
  deleteGenre: proptypes.func,
  updateGenre: proptypes.func,
}

export default Genres;