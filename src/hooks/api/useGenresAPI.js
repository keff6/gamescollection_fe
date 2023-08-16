import useAxiosPrivate from '../useAxiosPrivate'

const useGenresAPI = () => {
  const axiosPrivate = useAxiosPrivate()

  const getAll = () => {
    return axiosPrivate.get("/genres");
  };
  
  const add = data => {
    return axiosPrivate.post("/genres/add", data);
  };
  
  const remove = id => {
    return axiosPrivate.delete(`/genres/remove/${id}`);
  };
  
  const update = (id, data) => {
    return axiosPrivate.put(`/genres/edit/${id}`, data);
  };

  return {
    getAll,
    add,
    remove,
    update,
  }
}

export default useGenresAPI