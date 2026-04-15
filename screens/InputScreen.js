import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Alert
} from 'react-native';

// Reusable option selector
function OptionGroup({ label, options, selected, onSelect }) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionRow}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.option, selected === opt.value && styles.optionSelected]}
            onPress={() => onSelect(opt.value)}
          >
            <Text style={[styles.optionText, selected === opt.value && styles.optionTextSelected]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function InputScreen({ navigation }) {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [bodyType, setBodyType] = useState('mesomorph');
  const [activityType, setActivityType] = useState('gym');
  const [activityLevel, setActivityLevel] = useState('medium');
  const [goal, setGoal] = useState('maintain');
  const [diet, setDiet] = useState('veg');

  function handleSubmit() {
    if (!age || !weight || !height) {
      Alert.alert('Missing Info', 'Please fill in age, weight, and height.');
      return;
    }
    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
      Alert.alert('Invalid Input', 'Age, weight, and height must be numbers.');
      return;
    }

    navigation.navigate('Result', {
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      gender,
      bodyType,
      activityType,
      activityLevel,
      goal,
      dietPreference: diet,
    });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Tell us about yourself</Text>

      {/* Number inputs */}
      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="e.g. 25"
            value={age}
            onChangeText={setAge}
          />
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="e.g. 70"
            value={weight}
            onChangeText={setWeight}
          />
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 170"
          value={height}
          onChangeText={setHeight}
        />
      </View>

      <OptionGroup
        label="Gender"
        options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
        selected={gender}
        onSelect={setGender}
      />

      <OptionGroup
        label="Body Type"
        options={[
          { label: 'Ectomorph', value: 'ectomorph' },
          { label: 'Mesomorph', value: 'mesomorph' },
          { label: 'Endomorph', value: 'endomorph' },
        ]}
        selected={bodyType}
        onSelect={setBodyType}
      />

      <OptionGroup
        label="Activity Type"
        options={[
          { label: 'Running', value: 'running' },
          { label: 'Gym', value: 'gym' },
          { label: 'Cycling', value: 'cycling' },
          { label: 'Rest Day', value: 'rest' },
        ]}
        selected={activityType}
        onSelect={setActivityType}
      />

      <OptionGroup
        label="Activity Level"
        options={[
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ]}
        selected={activityLevel}
        onSelect={setActivityLevel}
      />

      <OptionGroup
        label="Goal"
        options={[
          { label: 'Lose', value: 'lose' },
          { label: 'Maintain', value: 'maintain' },
          { label: 'Gain', value: 'gain' },
        ]}
        selected={goal}
        onSelect={setGoal}
      />

      <OptionGroup
        label="Diet Preference"
        options={[
          { label: 'Veg', value: 'veg' },
          { label: 'Non-Veg', value: 'non-veg' },
          { label: 'Vegan', value: 'vegan' },
        ]}
        selected={diet}
        onSelect={setDiet}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Get My Meal Plan →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 20, fontWeight: '600', marginBottom: 20, color: '#111' },
  label: { fontSize: 13, color: '#555', marginBottom: 6, fontWeight: '500' },
  group: { marginBottom: 18 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  halfInput: { flex: 1 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    padding: 10, fontSize: 15, color: '#111', backgroundColor: '#fafafa',
  },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: 20, borderWidth: 1, borderColor: '#ddd',
    backgroundColor: '#fafafa',
  },
  optionSelected: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  optionText: { fontSize: 13, color: '#444' },
  optionTextSelected: { color: '#fff', fontWeight: '500' },
  button: {
    marginTop: 24, backgroundColor: '#4F46E5',
    padding: 16, borderRadius: 12, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
