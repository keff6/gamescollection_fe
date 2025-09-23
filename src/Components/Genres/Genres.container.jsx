import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAppState from "../../hooks/useAppState";
import Genres from "./Genres.component";
import {useGenresAPI} from "../../hooks/api";
import { OPERATION_OUTCOME, ERROR_CODES } from "../../utils/constants";

const GenresContainer = () => {
  const { setGenresList, openSnackbar, setIsLoading } = useAppState();
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
      const errorCode = e?.response?.data || "";
      if(errorCode === ERROR_CODES.DUPLICATED) {
        throw new Error("Genre already exists in database")
      }
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
      const errorCode = e?.response?.data || "";
      let message = e.message;
      if(errorCode === ERROR_CODES.IS_REFERENCED) {
        message = "Cannot delete this genre because it's assigned to a game"
      }
      openSnackbar({message, type: OPERATION_OUTCOME.FAILED})
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
        const errorCode = e?.response?.data || "";
        if(errorCode === ERROR_CODES.DUPLICATED) {
          throw new Error("Genre already exists in database")
        }
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