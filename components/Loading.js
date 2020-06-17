import { Appbar } from 'react-native-paper';
import { ActivityIndicator, Text, View } from 'react-native';
import React from 'react';


function Loading() {

    return (
        <>
          <Appbar style={{ backgroundColor: "orange" }}>
            <Appbar.Content color={"white"} title={'Lesesalen the App'} />
          </Appbar>
          <View style={{ flex: 1, backgroundColor: "#2D3245", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" color="orange" />
          </View>
        </>
      );
}

export default Loading