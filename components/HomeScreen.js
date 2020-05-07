import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { Appbar } from 'react-native-paper';




function HomeScreen() {
  const [atLesesalen, setLesesalState] = useState(false)
  const [timeToday, setTime] = useState(0)
  const [users, setUsers] = useState(0)

  const ref = firestore().collection('users').doc('Torjus');

  async function refresh() {
    console.log("test")
    await ref.update({
      refresh: true
    });
  }

  useEffect(() => {

    let users = firestore().collection('users').get().then(snapshot => {
      let userList = []
      snapshot.forEach(user => {
        userList.push(user.data())
      })
      console.log(userList)
      setUsers(userList)
    }).catch(err => {
      console.log(err)
    })

    const arrayOfObj = Object.entries(users).map((e) => ( { [e[0]]: e[1] } ));

    const doc = firestore().collection('users').doc('Torjus');
    
    
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

  const props = {
        data: {users},
        sortBy: 'time',
        labelBy: 'username',
        onRowPress: (item, index) => {
          this.alert(item.name + " clicked", item.score + " points, wow!");
        }
  }

  console.log(clr)
  if (users != null) {
  return (
    <>
      <Appbar>
        <Appbar.Content title={'My app'} />
      </Appbar>
      <View style={{ flex: 1, backgroundColor: clr }}>
        <Text style={{ fontSize: 60, textAlign: 'center', color: txtclr }}>Time Today!</Text>
        <Text style={{ fontSize: 50, textAlign: 'center', color: txtclr }}>{Math.floor(timeToday / 60)}h {timeToday % 60}</Text>
        <Text style={{ fontSize: 30, textAlign: 'center', color: txtclr, paddingTop: 30 }}>You are {atLesesalenTxt} Lesesalen</Text>
        <Button onPress={() => refresh()} title="Press me">wiowind</Button>
      </View>
    </>
  );
  }
  else {
    return (
      <>
        <Appbar>
          <Appbar.Content title={'My app'} />
        </Appbar>
        <View style={{ flex: 1, backgroundColor: clr }}>
          <Text style={{ fontSize: 60, textAlign: 'center', color: txtclr }}>Time Today!</Text>
          <Text style={{ fontSize: 50, textAlign: 'center', color: txtclr }}>{Math.floor(timeToday / 60)}h {timeToday % 60}</Text>
          <Text style={{ fontSize: 30, textAlign: 'center', color: txtclr, paddingTop: 30 }}>You are {atLesesalenTxt} Lesesalen</Text>
          <Button onPress={() => refresh()} title="Press me">wiowind</Button>
        </View>
      </>
    );
  }
}

export default HomeScreen;