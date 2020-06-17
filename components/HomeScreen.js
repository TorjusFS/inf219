import React, { useState, useEffect } from 'react';
import { TextInput, ScrollView, Text, Button, View, StyleSheet, Animated, Dimensions, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Appbar } from 'react-native-paper';

import GoalBar from './GoalBar'
import TimeGraph from './TimeGraph'
import Loading from './Loading'

function HomeScreen() {
  const [atLesesalen, setLesesalState] = useState(false)
  const [timeToday, setTime] = useState(0)
  const [users, setUsers] = useState(0)
  const [goal, setGoal] = useState(0)
  const [tempGoal, setTempGoal] = useState(0)
  const [graphdata, setgraphdata] = useState([])

  const ref = firestore().collection('users').doc('Torjus');

  async function refresh() {
    setGoal(tempGoal)
    await ref.update({
      refresh: true,
      goal: tempGoal
    });
  }



  useEffect(() => {

    firestore().collection('users').get().then(snapshot => {
      let userList = []
      snapshot.forEach(user => {
        userList.push(user.data())
      })
      setUsers(userList)
      console.log(userList[5])
      setgraphdata(userList[5].past30days)

    }).catch(err => {
      console.log(err)
    })


    const unsub = ref.onSnapshot(docSnapshot => {
      setLesesalState(docSnapshot.get('atLesesalen'))
      setTime(docSnapshot.get('time'))
      setGoal(docSnapshot.get('goal'))

    }, err => {
      console.log(`Encountered error: ${err}`);
    });

    return () => {
      unsub();
    }
  }, []);

  const atLesesalenTxt = atLesesalen ? 'at' : 'not at';

  if (users != null && (goal || goal == 0)) {
    console.log("Line 57 " + Array.isArray(graphdata))
    return (
      <>
        <Appbar style={{ backgroundColor: "orange" }}>
          <Appbar.Content color={"white"} title={'Lesesalen the App'} />
          <Button title="Set Goal" color="inherit"></Button>
        </Appbar>

        <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#2D3245" }}>
          <Text style={{ fontSize: 20, color: "white" }}>You are {atLesesalenTxt} Lesesalen</Text>
          <Text style={{ fontSize: 20, color: "white" }}>Your Time: {Math.floor(timeToday / 60)}h {timeToday % 60}min</Text>
          <GoalBar goal={goal} timeToday={timeToday}></GoalBar>
          <TimeGraph data={graphdata} />
        </View>
      </>
    );
  }
  else {
    return (
      <Loading />
    );
  }
}


const styles = StyleSheet.create({
  progressBar: {
    color: 'orange'
  }
})

export default HomeScreen;