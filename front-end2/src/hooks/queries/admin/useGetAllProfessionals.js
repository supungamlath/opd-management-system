import { useQuery } from "react-query";
import axios from "axios";

const useGetAllProfessionals = async () => {

  // fetch all professionals

  const { data } = await axios({
    url: '/api/admin/listProfessionals',
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${localStorage.jwt}`
    },
  });
  return data.accounts;
};

export default function useApi() {
  return useQuery(["all_accounts"], useGetAllProfessionals, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}