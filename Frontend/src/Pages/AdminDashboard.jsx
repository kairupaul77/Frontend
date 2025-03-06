import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { MealContext } from "../Context/MealContext";
import { toast } from "react-toastify";
import ProfileUploader from "./ProfileUploader";

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const { meals, fetchMeals, addMeal, updateMeal, deleteMeal, createMenu } = useContext(MealContext);

  const [mealDetails, setMealDetails] = useState({ name: "", price: "", image_url: "" });
  const [mealIdToUpdate, setMealIdToUpdate] = useState(null);
  const [menuDate, setMenuDate] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [menuMessage, setMenuMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false); // For image upload feedback

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/menu");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchMeals(); // Fetch meals when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setIsUploading(true); // Show loading state
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append('file', files[i]);
      }
      data.append('upload_preset', 'pafaan');
      data.append('cloud_name', 'dzgrreewq');

      fetch('https://api.cloudinary.com/v1_1/dzgrreewq/image/upload', {
        method: 'POST',
        body: data,
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.secure_url) {
            setMealDetails({
              ...mealDetails,
              [name]: result.secure_url,
            });
            toast.success("Image uploaded successfully!");
          } else {
            toast.error("Failed to upload image.");
          }
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          toast.error("Error uploading file.");
        })
        .finally(() => {
          setIsUploading(false); // Hide loading state
        });
    } else {
      setMealDetails({ ...mealDetails, [name]: value });
    }
  };

  const handleAddMeal = async () => {
    if (!mealDetails.name || !mealDetails.price || !mealDetails.image_url) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (isNaN(mealDetails.price) || mealDetails.price <= 0) {
      toast.error("Price must be a positive number.");
      return;
    }
    await addMeal(mealDetails);
    setMealDetails({ name: "", price: "", image_url: "" }); // Reset form
    toast.success("Meal added successfully!");
  };

  const handleUpdateMeal = async () => {
    if (!mealIdToUpdate) {
      toast.error("Select a meal to update.");
      return;
    }
    await updateMeal(mealIdToUpdate, mealDetails);
    setMealDetails({ name: "", price: "", image_url: "" }); // Reset form
    setMealIdToUpdate(null);
    toast.success("Meal updated successfully!");
  };

  const handleDeleteMeal = async (id) => {
    await deleteMeal(id);
    toast.success("Meal deleted successfully!");
  };

  const handleCreateMenu = async () => {
    if (!menuDate || selectedMeals.length === 0) {
      toast.error("Select a date and at least one meal.");
      return;
    }
    try {
      await createMenu(menuDate, selectedMeals);
      toast.success("Menu created successfully!");
      setMenuMessage(`Menu for ${menuDate} has been added.`);
      setMenuDate("");
      setSelectedMeals([]);
    } catch (error) {
      toast.error("Failed to create menu.");
    }
  };

  

  return (
    <section className="py-12 bg-gray-100 flex flex-col items-center">
      <ProfileUploader userEmail={user?.email} />
      <div className="w-2/3 flex gap-8 mt-8">
        {/* Existing Meals */}
        <div className="w-1/2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Existing Meals</h2>
          <div className="mt-6">
          {meals && meals.length > 0 ? (
  meals.map((meal) => (
    <div key={meal.id} className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-lg">
      <span className="text-gray-800">{meal.name}</span>
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => {
            setMealDetails(meal);
            setMealIdToUpdate(meal.id);
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => handleDeleteMeal(meal.id)}
        >
          Delete
        </button>
        <input
          type="checkbox"
          checked={selectedMeals.includes(meal.id)}
          onChange={() => {
            setSelectedMeals((prev) => {
              if (prev.includes(meal.id)) {
                // If the meal is already selected, remove it
                return prev.filter((id) => id !== meal.id);
              } else {
                // Otherwise, add the meal id to selectedMeals
                return [...prev, meal.id];
              }
            });
          }}
        />
      </div>
    </div>
  ))
) : (
  <p className="text-center text-gray-500">No available meals for menu.</p>
)}

          </div>
          <input
            type="date"
            className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
            value={menuDate}
            onChange={(e) => setMenuDate(e.target.value)}
          />
          <button
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg mt-4 w-full"
            onClick={handleCreateMenu}
          >
            Create Menu
          </button>
        </div>

        {/* Meal Details Form */}
        <div className="w-1/2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Meal Details</h2>
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
              type="file"
              className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Meal Image URL"
              onChange={handleChange}
              name="image_url"
              disabled={isUploading}
            />
            {isUploading && <p className="text-blue-500 mt-2">Uploading image...</p>}
          </div>
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg mt-4 w-full"
            onClick={mealIdToUpdate ? handleUpdateMeal : handleAddMeal}
          >
            {mealIdToUpdate ? "Update Meal" : "Add Meal"}
          </button>
          {menuMessage && <p className="text-green-700 text-center mt-4">{menuMessage}</p>}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;