import axios from "../utils/axios";

const getAll = () => {
  return axios.get("/consoles");
};

const getByBrand = (brandId) => {
  return axios.get(`/consoles/brand/${brandId}`)
}

const add = data => {
  return axios.post("/consoles/add", data);
};

const remove = id => {
  return axios.delete(`/consoles/remove/${id}`);
};

const update = (id, data) => {
  return axios.put(`/consoles/edit/${id}`, data);
};

const ConsoleService = {
  getAll,
  getByBrand,
  add,
  remove,
  update
};

export default ConsoleService;