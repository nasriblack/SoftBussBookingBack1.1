export const endPoint = {
  Admin: {
    WHITE_LIST_USERS: "/adduser",
    LIST_ALL_USERS: "/allusers",
    DELETE_USER: "/user/:id",
  },
  Reservation: {
    GET_ALL_RESERVATION: "/reservations",
    ADD_RESERVATION: "/reservation",
    GET_TODAY_RESERVATION: "/reservation_today/:destination",
  },
};

export const apiVersion = "/api/v1";
