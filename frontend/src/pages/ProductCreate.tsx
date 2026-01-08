import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

interface Category {
  id: number;
  cat_name: string;
}

const ProductForm = () => {
  const { id } = useParams(); // 👈 edit হলে id থাকবে
  const isEdit = !!id;

  const navigate = useNavigate();

  const [form, setForm] = useState({
    product_name: "",
    cat_id: "",
    price: "",
    quantity: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  /* 🔹 Load Categories */
  useEffect(() => {
    api.get("/api/products").then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  /* 🔹 Load Product for Edit */
useEffect(() => {
  if (isEdit) {
    api.get(`/api/product/show/${id}`).then((res) => {
      const p = res.data.product ?? res.data; // 👈 safety
     console.log("wali",p);
      setForm({
        product_name: p.product_name ?? "",
        cat_id: String(p.cat_id),   // ✅ MUST
        price: String(p.price),
        quantity: String(p.quantity),
      });
    });
  }
}, [id, isEdit]);

  /* 🔹 Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await api.post(`/api/product/update/${id}`, form);
         setModalMessage("Product Updated successfully!");
      setShowModal(true);
       setTimeout(() => {
        setShowModal(false);
        navigate("/products");
      }, 1500);
      } else {
        await api.post("/api/product/store", form);
         setModalMessage("Product Added successfully!");
      setShowModal(true);
       setTimeout(() => {
        setShowModal(false);
        navigate("/products");
      }, 1500);
      }
     
     
      navigate("/products");
    } catch {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bode">
    <div className="login-card">
      <h2>{isEdit ? "Edit Product" : "Create Product"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Product Name"
          value={form.product_name}
          onChange={(e) =>
            setForm({ ...form, product_name: e.target.value })
          }
          required
        />

        <select
        value={form.cat_id}
        onChange={(e) =>
            setForm({ ...form, cat_id: e.target.value })
        }
        required
        >
        <option value="">Select Category</option>
        {categories.map((c) => (
            <option key={c.id} value={String(c.id)}>
            {c.cat_name}
            </option>
        ))}
        </select>


        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
          required
        />

        <button type="submit">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default ProductForm;
