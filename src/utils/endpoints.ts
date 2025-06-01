export const endPoint = {
  Admin: {
    WHITE_LIST_USERS: "/adduser",
    LIST_ALL_USERS: "/allusers",
    DELETE_USER: "/user/:id",
    VERIFY_USER: "/verify_user",
  },
  Reservation: {
    GET_ALL_RESERVATION: "/reservations",
    ADD_RESERVATION: "/reservation",
    GET_TODAY_RESERVATION: "/reservation_today/:destination",
    CANCEL_RESERVARTION: "/reservartion/cancel_reservartion",
  },
  Authentification: {
    REGISTRATION: "/register",
    LOGIN: "/login",
    LOGOUT: "/logout",
  },
};

export const apiVersion = "/api/v1";
