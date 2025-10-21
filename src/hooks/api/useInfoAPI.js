import axios from "../../api/axios";

const useInfoAPI = () => {

  const getTotals = () => {
    return axios.get("/info/getTotals");
  };
  


  return {
    getTotals,
  }
}

export default useInfoAPI