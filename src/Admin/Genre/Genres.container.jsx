import { useEffect, useState, useContext } from "react";
import { AppContext } from '../../Config/Provider';
import GenreService from '../../services/GenreService';
import Genres from "./Genres.component";
import Spinner from "../../Common/Spinner/Spinner.component";

const GenresContainer = () => {
  const [state, setState] = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getAllGenres();
  }, []);

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

  const addGenre = async (genreName) => {
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

  const deleteGenre = async (selectedGenre) => {
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

  const updateGenre = async (genreId, updatedName) => {
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

  return isLoading ? <Spinner />
  : state.genre.list && (
    <Genres
      addGenre={addGenre}
      deleteGenre={deleteGenre}
      updateGenre={updateGenre}
    />
    )
}

export default GenresContainer