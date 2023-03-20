import { useQuery } from "react-query";
import axios from "axios";

const useGetName = async () => {

  // fetch all professionals

  const { data } = await axios({
    url: '/api/common/get-name',
    method: 'GET',
  });
  console.log(data);
  return data;
};

export default function useApi() {
  return useQuery(["get-name"], useGetName, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}