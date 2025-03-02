import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { MealContext } from "../Context/MealContext";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const { meals, addMeal, updateMeal, deleteMeal, createMenu } = useContext(MealContext);
  
  const [mealDetails, setMealDetails] = useState({ name: "", price: "", image_url: "" });
  const [mealIdToUpdate, setMealIdToUpdate] = useState(null);
  const [menuDate, setMenuDate] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [menuMessage, setMenuMessage] = useState("");

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

  const handleCreateMenu = async () => {
    if (!menuDate || selectedMeals.length === 0) {
      toast.error("Select a date and at least one meal.");
      return;
    }
    await createMenu(menuDate, selectedMeals);
    toast.success("Menu created successfully!");
    setMenuMessage(`Menu for ${menuDate} has been added.`);
    setMenuDate("");
    setSelectedMeals([]);
  };

  const handleMealSelection = (mealId) => {
    setSelectedMeals((prev) =>
      prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId]
    );
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

      {/* Meal Details Form */}
      <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Meal Details</h2>
        <div className="mt-6">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Meal Name"
            value={mealDetails.name}
            onChange={handleChange}
            name="name"
          />
          <input
            type="number"
            className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Meal Price"
            value={mealDetails.price}
            onChange={handleChange}
            name="price"
          />
          <input
            type="text"
            className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Meal Image URL"
            value={mealDetails.image_url}
            onChange={handleChange}
            name="image_url"
          />
        </div>
      </div>

      {/* Meal List */}
      <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Existing Meals</h2>
        <div className="mt-6">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <div
                key={meal.id}
                className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-lg"
              >
                <span className="text-gray-800">{meal.name}</span>
                <div>
                  <input
                    type="checkbox"
                    checked={selectedMeals.includes(meal.id)}
                    onChange={() => handleMealSelection(meal.id)}
                    className="mr-2"
                  />
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-4"
                    onClick={() => {
                      setMealIdToUpdate(meal.id);
                      setMealDetails({ name: meal.name, price: meal.price, image_url: meal.image_url });
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
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

      {/* Menu Creation Section */}
      <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create Menu</h2>
        <input
          type="date"
          className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
          value={menuDate}
          onChange={(e) => setMenuDate(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg mt-4 w-full"
          onClick={handleCreateMenu}
        >
          Create Menu
        </button>
        {menuMessage && <p className="text-green-700 text-center mt-4">{menuMessage}</p>}
      </div>
    </section>
  );
};

export default AdminDashboard;
