import { useQuery } from "react-query";
import axios from "axios";

const useGetAllProfessionals = async () => {

  // fetch all professionals

  const { data } = await axios({
    url: '/api/admin/list-professionals',
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${localStorage.jwt}`
    },
  });
  console.log(data);
  return data;
};

export default function useApi() {
  return useQuery(["listProfessionals"], useGetAllProfessionals, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}