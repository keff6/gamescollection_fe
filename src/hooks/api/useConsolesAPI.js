import axios from "../../api/axios";
import { CONSOLE_FILTER_OPTIONS } from "../../utils/constants";
import useAxiosPrivate from '../useAxiosPrivate'

const useConsolesAPI = () => {
  const axiosPrivate = useAxiosPrivate()

  const getAll = () => {
    return axios.get("/consoles");
  };
  
  const getByBrand = (brandId, filter) => {
    let typeFilter = '';
    if(filter === CONSOLE_FILTER_OPTIONS.HOME) typeFilter = '?type=0'
    if(filter === CONSOLE_FILTER_OPTIONS.PORTABLE) typeFilter = '?type=1'
    return axios.get(`/consoles/brand/${brandId}${typeFilter}`)
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