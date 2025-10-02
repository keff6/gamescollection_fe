import axios from "../../utils/axios";
import useAxiosPrivate from '../useAxiosPrivate'

const useConsolesAPI = () => {
  const axiosPrivate = useAxiosPrivate()

  const getAll = () => {
    return axios.get("/consoles");
  };
  
  const getByBrand = (brandId) => {
    return axios.get(`/consoles/brand/${brandId}`)
  }

  const getById = (consoleId) => {
    return axios.get(`/consoles/${consoleId}`)
  }
  
  const add = data => {
    return axiosPrivate.post("/consoles/add", data);
  };
  
  const remove = id => {
    return axiosPrivate.delete(`/consoles/remove/${id}`);
  };
  
  const update = (id, data) => {
    return axiosPrivate.put(`/consoles/edit/${id}`, data);
  };

  return {
    getAll,
    getByBrand,
    getById,
    add,
    remove,
    update
  }
}

export default useConsolesAPI