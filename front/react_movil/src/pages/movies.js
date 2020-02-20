import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Image, AsyncStorage } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import { Card } from 'react-native-elements';
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const API = "http://172.16.24.48:5000/film/pelicula";

// https://aboutreact.com/example-of-sqlite-database-in-react-native/

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            peliculas: [],
        };
    }

    componentDidMount() {
        axios.get(API)
            .then(response => {
                this.setState({ peliculas: response.data.datos })
            })
            .catch(error => {
                console.log(error)
            })
    }

    asyncstorageSave = async (idpelicula) => {
        try {
          await AsyncStorage.setItem('idpelicula', idpelicula.toString())
        } catch (err) {
          alert(err)
        }
    }

    toggleOpen = () => {
        this.setState({ open: !this.state.open });
      };
    
      drawerContent = () => {
        return (
          <View style={styles.animatedBox}>
          <TouchableOpacity onPress={this.toggleOpen} >
            <Icon style={styles.closeButton} name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <View>
              <Image
              style={{width: 100, height: 100, marginHorizontal: '15%', borderRadius: 100,}}
              source={require('../../assets/category.png')}
            />
            <Text style={{color: '#fff', marginVertical: '10%', alignItems: 'center', paddingHorizontal: '5%'}}>Cine</Text>
                <TouchableHighlight style={styles.menuButton}>
                  <Link to="/">
                      <Text style={{color: '#fff'}}>
                      <Icon style={styles.openButton} name="home" size={20} color="#fff" />Cartelera</Text>
                  </Link>
                </TouchableHighlight>
              </View>
            </View>
        );
      };

    render() {
        const { peliculas } = this.state
        return ( 
            <View style={styles.container}>
        <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        >
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={this.toggleOpen} style={styles.menu}>
              <Icon style={styles.openButton} name="navicon" size={30} color="#fff" />
            </TouchableOpacity>
              <View style={styles.header} >
                <Text style={styles.textHeader}>CINE YAVIRAC</Text>
              </View>
          </View>
          <View style={styles.body}>
            <ScrollView vertical={true}>
            <Text style={styles.text}>CARTELERA.</Text>
            <Text style={{marginHorizontal: 5, marginTop: 5, color: '#1a202c', paddingHorizontal: 15, paddingVertical: 5,  borderColor: '#fff', borderWidth: 2,}}>Selecciona la pelicula de su preferencia, para mas información has click en "VER DETALLES DE PELICULA".</Text>
            { peliculas.map( element => 
              <Card title={ element.titulo } image={require('../../assets/film_default.jpg')} key={ element.id }>
                <TouchableHighlight style={styles.button}>
                    <Link to="/movie_detail" onPress={ () => this.asyncstorageSave(element.id) }>
                        <Text style={{marginHorizontal: 20, color: '#000'}} >
                          <Icon name="film" size={20} color="#000" /> Ver Detalles de Pelicula
                        </Text>
                    </Link>
                </TouchableHighlight>
              </Card> ) 
              }
              </ScrollView> 
          </View>  
        </MenuDrawer> 
      </View>
                
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%', 
        height: '100%',
        backgroundColor: '#fff',
      },
      animatedBox: {
        flex: 1,
        backgroundColor: '#2c7a7b',
      },
      header: {
        flex: 2, 
        height: 75, 
        backgroundColor: '#2c7a7b',
      },
      body: {
        flex: 6,
      },
      text:{
        color:'#000',
        paddingLeft:'10%',
        paddingBottom: '5%',
        paddingTop: '8%',
        fontSize: 18,
      },
      textHeader:{
        color:'white',
        paddingLeft:'10%',
        paddingBottom: '5%',
        paddingTop: '15%',
        fontSize: 18,
      },
      button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
      },
      menu: {
        flex: 0.5, 
        height: 75, 
        backgroundColor: '#2c7a7b',
      },
      openButton: {
        marginTop: '50%',
        marginHorizontal: '15%',
      },  
      closeButton: {
        marginTop: '15%',
        marginBottom: '20%',
        marginLeft: '5%',
        marginRight: '60%',
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
      menuButton: {
        padding: 10,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255, .1)',
      },
})