import { useEffect, useCallback } from "react";
import useAppState from "../../hooks/useAppState";
import Genres from "./Genres.component";
import { OPERATION_OUTCOME, ERROR_CODES, ENTITIES } from "../../utils/constants";
import useAPI from "../../hooks/useAPI";

const GenresContainer = () => {
  const { setGenresList, openSnackbar } = useAppState();
  const { get, post, del, put, error } = useAPI(true, ENTITIES.GENRE); 

  const getAllGenres = useCallback(async () => {
    const genres = await get('/genres');
    setGenresList(genres);
  }, [])

  useEffect(() => { getAllGenres() }, []);

  useEffect(() => {
    if(error) {
      const errorCode = error?.response?.data || "";
      let message = errorCode === ERROR_CODES.IS_REFERENCED ? "Cannot delete! It is assigned to a game" : error.message;

      openSnackbar({message, type: OPERATION_OUTCOME.FAILED});
      getAllGenres();
    }
    
  }, [error, openSnackbar, getAllGenres]);

  const addGenre = async (genreName) => {
      const responseMessage = await post("/genres/add", {name: genreName})
      openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
      getAllGenres();
  }

  const deleteGenre = async (selectedGenre) => {
    const responseMessage = await del(`/genres/remove/${selectedGenre.id}`);
      openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
      getAllGenres()
  }

  const updateGenre = async (genreId, name) => {
    const responseMessage = await put(`/genres/edit/${genreId}`, {name});
        openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
        getAllGenres()
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