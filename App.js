/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { atLesesalen } from './proximityObserver'
import React, { Fragment } from 'react';
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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOnLesesalen: false
    }
  }
  
  componentWillUpdate() {
    this.setState({
      isOnLesesalen: atLesesalen
    })
    console.log("Update " + this.state.isOnLesesalen)
  }
  

  render() {
    if (this.state.isOnLesesalen) {
      return (<View backgroundColor="blue" style={{flex: 1}}> <Text>HALLO</Text></View>)
    }
    else {
      return (<View backgroundColor="red" style={{flex: 1}}><Text>YOYOYOYO</Text></View>)
    }
  }
};

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
