import { useEffect, useCallback } from "react";
import { useAppState, useAPI, useApiErrorHandler } from "../../hooks";
import { OPERATION_OUTCOME, ENTITIES, API_ROUTES } from "../../utils/constants";
import Genres from "./Genres.component";

const GenresContainer = () => {
  const { setGenresList, openSnackbar } = useAppState();
  const { get, post, del, put, error } = useAPI(true, ENTITIES.GENRE);
  useApiErrorHandler(error)

  const getAllGenres = useCallback(async () => {
    const genres = await get(API_ROUTES.GENRES.GET_ALL);
    setGenresList(genres);
  }, [])

  useEffect(() => { getAllGenres() }, []);

  const addGenre = async (genreObj) => {
    const responseMessage = await post(API_ROUTES.GENRES.ADD, genreObj)
    openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
    getAllGenres();
  }

  const deleteGenre = async (selectedGenre) => {
    const responseMessage = await del(API_ROUTES.GENRES.DELETE(selectedGenre.id));
    openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
    getAllGenres()
  }

  const updateGenre = async (genreId, genreObj) => {
    const responseMessage = await put(API_ROUTES.GENRES.UPDATE(genreId), genreObj);
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