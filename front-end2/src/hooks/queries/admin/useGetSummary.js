import { useQuery } from "react-query";
import axios from "axios";

const useGetSummary = async () => {

  const { data } = await axios({
    url: '/api/admin/get-summary',
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${localStorage.jwt}`
    },
  });
  console.log(data);
  return data;
};

export default function useApi() {
  return useQuery(["get-summary"], useGetSummary, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}