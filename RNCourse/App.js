import { useState } from 'react';
import { StyleSheet, View , FlatList, Text, Pressable} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalItem from '../components/GoalItem'; 
import GoalInput from '../components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText.trim().length === 0) {
      return; // Don't add empty goals
    }
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      {text: enteredGoalText.trim(), id: Date.now().toString() + Math.random().toString()},
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (  
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}> 
        <View style={styles.header}>
          <Text style={styles.title}>My Goals</Text>
          <Text style={styles.subtitle}>
            {courseGoals.length === 0 
              ? 'No goals yet. Add one to get started!' 
              : `${courseGoals.length} ${courseGoals.length === 1 ? 'goal' : 'goals'}`}
          </Text>
        </View>
        <Pressable 
          style={({pressed}) => [
            styles.addButton,
            pressed && styles.addButtonPressed
          ]}
          onPress={startAddGoalHandler}
          android_ripple={{color: '#7c3aed'}}
        >
          <Text style={styles.addButtonText}>+ Add New Goal</Text>
        </Pressable>
        <GoalInput 
          onAddGoal={addGoalHandler} 
          visible={modalIsVisible} 
          onCancel={endAddGoalHandler} 
        />
        <View style={styles.goalsContainer}> 
          <FlatList 
            data={courseGoals}
            renderItem={(itemData) => {
              return( 
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler} 
                />
              );
            }}
            keyExtractor={(item) => item.id}
            alwaysBounceVertical={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Your goals will appear here</Text>
                <Text style={styles.emptySubtext}>Tap "Add New Goal" to get started</Text>
              </View>
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a',
  },
  header: {
    marginBottom: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e4d0ff',
  },
  addButton: {
    backgroundColor: '#a065ec',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  goalsContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#e4d0ff',
    marginBottom: 8,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#a78bfa',
  },
});
