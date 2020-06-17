import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
import React from 'react';
import { View, Text } from 'react-native';

function TimeGraph(props) {
  const data = props.data
  const contentInset = { top: 20, bottom: 20 }

  return (
    <View >
      <Text style={{ color: 'white' }}>Past 30 days</Text>
      <View style={{ height: 300, flexDirection: 'row', padding: 5 }}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}h`}
        />
        <BarChart
          style={{ flex: 1, marginLeft: 3 }}
          data={data}
          svg={{ fill: 'cyan' }}
          contentInset={contentInset}
        >
          <Grid svg={{ fill: 'grey' }} />
        </BarChart>
      </View>
    </View>
  )
}


export default TimeGraph
