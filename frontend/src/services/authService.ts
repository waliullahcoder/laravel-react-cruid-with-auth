import api from "../api/axios";


export const login = (data: { email: string; password: string }) =>
  api.post("/login", data);

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/register", data);

export const logout = () => api.post("/logout");

