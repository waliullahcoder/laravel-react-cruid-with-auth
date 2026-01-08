import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
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
  const [viewProduct, setViewProduct] = useState<any>(null);
  const navigate = useNavigate();

  // Load products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error("Failed to fetch products:", err));
  };
const handleDelete = async (id: number) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    await api.get(`/api/product/delete/${id}`);
    setProducts(products.filter((p) => p.id !== id));
  } catch {
    alert("Delete failed");
  }
};

  

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
              <th>Action</th>
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
                  <td>
                    <button onClick={() => setViewProduct(product)}>View</button>
                    <button
                      onClick={() =>
                        navigate(`/product/edit/${product.id}`)
                      }
                      style={{ marginLeft: "5px" }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      style={{ marginLeft: "5px", color: "red" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* View */}
      {viewProduct && (
  <div className="modal-backdrop">
    <div className="modal-box">
      <h3>Product Details</h3>
      <p><b>Name:</b> {viewProduct.product_name}</p>
      <p><b>Category:</b> {viewProduct.category_name}</p>
      <p><b>Price:</b> {viewProduct.price}</p>
      <p><b>Quantity:</b> {viewProduct.quantity}</p>
      <p><b>Created:</b> {dayjs(viewProduct.created_at).fromNow()}</p>

      <button onClick={() => setViewProduct(null)}>Close</button>
    </div>
  </div>
)}

    </div>
  );
};

export default Products;
