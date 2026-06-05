import { http } from "@/api/http";

export const getReservations = () => {
  return http.get("/reservations");
}
  

export const createReservation = (data) => {
  return http.post("/reservations", data);
}

export const editReservation = (data, id) => {
  return http.patch(`/reservations/${id}` , data)
}