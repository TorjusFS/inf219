import firestore from '@react-native-firebase/firestore';
import { ScrollView, Text, Button, View, StyleSheet } from 'react-native';
import React, { useState, useEffect, Component } from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Appbar } from 'react-native-paper';
import Loading from './Loading';


function Leaderboard() {
    const [users, setUsers] = useState(0)
    const [setLoading] = useState(true)


    async function getUserData() {
        const userData = await firestore().collection('users').orderBy('time', 'desc').get().then(snapshot => {
            let userList = []
            snapshot.forEach(user => {
                userList.push(user.data())
            })
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
                return [rank += 1, user.username, (user.time/60).toFixed(0) + "h", user.streak > 2 ? user.streak : ""]
            })
            console.log(list)
            return (
                <>
                    <Appbar style={{ backgroundColor: "orange" }}>
                        <Appbar.Content color={"white"} title={'Leaderboard'} />
                    </Appbar>
                    <View style={styles.container}>
                        <Table>
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={list} style={styles.row} textStyle={styles.text} flexArr={[1, 2, 2, 1]} />
                            </TableWrapper>
                        </Table>
                    </View>
                </>
            )
        }
        else {
            return (
                <Loading />
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