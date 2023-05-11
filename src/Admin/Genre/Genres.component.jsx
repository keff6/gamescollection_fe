import { Container } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import GenresTable from './GenresTable.component';
// import classes from './Genres.module.css';

const dummyGenres = [
  { id: 1, name: 'RPG' },
  { id: 2, name: 'Stealth' },
  { id: 3, name: 'racing' },
  { id: 4, name: 'platforms' },
]

const Genres = () => {
  const genres = useLoaderData();

  console.log(genres)
  return (
    <Container>
      <GenresTable genres={dummyGenres}/>
    </Container>
  )
}

export default Genres;

export async function loader() {
  const response = await fetch('http://localhost:3030/genres');
  const resData = await response.json();
  return resData.genres;
}