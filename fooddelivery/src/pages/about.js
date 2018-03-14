import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {  StackNavigator,} from 'react-navigation';

export default class Aboutpage extends React.Component {
 

  render() {
    return (
      <View style={styles.container}>
         <Text>About page is Here</Text> 
      </View>
      
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
