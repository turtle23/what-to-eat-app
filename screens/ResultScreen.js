import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { calculateCalories, getMeals } from '../utils/calculator';

function MacroCard({ label, value, unit, color }) {
  return (
    <View style={[styles.macroCard, { borderTopColor: color, borderTopWidth: 3 }]}>
      <Text style={styles.macroValue}>{value}<Text style={styles.macroUnit}>{unit}</Text></Text>
      <Text style={styles.macroLabel}>{label}</Text>
    </View>
  );
}

function MealCard({ mealTime, description }) {
  const icons = { Breakfast: '🌅', Lunch: '☀️', Dinner: '🌙' };
  return (
    <View style={styles.mealCard}>
      <Text style={styles.mealTime}>{icons[mealTime]} {mealTime}</Text>
      <Text style={styles.mealDesc}>{description}</Text>
    </View>
  );
}

export default function ResultScreen({ route, navigation }) {
  const data = route.params;
  const { calories, protein, carbs, fats } = calculateCalories(data);
  const meals = getMeals(data.dietPreference, calories, data.activityType);

  const goalLabel = { lose: 'Weight Loss', maintain: 'Maintenance', gain: 'Weight Gain' };
  const dietLabel = { veg: 'Vegetarian', 'non-veg': 'Non-Vegetarian', vegan: 'Vegan' };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Summary tags */}
      <View style={styles.tagRow}>
        <View style={styles.tag}><Text style={styles.tagText}>{goalLabel[data.goal]}</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>{dietLabel[data.dietPreference]}</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>{data.activityType}</Text></View>
      </View>

      {/* Calories */}
      <View style={styles.calorieBox}>
        <Text style={styles.calorieNum}>{calories}</Text>
        <Text style={styles.calorieLabel}>kcal / day</Text>
      </View>

      {/* Macros */}
      <Text style={styles.sectionTitle}>Daily Macros</Text>
      <View style={styles.macroRow}>
        <MacroCard label="Protein" value={protein} unit="g" color="#4F46E5" />
        <MacroCard label="Carbs"   value={carbs}   unit="g" color="#10B981" />
        <MacroCard label="Fats"    value={fats}    unit="g" color="#F59E0B" />
      </View>

      {/* Meals */}
      <Text style={styles.sectionTitle}>Suggested Meals</Text>
      <MealCard mealTime="Breakfast" description={meals.breakfast} />
      <MealCard mealTime="Lunch"     description={meals.lunch} />
      <MealCard mealTime="Dinner"    description={meals.dinner} />

      {/* Disclaimer */}
      <Text style={styles.disclaimer}>
        * Quantities are approximate. Adjust based on hunger and progress.
      </Text>

      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnText}>← Recalculate</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, paddingBottom: 40 },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  tag: { backgroundColor: '#EEF2FF', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 20 },
  tagText: { fontSize: 12, color: '#4F46E5', fontWeight: '500', textTransform: 'capitalize' },

  calorieBox: { alignItems: 'center', backgroundColor: '#4F46E5', borderRadius: 16, padding: 24, marginBottom: 24 },
  calorieNum: { fontSize: 52, fontWeight: '700', color: '#fff' },
  calorieLabel: { fontSize: 16, color: '#C7D2FE', marginTop: 4 },

  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#111', marginBottom: 12, marginTop: 4 },

  macroRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  macroCard: {
    flex: 1, backgroundColor: '#fafafa', borderRadius: 12,
    borderWidth: 1, borderColor: '#eee', padding: 14, alignItems: 'center',
  },
  macroValue: { fontSize: 22, fontWeight: '700', color: '#111' },
  macroUnit: { fontSize: 13, fontWeight: '400', color: '#666' },
  macroLabel: { fontSize: 12, color: '#777', marginTop: 4 },

  mealCard: {
    backgroundColor: '#fafafa', borderRadius: 12,
    borderWidth: 1, borderColor: '#eee', padding: 14, marginBottom: 10,
  },
  mealTime: { fontSize: 14, fontWeight: '600', color: '#111', marginBottom: 6 },
  mealDesc: { fontSize: 14, color: '#444', lineHeight: 20 },

  disclaimer: { fontSize: 12, color: '#aaa', marginTop: 16, textAlign: 'center' },

  backBtn: {
    marginTop: 20, borderWidth: 1, borderColor: '#4F46E5',
    padding: 14, borderRadius: 12, alignItems: 'center',
  },
  backBtnText: { color: '#4F46E5', fontSize: 15, fontWeight: '500' },
});
