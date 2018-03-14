import React from 'react';
import { StyleSheet, Text, View  , Button } from 'react-native';
import {  StackNavigator , navigate} from 'react-navigation';
import {Aboutpage} from './src/pages/about'

export default class App extends React.Component {
 

  render() {
    return (
      <View style={styles.container}>
         <Text style={styles.texts}> world!!- sugan</Text>         
      </View>
      
    );
  }
}

const Menu = StackNavigator({
 Home: { screen: App },
//Profile: { screen: ProfileScreen },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6b52ae', 
    alignItems: 'center',    
    justifyContent: 'center',
  },
  texts:{
    color:"#fff",
    fontSize:20,
  }
});
 