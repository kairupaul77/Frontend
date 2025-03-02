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
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/meal/update/${mealId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedMeal),
      });
      if (!response.ok) throw new Error("Failed to update meal");
      await fetchMeals();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteMeal = async (mealId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/meal/delete/${mealId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete meal");
      await fetchMeals();
    } catch (err) {
      setError(err.message);
    }
  };

  // Admin: Create a menu for a specific date
  const createMenu = async (menuDate, mealIds) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:5000/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date: menuDate, meals: mealIds }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create menu");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Get menu for a specific date
  const getMenu = async (menuDate) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/menu/${menuDate}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch menu");
      }
      const data = await response.json();
      setMeals(data.meals); // ✅ Update meals state with fetched menu
    } catch (err) {
      setError(err.message);
    }
  };
  

  // Customer: Select a meal from the menu
  const selectMeal = async (menuDate, mealId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:5000/menu/select", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date: menuDate, meal_id: mealId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to select meal");
      }
      return await response.json();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <MealContext.Provider
      value={{
        meals,
        loading,
        error,
        addMeal,
        updateMeal,
        deleteMeal,
        createMenu,
        getMenu,
        selectMeal,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};
