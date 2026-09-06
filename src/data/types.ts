
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


//  types for the community suggestions form in the About page
export interface SuggestionsOptions {
  label: string
  value: string
}

export interface SuggestionsDropdownProps {
  options: SuggestionsOptions[]
  selected: SuggestionsOptions | null
  onChange: (option: SuggestionsOptions | null) => void
  placeholder?: string
}

