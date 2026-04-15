// Mifflin-St Jeor BMR formula
export function calculateCalories(data) {
  const { age, gender, height, weight, activityLevel, goal, bodyType } = data;

  // BMR
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Activity multiplier
  const activityMap = {
    low: 1.375,
    medium: 1.55,
    high: 1.725,
  };
  let tdee = bmr * (activityMap[activityLevel] || 1.55);

  // Body type adjustment
  if (bodyType === 'ectomorph') tdee *= 1.05;
  if (bodyType === 'endomorph') tdee *= 0.95;

  // Goal adjustment
  if (goal === 'lose') tdee -= 300;
  if (goal === 'gain') tdee += 300;

  const calories = Math.round(tdee);

  // Macro split (protein 30%, carbs 45%, fats 25%)
  const protein = Math.round((calories * 0.30) / 4);  // 4 cal/g
  const carbs = Math.round((calories * 0.45) / 4);    // 4 cal/g
  const fats = Math.round((calories * 0.25) / 9);     // 9 cal/g

  return { calories, protein, carbs, fats };
}

// Meal suggestions based on diet + calorie level
export function getMeals(dietPreference, calories, activityType) {
  const isHigh = calories > 2500;

  const meals = {
    veg: {
      breakfast: isHigh
        ? '4 whole wheat rotis + 1 bowl paneer bhurji + 1 glass milk'
        : '2 whole wheat rotis + 1 bowl dal + 1 banana',
      lunch: isHigh
        ? '2 cups rice + 1 bowl rajma + 1 bowl salad + 1 glass lassi'
        : '1.5 cups rice + 1 bowl dal + 1 bowl sabzi',
      dinner: isHigh
        ? '3 rotis + 1 bowl mixed veg curry + 1 bowl curd'
        : '2 rotis + 1 bowl sabzi + 1 small bowl curd',
    },
    'non-veg': {
      breakfast: isHigh
        ? '4 eggs (scrambled) + 2 bread slices + 1 glass milk'
        : '2 boiled eggs + 2 bread slices + 1 banana',
      lunch: isHigh
        ? '2 cups rice + 200g chicken curry + 1 bowl salad'
        : '1.5 cups rice + 150g chicken curry + 1 bowl salad',
      dinner: isHigh
        ? '3 rotis + 150g fish curry + 1 bowl dal'
        : '2 rotis + 100g egg curry + 1 bowl sabzi',
    },
    vegan: {
      breakfast: isHigh
        ? '2 cups oats with almond milk + 1 banana + 2 tbsp peanut butter'
        : '1 cup oats with soy milk + 1 apple',
      lunch: isHigh
        ? '2 cups rice + 1 bowl chana masala + 1 bowl salad + 1 orange'
        : '1.5 cups rice + 1 bowl dal + 1 bowl sabzi',
      dinner: isHigh
        ? '3 rotis + 1 bowl tofu sabzi + 1 bowl sprouts salad'
        : '2 rotis + 1 bowl rajma + 1 bowl salad',
    },
  };

  return meals[dietPreference] || meals['veg'];
}
