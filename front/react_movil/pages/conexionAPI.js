import React, { Component } from 'react';
import { Text,TextInput,View, Image,ImageBackground, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { Icon,Button, Card } from 'react-native-elements';
import HeaderExample from '../components/header';

export default class Cartelera extends Component {
  constructor(props) {
    super(props);
    this.state = {
        peliculas: [],
    }
}

  componentDidMount(){
    return fetch('http://localhost:5000/film/pelicula')
    .then(response => {
      this.setState({ peliculas: response.data.datos })
  })
  .catch(error => {
      console.log(error)
  })
  }
 

  
  
  render() {
    return (    
      <View style={styles.container}>
        <HeaderExample />

        <ActivityIndicator size="large" color="#0000ff" />
        <FlatList
              data={this.state.peliculas}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%', 
    height: '100%',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
  },
  containerEmail:{
    height: 60,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#ffffff',
    marginLeft:'10%',
    marginRight:'10%',
  },
  containerPassword:{
    height: 60,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#ffffff',
    marginLeft:'10%',
    marginRight:'10%',
  },
  icon:{
    paddingTop: '2%',
    paddingHorizontal: '3%',
  },
  text:{
    color:'#000000',
    paddingLeft:'10%',
    paddingBottom: '5%',
    paddingTop: '8%',
    fontSize: 17,
  },
})