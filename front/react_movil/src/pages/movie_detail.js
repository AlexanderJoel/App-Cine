import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Image, AsyncStorage } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import { Card } from 'react-native-elements';
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';

const API = "http://172.16.24.48:5000/film/";

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: '',
      pelicula: [],
      sala_peliculas: [],
      idpelicula: '',
    };
  }

  getData = () => {
    axios.get(`${ API }pelicula?id=${ this.state.idpelicula }`)
    .then(response => {
      this.setState({ pelicula: response.data.datos })
    })
    .catch(error => {
      console.log(error)
    })
  
    axios.get(`${ API }raw2?idpelicula=${ this.state.idpelicula }`)
    .then(response => {
      this.setState({ sala_peliculas: response.data.datos })
    })
    .catch(error => {
      console.log(error)
    })
  }

  asyncstorageSave_idsala_peliculas = async (id) => {
    try {
      await AsyncStorage.setItem('idsala_peliculas', id.toString())
    } catch (err) {
      alert(err)
    }
  }

  asyncstorageSave_idpelicula_titulo = async (item) => {
    try {
      await AsyncStorage.setItem('idpelicula_titulo', item.toString())
    } catch (err) {
      alert(err)
    }
  }

  asyncstorageSave_idhorario_hora = async (item) => {
    try {
      await AsyncStorage.setItem('idhorario_hora', item.toString())
    } catch (err) {
      alert(err)
    }
  }

  asyncstorageSave_idsala_nombre = async (item) => {
    try {
      await AsyncStorage.setItem('idsala_nombre', item.toString())
    } catch (err) {
      alert(err)
    }
  }

  asyncstorageGet = async () => {
    try {
      const idfilm = await AsyncStorage.getItem('idpelicula')
      this.setState({idpelicula: idfilm})
      this.getData()
    } catch (e) {
      alert(e)
    }
  }

  asyncstorageClear = async () => {
    try {
      await AsyncStorage.clear()
      this.setState({ idpelicula: '' })
    } catch (e) {
      alert(e)
    }
  }

  componentDidMount() {
    this.asyncstorageGet()
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
    const { pelicula, sala_peliculas, checked } = this.state
    return(
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
            <TouchableHighlight style={styles.menu}>
                  <Link to="/" >
                    <Icon style={styles.openButton} name="arrow-circle-left" size={30} color="#fff" />
                  </Link>
            </TouchableHighlight>
        </View>
        <View style={styles.body}>
          <ScrollView vertical={true}>
          <Text style={styles.text}>Detalles de su Pelicula</Text>
          { pelicula.map( element => 
              <Card key={ element.id } title={ element.titulo } image={require('../../assets/film_default.jpg')}>
                <Text style={{marginBottom: 10}}>
                  Resumen: { element.resumen }
                </Text>
                <Text style={{marginBottom: 10}}>
                  Categoría: { element.categoria }
                </Text>
                <Text style={{marginBottom: 10}}>
                  Valor de Boleto: { element.valorBoleto }
                </Text>
              </Card>
              )
            }
            <Text style={{marginHorizontal: 5, marginTop: 5, color: '#1a202c', paddingHorizontal: 15, paddingVertical: 5,  borderColor: '#fff', borderWidth: 2,}}>¿En que horario desea ver su pelicula?</Text>   
            <Card title="Horarios Disponibles" >
              { sala_peliculas.map( element => 
                <View key={ element.id }>
                  <Text>Horario: { element.idhorario_hora }</Text>
                  <Text>Sala: { element.idsala_nombre }</Text>
                  <RadioButton value={ element.id }
                    status={checked === element.id ? 'checked' : 'unchecked'}
                    onPress={() => { 
                      this.setState({ checked: element.id }), 
                      this.asyncstorageSave_idsala_peliculas(element.id), 
                      this.asyncstorageSave_idpelicula_titulo(element.idpelicula_titulo),
                      this.asyncstorageSave_idhorario_hora(element.idhorario_hora),
                      this.asyncstorageSave_idsala_nombre(element.idsala_nombre)
                    }}
                  />
                </View>
                )
              }
            <TouchableHighlight style={styles.button}>
              <Link to="/buy_tickets">
                <Text>
                <Icon name="shopping-cart" size={20} color="#000" /> Comprar</Text>
              </Link>
            </TouchableHighlight>
            </Card>
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