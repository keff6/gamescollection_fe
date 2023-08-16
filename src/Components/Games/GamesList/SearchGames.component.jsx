import { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import proptypes from "prop-types";
import useAppState from "../../../hooks/useAppState";

const SearchGames = ({ searchGames }) => {
  const { game: { searchTerm }, setSearchTerm } = useAppState();
  const [isValid, setIsValid] = useState(false)

  useEffect(() => () => {setSearchTerm('')},[])

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value)
    if(searchTerm.length > 0) setIsValid(true)
    else setIsValid(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(isValid) searchGames();
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Game title"
            aria-label="Game title"
            aria-describedby="game-title"
            onChange={handleSearchInputChange}
            value={searchTerm}
          />
          <Button variant="primary" id="game-title" type="submit" disabled={!isValid}>
            <Search />
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

SearchGames.propTypes = {
  searchGames: proptypes.func,
}

export default SearchGames;