import axios from "../utils/axios";

const getAll = () => {
  return axios.get("/genres");
};

const add = data => {
  return axios.post("/genres/add", data);
};

const remove = id => {
  return axios.delete(`/genres/remove/${id}`);
};

const update = (id, data) => {
  return axios.put(`/genres/edit/${id}`, data);
};

const GenreService = {
  getAll,
  add,
  remove,
  update
};

export default GenreService;