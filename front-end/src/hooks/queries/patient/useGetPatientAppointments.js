import { useQuery } from "react-query";
import axios from "axios";

const useGetPatientAppointments = async () => {
  const { data } = await axios({
    url: "/api/patient/get-appointments",
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.jwt}`,
    },
  });
  return data.loans;
};

export default function useApi() {
  return useQuery(["patient_appointments"], useGetPatientAppointments, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
