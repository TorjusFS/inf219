import firestore from '@react-native-firebase/firestore';
import { ScrollView, Text, Button, View, StyleSheet } from 'react-native';
import React, { useState, useEffect, Component } from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

function Leaderboard() {
    const [users, setUsers] = useState(0)
    const [allTime, setTime] = useState(0)
    const [isLoading, setLoading] = useState(true)
    const [tableHead, setTableHead] = useState([])


    async function getUserData() {
        const userData = await firestore().collection('users').orderBy('time', 'desc').get().then(snapshot => {
            let userList = []
            snapshot.forEach(user => {
                userList.push(user.data())
            })
            console.log("USERLIST: " + userList)
            setUsers(userList)
        }).catch(err => {
            console.log(err)
        })
        return userData
    }

    useEffect(() => {
        getUserData()
        setLoading(false)
    }, []);

    function board() {
        if (users && users != 0) {
            let rank = 0
            let list = users.map(user => {
                console.log("USERRRR: " + JSON.stringify(user))
                return [rank += 1, user.username, user.time + "h", user.streak > 2 ? user.streak : ""]
            })
            console.log(list)
            return (
                <View style={styles.container}>
                    <Table borderStyle={{ border: 1 }}>
                        <TableWrapper style={styles.wrapper}>
                            <Rows data={list} style={styles.row} textStyle={styles.text} flexArr={[1, 2, 2, 1]} />
                        </TableWrapper>
                    </Table>
                </View>
            )
        }
        else {
            return (
                <View><Text>Loading...</Text></View>
            )
        }
    }


    return (
        board()
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#2D3245'
    },
    row: {
        height: '16%',
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#373d54'
    },
    text: {
        color: 'white'
    }

})

export default Leaderboard