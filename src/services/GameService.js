import axios from "../utils/axios";

const getAll = () => {
  return axios.get("/games");
};

const getWishlistByConsole = (consoleId) => {
  return axios.get(`/games/wishlist/${consoleId}`)
}

const getByParams = (paramsObj) => {
  let paramsString = '?';
  const params = Object.keys(paramsObj)
  for(let param of params) {
    paramsString += `${param}=${encodeURIComponent(paramsObj[param])}&`
  }
  paramsString.slice(0, -1)
  const sanitizedParams = paramsString.slice(0, -1)
  return axios.get(`/games/get${sanitizedParams}`)
}

const add = data => {
  return axios.post("/games/add", data);
};

const remove = id => {
  return axios.delete(`/games/remove/${id}`);
};

const update = (id, data) => {
  return axios.put(`/games/edit/${id}`, data);
};

const search = (searchTerm, consoleId) => {
  return axios.post("/games/search", {searchTerm, consoleId})
}

const ConsoleService = {
  getAll,
  getWishlistByConsole,
  getByParams,
  add,
  remove,
  update,
  search,
};

export default ConsoleService;