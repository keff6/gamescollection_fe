import useAxiosPrivate from '../useAxiosPrivate'

const useBrandsAPI = () => {
  const axiosPrivate = useAxiosPrivate()

  const getAll = () => {
    return axiosPrivate.get("/brands");
  };
  
  const add = data => {
    return axiosPrivate.post("/brands/add", data);
  };
  
  const remove = id => {
    return axiosPrivate.delete(`/brands/remove/${id}`);
  };
  
  const update = (id, data) => {
    return axiosPrivate.put(`/brands/edit/${id}`, data);
  };

  return {
    getAll,
    add,
    remove,
    update,
  }
}

export default useBrandsAPI