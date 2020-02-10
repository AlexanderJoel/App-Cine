import React, { Component } from 'react';
import { Text,TextInput,View, Image,ImageBackground, StyleSheet, Platform } from 'react-native';
import { Icon,Button, Card } from 'react-native-elements'

export default class Reserve extends Component {

  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenido a la Reservacion.</Text>
              <Card
                title='Name Book'
                image={require('../assets/hamburger-895831_1280.jpg')}>
                    {/* <Text style={styles.text}>Correo Intitucional</Text>
                    <TextInput  
                        placeholder="Enter Your Mobile Number"  
                        underlineColorAndroid='transparent'  
                        style={styles.TextInputStyle}
                        keyboardType={'numeric'}
                    />  
                        <View style={styles.containerEmail}>
                            <TextInput type='number' placeholder="@yavirac.edu.ec" placeholderTextColor="gray"
                        style={styles.textInput}/> 
                        </View>
                    <Text style={styles.text}>Contraseña</Text>
                    <View style={styles.containerPassword}>
                        <Icon type="entypo" name="key" color="gray" containerStyle={styles.icon}/>
                        <TextInput placeholder="*******" placeholderTextColor="gray"
                        style={styles.textInput} secureTextEntry={true}/> 
                    </View>
                    <View style={styles.containerIngresar}>
                    <Button title='Comprar' backgroundColor='#718096' />
                    </View> */}
              </Card>
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
  containerIngresar:{
    height: 60,
    marginLeft:'25%',
    marginRight:'25%',
    paddingTop:'10%',
  },
  containerEmail:{
    height: 60,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#ffffff',
    marginLeft:'10%',
    marginRight:'10%',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
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
    flex:1,
    paddingTop: '5%',
  },
  text:{
    color:'#000000',
    paddingLeft:'5%',
    paddingBottom: '5%',
    paddingTop: '5%',
  },
  textInput:{
    backgroundColor:'transparent',
    flex:5,
    color:'black',
    paddingLeft:'15%',
  },  
  TextInputStyle: {  
      textAlign: 'center',  
      height: 40,  
      borderRadius: 10,  
      borderWidth: 2,  
      borderColor: '#009688',  
      marginBottom: 10  
  }
})