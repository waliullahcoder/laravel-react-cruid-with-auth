import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import dayjs from "../utils/dayjs";
interface Product {
  id: number;
  product_name: string;
  category_name: string;
  price: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Load products from API
  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div className="bode">
      <div className="table-card">
        <ul>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/register">Registration</Link></li>
    <li><Link to="/product/create">Create Product</Link></li>
    <li><Link to="/logout">Logout</Link></li>
  </ul>
        <h2>Products List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.category_name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{dayjs(product.created_at).fromNow()}</td>
                  <td>{dayjs(product.updated_at).fromNow()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
