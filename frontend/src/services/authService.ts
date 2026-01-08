import api from "../api/axios";


// export const login = (data: { email: string; password: string }) =>
//   api.post("/login", data);

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/api/register", data);

export const product = (data: {
  product_name: string;
  cat_id: string;
  price: double;
  quantity: number;
}) => api.post("/api/product/store", data);

export const login = async (data: { email: string; password: string }) => {
  await api.get("/sanctum/csrf-cookie"); // ✅ must
  return api.post("/api/login", data);       // cookies sent automatically
};


export const logout = () => api.post("/logout");

