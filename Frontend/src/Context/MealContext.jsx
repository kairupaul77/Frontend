import React, { createContext, useState, useEffect } from "react";

export const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/meal/all");
      if (!response.ok) throw new Error("Failed to fetch meals");
      const data = await response.json();
      setMeals(data.meals);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addMeal = async (meal) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:5000/meal/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(meal),
      });
      if (!response.ok) throw new Error("Failed to add meal");
      await fetchMeals();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateMeal = async (mealId, updatedMeal) => {
    if (!updatedMeal.name || !updatedMeal.price || !updatedMeal.image_url) {
      console.error("Error: Missing required fields", updatedMeal);
      return setError("All fields are required!");
    }
  
    try {
      const token = sessionStorage.getItem("token");
      console.log("token is ",token)
      const response = await fetch(`http://localhost:5000/meal/update/${mealId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedMeal.name,
          price: updatedMeal.price,
          image_url: updatedMeal.image_url,
        }),
      });
  
      const responseData = await response.json();
      console.log("Response from backend:", responseData);
  
      if (!response.ok) throw new Error(responseData.message || "Failed to update meal");
  
      await fetchMeals();
    } catch (err) {
      console.error("Update Meal Error:", err.message);
      setError(err.message);
    }
  };
  

  const deleteMeal = async (mealId) => {
    if (!mealId) {
      console.error("Meal ID is missing!");
      return;
    }
  
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }
  
      const response = await fetch(`http://localhost:5000/meal/delete/${mealId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Use correct formatting
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete meal");
      }
  
      console.log("Meal deleted successfully!");
      await fetchMeals(); // ✅ Refresh meals after deleting
    } catch (err) {
      console.error("Delete Meal Error:", err.message);
    }
  };
  
  return (
    <MealContext.Provider value={{ meals, loading, error, addMeal, updateMeal, deleteMeal }}>
      {children}
    </MealContext.Provider>
  );
};
