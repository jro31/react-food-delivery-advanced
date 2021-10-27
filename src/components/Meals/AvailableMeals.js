import { useEffect, useState, useCallback } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('https://react-http-94026-default-rtdb.europe-west1.firebasedatabase.app/meals.json')

      if (!response.ok) {
        throw new Error('Hope you like being hungry');
      }

      const data = await response.json();

      const returnedMeals = [];
      for (const key in data) {
        returnedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      };

      setMeals(returnedMeals);
    } catch (error) {
      setErrorMessage(error.message)
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  let content = <p>No meals available</p>
  if (meals.length > 0) {
    content =
    <ul>
      {meals.map((meal) => (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      ))}
    </ul>
  }
  if (errorMessage) content = <p>{errorMessage}</p>
  if (isLoading) content = <p>Loading...</p>

  return (
    <section className={classes.meals}>
      <Card>
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
