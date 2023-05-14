import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import GenreService from '../../services/GenreService';
import GenresTable from './GenresTable.component';
import GenreForm from './GenreForm.component';
import classes from './Genres.module.css';

const dummyGenres = [
  { id: 1, name: 'RPG' },
  { id: 2, name: 'Stealth' },
  { id: 3, name: 'racing' },
  { id: 4, name: 'platforms' },
]

const Genres = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genresData, setGenresData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  console.log({genresData})
  console.log({isLoading})

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
      setGenresData(response.data.genres);
      // console.log(response.data);
    }
    catch(e){
      console.log(e)
    }
    finally {
      setIsLoading(false)
    }
  }

  const addNewGenre = async (genreName) => {
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

  const deleteGenre = async (genreId) => {
    console.log('deleting '+genreId)
  }

  return (
    <>
      <GenreForm
        show={showForm}
        onHide={() => setShowForm(false)}
        genre={selectedGenre}
        addNewGenre={addNewGenre}
      />
      <Container className={classes.container}>
        <header className={classes.header}>
          <h2>Genres</h2>
          <Button onClick={openFormModal}>Add Genre</Button>
        </header>
        <GenresTable
          genres={genresData}
          setSelectedGenre={setSelectedGenre}
          isLoading={isLoading}
          deleteGenre={deleteGenre}
        />
      </Container>
    </>
  )
}

export default Genres;