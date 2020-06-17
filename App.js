import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./components/HomeScreen"
import Leaderboard from "./components/Leaderboard"
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, StatusBar } from 'react-native';
import Achievements from './components/Achievements'



const Tab = createBottomTabNavigator();

function App() {

  return (
    <>
      <StatusBar backgroundColor="#ed971f" />

      <NavigationContainer>

        <Tab.Navigator tabBarOptions={{ activeBackgroundColor: "orange" }} initialRouteName="Home">
          <Tab.Screen style={styles.container} name="Home" component={HomeScreen}  />
          <Tab.Screen name="Leaderboard" component={Leaderboard} />
          <Tab.Screen name="Achievements" component={Achievements} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange"
  }
})


export default App;