// first API call
export interface MealData {
  mealId: number
  mealName: string
  mealPrice: number
  mealImage: string
}

export interface HomeProps {
  meals: MealData[]
  loading: boolean
  error: string | null
}

// second API call
