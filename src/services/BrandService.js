import axios from "../utils/axios";

const getAll = () => {
  return axios.get("/brands");
};

const add = data => {
  return axios.post("/brands/add", data);
};

const remove = id => {
  return axios.delete(`/brands/remove/${id}`);
};

const update = (id, data) => {
  return axios.put(`/brands/edit/${id}`, data);
};

const BrandService = {
  getAll,
  add,
  remove,
  update
};

export default BrandService;