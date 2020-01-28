/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
/*
import { atLesesalen } from './proximityObserver'
import React, { Fragment, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';






const App = (props) => {
 
 
console.log("test")
 
  // @flow
"use strict";
 
const [onLesesalen, setOnLesesalen] = useState(false);
const [localValue, localValueSet] = useState(false);

 
 
 
  const bgColor = onLesesalen ? 'blue' : 'red';
  const txt = onLesesalen ? 'PÅ' : 'UTE;'
 
  return <View backgroundColor={bgColor} style={{flex: 1}}><Text>{txt}</Text></View>
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

*/

import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { Appbar, TextInput, Button } from 'react-native-paper';

function App() {
  const [ todo, setTodo ] = useState('');
  const ref = firestore().collection('users');
  const [atLesesalen, setLesesalState] = useState(false)
  
  let doc = ref.doc('Torjus');

  let observer = doc.onSnapshot(docSnapshot => {
    console.log(`Received doc snapshot: ${docSnapshot.get('atLesesalen')}`);
    setLesesalState(docSnapshot.get('atLesesalen'))
  }, err => {
    console.log(`Encountered error: ${err}`);
  });
  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }

  const clr = atLesesalen ? 'blue' : 'red'
  console.log(clr)
  return (
    <>
      <Appbar>
        <Appbar.Content title={'TODOs List'} />
      </Appbar>
      <ScrollView style={{ flex: 1, backgroundColor: clr }}>
        <Text>List of TODOs!</Text>
      </ScrollView>
      <TextInput label={'New Todo'} value={todo} onChangeText={setTodo} />
      <Button onPress={() => addTodo()}>Add TODO</Button>
    </>
  );
}

export default App;