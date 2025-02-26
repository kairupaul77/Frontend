import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { MealContext } from "../Context/MealContext";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const { meals, addMeal, updateMeal, deleteMeal } = useContext(MealContext);
  const [mealDetails, setMealDetails] = useState({
    name: "",
    price: "",
    image_url: "",
  });
  const [mealIdToUpdate, setMealIdToUpdate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setMealDetails({ ...mealDetails, [e.target.name]: e.target.value });
  };

  const handleAddMeal = async () => {
    if (!mealDetails.name || !mealDetails.price || !mealDetails.image_url) {
      toast.error("Please fill in all fields.");
      return;
    }
    await addMeal(mealDetails);
    toast.success("Meal added successfully");
    setMealDetails({ name: "", price: "", image_url: "" });
  };

  const handleUpdateMeal = async () => {
    if (!mealIdToUpdate) return;
    await updateMeal(mealIdToUpdate, mealDetails);
    toast.success("Meal updated successfully");
    setMealDetails({ name: "", price: "", image_url: "" });
    setMealIdToUpdate(null);
  };

  const handleDeleteMeal = async (mealId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this meal?");
    if (confirmDelete) {
      await deleteMeal(mealId);
      toast.success("Meal deleted successfully");
    }
  };

  return (
    <section className="py-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <div className="mt-8 flex justify-center gap-6">
        <button
          className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300 shadow-lg"
          onClick={handleAddMeal}
        >
          Add New Meal
        </button>

        <button
          className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition duration-300 shadow-lg"
          onClick={handleUpdateMeal}
          disabled={!mealIdToUpdate}
        >
          Update Meal
        </button>
      </div>

      <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Meal Details</h2>
        <div className="mt-6">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Meal Name"
            value={mealDetails.name}
            onChange={handleChange}
            name="name"
          />
          <input
            type="number"
            className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Meal Price"
            value={mealDetails.price}
            onChange={handleChange}
            name="price"
          />
          <input
            type="text"
            className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Meal Image URL"
            value={mealDetails.image_url}
            onChange={handleChange}
            name="image_url"
          />
        </div>
      </div>

      <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Existing Meals</h2>
        <div className="mt-6">
          {meals && meals.length > 0 ? (
            meals.map((meal) => (
              <div
                key={meal.id}
                className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-lg hover:bg-gray-200 transition duration-300"
              >
                <span className="text-gray-800">{meal.name}</span>
                <div>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-yellow-600 transition duration-300"
                    onClick={() => {
                      setMealIdToUpdate(meal.id);
                      setMealDetails({
                        name: meal.name,
                        price: meal.price,
                        image_url: meal.image_url,
                      });
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => handleDeleteMeal(meal.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No meals available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
