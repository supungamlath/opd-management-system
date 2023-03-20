import { useQuery } from "react-query";
import axios from "axios";

const useGetAppointments = async () => {

  // fetch all professionals

  const { data } = await axios({
    url: '/api/patient/get-appointments',
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${localStorage.jwt}`
    },
  });
  return data;
};

export default function useApi() {
  return useQuery(["patient-get-appointments"], useGetAppointments, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}