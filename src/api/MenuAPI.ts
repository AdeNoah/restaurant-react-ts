import type { MealData } from "../data/types"

// structure if meal data 
// "meals": [
//     {
//       "strMeal": "BeaverTails",
//       "strMealThumb": "https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg",
//       "idMeal": "52928",
//       "strArea": "Canadian",
//       "strCountry": "Canada"
//     }
//   ]

// structure of drink data
// "drinks": [
//     {
//       "strDrink": "110 in the shade",
//       "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/xxyywq1454511117.jpg",
//       "idDrink": "15423"
//     },
//   ]



// meals api links 
const startersURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese"
const mainCoursesURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=France"
const dessertsURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=India"


// drink api links 
const alcoholicDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"
const nonAlcoholicDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
const cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"


async function fetchItems(url: string, priceFactor: number): Promise<MealData[]> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()
  const items = Array.isArray(result.meals)
    ? result.meals
    : Array.isArray(result.drinks)
      ? result.drinks
      : []

  return items.map((item: any) => ({
    mealId: Number(item.idMeal ?? item.idDrink) || 0,
    mealName: item.strMeal ?? item.strDrink ?? "Unknown item",
    mealPrice: Number((Math.random() * priceFactor).toFixed(2)),
    mealImage: item.strMealThumb ?? item.strDrinkThumb ?? "",
  }))
}


export async function fetchStarters(): Promise<MealData[]> {
  return fetchItems(startersURL, 10)
}

export async function fetchMainCourses(): Promise<MealData[]> {
  return fetchItems(mainCoursesURL, 20)
}

export async function fetchDesserts(): Promise<MealData[]> {
  return fetchItems(dessertsURL, 15)
}

export async function fetchAlcoholicDrinks(): Promise<MealData[]> {
  return fetchItems(alcoholicDrinkURL, 15)
}

export async function fetchNonAlcoholicDrinks(): Promise<MealData[]> {
  return fetchItems(nonAlcoholicDrinkURL, 20)
}

export async function fetchCocktails(): Promise<MealData[]> {
  return fetchItems(cocktailURL, 25)
}
