import React, { Component } from 'react';
import { Text,TextInput,View, Image,ImageBackground, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { Icon,Button, Card } from 'react-native-elements';
import HeaderExample from '../components/header';

export default class Cartelera extends Component {
 
  
  render() {
    return (    
      <View style={styles.container}>
        <HeaderExample />
      <Text style={styles.text}>CARTELERA</Text>
        <ScrollView vertical={true} >
        <Card
          title='Name Book'
          image={require('../assets/film.png')}>
          <Text style={{marginBottom: 10}}>
            Titulo:
          </Text>
          <Text style={{marginBottom: 10}}>
            Sinopsis: 
          </Text>
          <Text style={{marginBottom: 10}}>
            Categoria :
          </Text>
          <Text style={{marginBottom: 10}}>
            Valor del voleto: $ 
          </Text>
          <Button
            icon={<Icon type="font-awesome" name="shopping-cart" color="white" containerStyle={styles.icon}/>}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,}}
            title='Comprar' />
        </Card>
        <Card
          title='Name Movie'
          image={require('../assets/category2.png')}>
          <Text style={{marginBottom: 10}}>
            Titulo:
          </Text>
          <Text style={{marginBottom: 10}}>
            Sinopsis:
          </Text>
          <Text style={{marginBottom: 10}}>
            Categoria :
          </Text>
          <Text style={{marginBottom: 10}}>
            Valor del voleto:
          </Text>
          <Button
            icon={<Icon type="font-awesome" name="shopping-cart" color="white" containerStyle={styles.icon}/>}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,}}
            title='Comprar' />
        </Card>
        </ScrollView>
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