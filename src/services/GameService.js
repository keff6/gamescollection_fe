import axios from "../utils/axios";

const getAll = () => {
  return axios.get("/games");
};

const getByConsole = (consoleId) => {
  return axios.get(`/games/console/${consoleId}`)
}

const getByParams = (paramsObj) => {
  console.log({paramsObj})
  let paramsString = '?';
  const params = Object.keys(paramsObj)
  for(let param of params) {
    paramsString += `${param}=${paramsObj[param]}`
  }
  return axios.get(`/games/get${paramsString}`)
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

const ConsoleService = {
  getAll,
  getByConsole,
  getByParams,
  add,
  remove,
  update
};

export default ConsoleService;