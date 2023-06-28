import { useEffect, useState, useContext } from "react";
import { AppState } from "../../Config/store/state";
import { GenreService } from '../../services';
import Genres from "./Genres.component";
import { OPERATION_OUTCOME } from "../../utils/constants";
import Spinner from "../../Common/Spinner/Spinner.component";

const GenresContainer = () => {
  const { genre, setGenresList, openSnackbar } = useContext(AppState);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getAllGenres();
  }, []);

  const getAllGenres = async () => {
    try {
      setIsLoading(true)
      const response = await GenreService.getAll();
      setGenresList(response.data)
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      setIsLoading(false)
    }
  }

  const addGenre = async (genreName) => {
    try {
      setIsLoading(true)
      const response = await GenreService.add({name: genreName});
      openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      getAllGenres()
    }
  }

  const deleteGenre = async (selectedGenre) => {
    try {
      setIsLoading(true)
      const response = await GenreService.remove(selectedGenre.id);
      openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      getAllGenres()
    }
  }

  const updateGenre = async (genreId, updatedName) => {
    try {
        setIsLoading(true)
        const response = await GenreService.update(genreId, {updatedName});
        openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
      }
      catch(e){
        console.log(e)
        openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
      }
      finally {
        getAllGenres()
      }
  }

  return isLoading ? <Spinner />
  : genre.list && (
    <Genres
      addGenre={addGenre}
      deleteGenre={deleteGenre}
      updateGenre={updateGenre}
    />
    )
}

export default GenresContainer