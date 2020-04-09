import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { Appbar } from 'react-native-paper';


function App() {
  const [atLesesalen, setLesesalState] = useState(false)
  const [timeToday, setTime] = useState(0)

  const ref = firestore().collection('users').doc('Torjus');

  async function refresh() {
    console.log("test")
    await ref.update({
      refresh: true
    });
  }

  useEffect(() => {
    const ref = firestore().collection('users');

    const doc = ref.doc('Torjus');

    doc.onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: ${docSnapshot.get('atLesesalen')}`);
      setLesesalState(docSnapshot.get('atLesesalen'))
      setTime(docSnapshot.get('time'))

    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }, []);



  const clr = atLesesalen ? 'white' : 'black'
  const txtclr = atLesesalen ? 'black' : 'white'
  const atLesesalenTxt = atLesesalen ? 'at' : 'not at';

  console.log(clr)
  return (
    <>
      <Appbar>
        <Appbar.Content title={'My app'} />
      </Appbar>
      <ScrollView style={{ flex: 1, backgroundColor: clr }}>
        <Text style={{ fontSize: 60, textAlign: 'center', color: txtclr }}>Time Today!</Text>
        <Text style={{ fontSize: 50, textAlign: 'center', color: txtclr }}>{Math.floor(timeToday / 60)}h {timeToday % 60}</Text>
        <Text style={{ fontSize: 30, textAlign: 'center', color: txtclr, paddingTop: 30 }}>You are {atLesesalenTxt} Lesesalen</Text>
        <Button onPress={() => refresh()} title="Press me">wiowind</Button>

      </ScrollView>
    </>
  );
}

export default App;