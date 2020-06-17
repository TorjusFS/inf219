import { Appbar } from 'react-native-paper';
import { ActivityIndicator, Text, View, StyleSheet, Image } from 'react-native';
import React from 'react';


function Achievements() {

    return (
        <>
            <Appbar style={{ backgroundColor: "orange" }}>
                <Appbar.Content color={"white"} title={'Achievements'} />
            </Appbar>
            <View style={{ flex: 1, backgroundColor: "#2D3245", display: "flex", flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                    <View style={{ alignItems: 'center', padding: 25 }}>
                        <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require('./blackking.jpg')} />
                        <Text style={{color: 'white'}}>Achievement 1</Text>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "white"
    }
})

export default Achievements