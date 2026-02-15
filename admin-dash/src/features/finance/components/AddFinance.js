import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFinanceStore from "../../../stores/financeStore";
import { showNotification } from "../../common/headerSlice";

const AddFinance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchFinanceById, registerFinance, updateFinance } =
    useFinanceStore();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    userId: "673f75687c47f031e23e0dd3",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ID from params:", id);
    if (!id) return;

    const fetchFinanceData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFinanceById(id);
        console.log("---------");
        console.log(data);
        console.log("---------");
        setFormData(data || {});
      } catch (err) {
        setError("Failed to fetch finance details");
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, [id, fetchFinanceById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await updateFinance(id, formData);
        dispatch(showNotification({ message: "Finance updated!", status: 1 }));
      } else {
        await registerFinance(formData);
        dispatch(showNotification({ message: "Finance added!", status: 1 }));
      }
      navigate("/app/finance");
    } catch (err) {
      setError("Failed to save finance details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {id ? "Update Finance" : "Add Finance"}
      </h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="itday">IT-DAY</option>
            <option value="jday">JDAY</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full `}
          disabled={loading}
        >
          {loading
            ? id
              ? "Updating..."
              : "Adding..."
            : id
            ? "Update Finance"
            : "Add Finance"}
        </button>
      </form>
    </div>
  );
};

export default AddFinance;
