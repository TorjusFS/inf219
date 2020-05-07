import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./components/HomeScreen"
import Leaderboard from "./components/Leaderboard"
import { NavigationContainer } from '@react-navigation/native'

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={Leaderboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default App;