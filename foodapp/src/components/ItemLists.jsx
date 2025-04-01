import React from "react";
import styles from './itemlists.module.css'; // Add CSS styles for the cards

export default function ItemLists({ food, isLoading }) {
  return (
    <div className={styles.cardContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        food.extendedIngredients.map((ingredient) => (
          <div key={ingredient.id} className={styles.card}>
            <img
              src={ingredient.image ? `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` : ""}
              alt={ingredient.name}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{ingredient.name}</h3>
              <p className={styles.cardText}>
                Amount: {ingredient.amount} {ingredient.unit}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
