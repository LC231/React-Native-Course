import { View, TextInput, StyleSheet, Modal, Image, Pressable, Text, Keyboard} from 'react-native';
import { useState, useEffect, useRef } from 'react';

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');
    const textInputRef = useRef(null);
    
    useEffect(() => {
        if (props.visible) {
            // Auto-focus input when modal opens
            setTimeout(() => {
                textInputRef.current?.focus();
            }, 100);
        } else {
            // Clear input when modal closes
            setEnteredGoalText('');
        }
    }, [props.visible]);
    
    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText);
    }

    function addGoalHandler() {
        if (enteredGoalText.trim().length === 0) {
            return; // Don't add empty goals
        }
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
        Keyboard.dismiss();
    }

    function cancelHandler() {
        setEnteredGoalText('');
        Keyboard.dismiss();
        props.onCancel();
    }

    return (
      <Modal visible={props.visible} animationType='slide'>
          <View style={styles.inputContainer}>
            <Image source={require('../RNCourse/assets/images/goal.png')} style={styles.image} />
            <Text style={styles.modalTitle}>What's your goal?</Text>
            <TextInput 
              ref={textInputRef}
              placeholder='Enter your course goal...' 
              placeholderTextColor='#9ca3af'
              style={styles.textInput} 
              onChangeText={goalInputHandler} 
              value={enteredGoalText}
              multiline={false}
              returnKeyType='done'
              onSubmitEditing={addGoalHandler}
            />
            <View style={styles.buttonContainer}>
              <Pressable 
                style={({pressed}) => [
                  styles.button,
                  styles.cancelButton,
                  pressed && styles.buttonPressed
                ]}
                onPress={cancelHandler}
                android_ripple={{color: '#f31282'}}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable 
                style={({pressed}) => [
                  styles.button,
                  styles.addButton,
                  pressed && styles.buttonPressed,
                  enteredGoalText.trim().length === 0 && styles.buttonDisabled
                ]}
                onPress={addGoalHandler}
                android_ripple={{color: '#b180f0'}}
                disabled={enteredGoalText.trim().length === 0}
              >
                <Text style={[
                  styles.addButtonText,
                  enteredGoalText.trim().length === 0 && styles.buttonTextDisabled
                ]}>
                  Add Goal
                </Text>
              </Pressable>
            </View>
          </View>
      </Modal>
    );
}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b',
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 24,
        marginTop: 16,
      },
      textInput: {
        borderWidth: 2,
        borderColor: '#e4d0ff',
        borderRadius: 8,
        backgroundColor: '#e4d0ff',
        color: '#120438',
        width: '100%',
        padding: 16,
        fontSize: 16,
        minHeight: 50,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        width: '100%',
      },
      button: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
      addButton: {
        backgroundColor: '#b180f0',
      },
      cancelButton: {
        backgroundColor: '#f31282',
      },
      buttonPressed: {
        opacity: 0.8,
      },
      buttonDisabled: {
        opacity: 0.5,
      },
      addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
      },
      cancelButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
      },
      buttonTextDisabled: {
        opacity: 0.6,
      },
      image: {
        width: 100,
        height: 100,
        marginBottom: 8,
      },
    });