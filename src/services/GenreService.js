import axios from "../utils/axios";

const getAll = () => {
  return axios.get("/genres");
};

const add = data => {
  return axios.post("/genres/add", data);
};

const GenreService = {
  getAll,
  add
};

export default GenreService;