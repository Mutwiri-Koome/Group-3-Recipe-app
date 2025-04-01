import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import ItemLists from "./ItemLists";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "d16d8e77cb18429e9e8232a42c6da2c6";

  useEffect(() => {
    async function fetchFood() {
      try {
        const res = await fetch(`${URL}?apiKey=${API_KEY}`);
        const data = await res.json();
        console.log(data);
        setFood(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFood();
  }, [foodId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!food.title) {
    return <p>No food details available.</p>;
  }

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img
          className={styles.recipeImage}
          src={food.image}
          alt={food.title}
        />
        <div className={styles.recipeDetails}>
          <span>
          🕕<strong>{food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            👪<strong>Serves {food.servings} people</strong>
          </span>
          <span>
            🥦<strong>{food.vegetarian ? "Vegetarian" : "Non-Vegetarian"}</strong>
          </span>
          <span>
            <strong>{food.vegan ? "Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          <span>
            <strong>${food.pricePerServing / 100} Per serving</strong>
          </span>
        </div>
        <h2>Ingredients</h2>
        <ItemLists food={food} isLoading={isLoading} />
        <h2>Instructions</h2>
        <div className={styles.recipeInstructions}>
          <ol>
            {food.analyzedInstructions?.[0]?.steps?.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
