import React from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';

function GoalBar(props) {


    function calculateProgress() {
        if (props.goal <= 0) return "100%"
        const progress = props.timeToday / props.goal
        
        return progress > 1 ? "100%" : ((progress * 100).toFixed(2) + "%")
    }

    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: "grey" }}>
            <Text style={{ fontSize: 15, color: "white", marginLeft: 5, marginBottom: 5 }}>Goal progress:</Text>
            <View style={styles.progressBar}>
                <Animated.View style={[StyleSheet.absoluteFill], { backgroundColor: "orange", borderRadius: 5, width: calculateProgress() }} />
            </View>
            <Text style={{ textAlign: "center", color: "white" }}>{props.goal <= 0 ? "100%" : (((props.timeToday / 60).toFixed(2) + " / " + (props.goal / 60).toFixed(2)))}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    progressBar: {
      height: 25,
      width: '95%',
      alignSelf: 'center',
      backgroundColor: 'white',
      borderColor: 'orange',
      borderWidth: 2,
      borderRadius: 10,
      flexDirection: 'row',
      padding: 2,
    }
  })

export default GoalBar