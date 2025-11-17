import {StyleSheet, View, Text, Pressable} from 'react-native';

function GoalItem(props) {
    return (        
        <View style={styles.goalItem}> 
            <Pressable 
                android_ripple={{color: '#210644'}} 
                onPress={() => props.onDeleteItem(props.id)}
                style={({pressed}) => [
                    styles.pressableContent,
                    pressed && styles.pressedItem
                ]}
            >
                <Text style={styles.goalText}>{props.text}</Text>
            </Pressable>
        </View>
    );
}

export default GoalItem;    

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        borderRadius: 8,
        backgroundColor: '#5e0acc',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    pressableContent: {
        padding: 16,
    },
    goalText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
    },
    pressedItem: {
        opacity: 0.7,
    },
});