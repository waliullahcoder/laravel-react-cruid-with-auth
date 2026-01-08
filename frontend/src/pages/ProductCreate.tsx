import { useEffect, useState } from "react";
import { product } from "../services/authService";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

interface Category {
  id: number;
  cat_name: string;
}

const Product = () => {
  const [form, setForm] = useState({
    product_name: "",
    cat_id: "",
    price: "",
    quantity: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  /* 🔹 Fetch Categories from API */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/api/products");
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  /* 🔹 Submit Product */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await product(form);

      setModalMessage("Product created successfully!");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/products");
      }, 1500);
    } catch (err) {
      setModalMessage("Product creation failed!");
      setShowModal(true);
    }
  };

  return (
    <div className="bode">
      <div className="login-container">
        <div className="login-card">
          <h2>Create Product</h2>

          <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <input
              placeholder="Product Name"
              value={form.product_name}
              onChange={(e) =>
                setForm({ ...form, product_name: e.target.value })
              }
              required
            />
            <br />

            {/* Category Select */}
            <select
              value={form.cat_id}
              onChange={(e) =>
                setForm({ ...form, cat_id: e.target.value })
              }
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.cat_name}
                </option>
              ))}
            </select>
            <br />

            {/* Price */}
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              required
            />
            <br />

            {/* Quantity */}
            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
              required
            />
            <br />

            <button type="submit">Create Product</button>
          </form>
        </div>

        {/* 🔹 Modal */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal-box">
              <p>{modalMessage}</p>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
