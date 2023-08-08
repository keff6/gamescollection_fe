import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppState } from "../../Config/store/state";
import Genres from "./Genres.component";
import {useGenresAPI} from "../../hooks/api";
import { OPERATION_OUTCOME } from "../../utils/constants";

const GenresContainer = () => {
  const { setGenresList, openSnackbar, setIsLoading } = useContext(AppState);
  const genresAPI = useGenresAPI()

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getAllGenres();
  }, []);

  const getAllGenres = async () => {
    try {
      setIsLoading(true)
      const response = await genresAPI.getAll();
      setGenresList(response.data)
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
      navigate('/', { state: { from: location }, replace: true });
    }
    finally {
      setIsLoading(false)
    }
  }

  const addGenre = async (genreName) => {
    try {
      setIsLoading(true)
      const response = await genresAPI.add({name: genreName});
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
      const response = await genresAPI.remove(selectedGenre.id);
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

  const updateGenre = async (genreId, name) => {
    try {
        setIsLoading(true)
        const response = await genresAPI.update(genreId, {name});
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

  return (
    <Genres
      addGenre={addGenre}
      deleteGenre={deleteGenre}
      updateGenre={updateGenre}
    />
    )
}

export default GenresContainer