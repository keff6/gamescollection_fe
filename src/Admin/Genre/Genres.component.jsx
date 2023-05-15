import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import GenreService from '../../services/GenreService';
import { AppContext } from '../../Config/Provider';
import GenresTable from './GenresTable.component';
import GenreForm from './GenreForm.component';
import { deleteConfirm } from '../../Common/DeleteAlertModal/DeleteAlertModal';
import classes from './Genres.module.css';

// const dummyGenres = [
//   { id: 1, name: 'RPG' },
//   { id: 2, name: 'Stealth' },
//   { id: 3, name: 'racing' },
//   { id: 4, name: 'platforms' },
// ]

const Genres = () => {
  const [state, setState] = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // const [selectedGenre, setSelectedGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  
  console.warn({state})

  useEffect(() => {
    getAllGenres();
  }, []);

  const openFormModal = () => {
    setShowForm(true)
  }

  const getAllGenres = async () => {
    try {
      setIsLoading(true)
      const response = await GenreService.getAll();
      setState(currentState => ({ ...currentState, genre: { ...currentState.genre, list: response.data.genres }}))
    }
    catch(e){
      console.log(e)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleAddNewGenre = async (genreName) => {
    try {
      setIsLoading(true)
      const response = await GenreService.add({name: genreName});
      console.log(response);
    }
    catch(e){
      console.log(e)
    }
    finally {
      getAllGenres()
    }
  }

  const handleDeleteGenre = async (selectedGenre) => {
    setState(currentState => ({ ...currentState, genre: { ...currentState.genre, selected: selectedGenre }}))
    if (await deleteConfirm()) {
      try {
        setIsLoading(true)
        const response = await GenreService.remove(selectedGenre.id);
        console.log(response);
      }
      catch(e){
        console.log(e)
      }
      finally {
        getAllGenres()
      }
    }
  }

  const handleEditGenre = (selectedGenre) => {
    console.log(selectedGenre)
    setState(currentState => ({ ...currentState, genre: { ...currentState.genre, selected: selectedGenre }}))
    setIsEdit(true)
    setShowForm(true)
      // try {
      //   setIsLoading(true)
      //   const response = await GenreService.remove(selectedGenre.id);
      //   console.log(response);
      // }
      // catch(e){
      //   console.log(e)
      // }
      // finally {
      //   getAllGenres()
      // }
  }

  const saveUpdatedChanges = async (genreId, updatedName) => {
    try {
        setIsLoading(true)
        const response = await GenreService.update(genreId, {updatedName});
        console.log(response);
      }
      catch(e){
        console.log(e)
      }
      finally {
        getAllGenres()
      }
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
        saveUpdatedChanges={saveUpdatedChanges}
      />
      <Container className={classes.container}>
        <header className={classes.header}>
          <h2>Genres</h2>
          <Button onClick={openFormModal}>Add Genre</Button>
        </header>
        <GenresTable
          genres={state.genre.list}
          isLoading={isLoading}
          deleteGenre={handleDeleteGenre}
          editGenre={handleEditGenre}
        />
      </Container>
    </>
  )
}

export default Genres;