import React, { useState } from "react";
import { useEffect } from "react";
import { Card } from "../UI/Card";

import classes from "./AvailableMeals.module.css";
import { Mealitem } from "./MealItem/Mealitem";

export const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [httpError,setHttpError] = useState(null);

  useEffect(() => {
         const fetchMeals = async () => {
          setIsLoading(true);
          const response = await fetch('https://deploy-eb17c-default-rtdb.firebaseio.com/meals.json');
          console.log(response);
          if(!response.ok){
            throw new Error('Something went wrong!');
          }
   
          const responseData =await response.json();
          
          const LoadedMeals = [];

          for(const key in responseData){
             LoadedMeals.push({
              id:key,
              name:responseData[key].name,
              description:responseData[key].description,
              price:responseData[key].price
             })
          }

          setMeals(LoadedMeals);
          setIsLoading(false);
          
         }
         
        
         fetchMeals().catch((error) => {
                 setIsLoading(false)
                 setHttpError(error.message)
         });
         
  },[])

  if(isLoading){
    return <section  className={classes.MealsLoading}>
      <p >Loading...</p>
    </section>
  }

  if(httpError){
    return <section  className={classes.MealsError}>
    <p >{httpError}</p>
  </section>
  }
  

 

 



const mealsList = meals.map((meal) => (
  <Mealitem
    key={meal.id}
    id={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
  />
));

return (
  <section className={classes.meals}>
    <Card>
      <ul>{mealsList}</ul>
    </Card>
  </section>
);
}
