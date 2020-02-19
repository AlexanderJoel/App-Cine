import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Image, AsyncStorage, TextInput } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import { Card } from 'react-native-elements';
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const API = "http://172.16.24.48:5000/film/";


export default class BuyTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: [],
      idpelicula: '',
      idsala_peliculas: '',
      numero_boletos: '',
    };
  }

  handleNumeroBoletos = text => {
    this.setState({ numero_boletos: text });
  };

  getData = () => {
    axios.get(`${ API }pelicula?id=${ this.state.idpelicula }`)
    .then(response => {
      this.setState({ pelicula: response.data.datos })
    })
    .catch(error => {
      console.log(error)
    })
  }

  saveData = () => {
    this.post = {
        datos: {
          idsala_peliculas: this.state.idsala_peliculas,
          numero_boletos: this.state.numero_boletos
        }
    }

    if (this.post.datos.idsala_peliculas === "" ||
        this.post.datos.numero_boletos === ""
        ) {
      alert("Complete todos los datos para continuar...");
    } else {
      axios.post(API+"compra", this.post)
      .then(response => {
        if ( response.data.ok === true ) {
          alert("Compra exito, por favor ingrese su correo electrónico para enviar su comprobante")
        }
      })
      .catch(error => {
        alert(error)
      })
    }
  };

  asyncstorageGet = async () => {
    try {
      const idfilm = await AsyncStorage.getItem('idpelicula')
      this.setState({idpelicula: idfilm})
      const idroom_movies = await AsyncStorage.getItem('idsala_peliculas')
      this.setState({idsala_peliculas: idroom_movies})
      this.getData()
    } catch (e) {
      alert(e)
    }
  }

  asyncstorageSave = async (item) => {
    try {
      await AsyncStorage.setItem('numero_boletos', item.toString())
    } catch (err) {
      alert(err)
    }
  }

  asyncstorageClear = async () => {
    try {
      await AsyncStorage.clear()
      this.setState({ idpelicula: '', idsala_peliculas: '' })
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
    const { pelicula } = this.state
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
                <Link to="/movie_detail" >
                  <Icon style={styles.openButton} name="arrow-circle-left" size={30} color="#fff" />
                </Link>
              </TouchableHighlight>
        </View>
        <View style={styles.body}>
          <ScrollView vertical={true}>
          <Text style={styles.text}>¿Cuantos boletos desea comprar?</Text>
          { pelicula.map( element => 
              <Card key={ element.id } title={ element.titulo } image={require('../../assets/film_default.jpg')}>
                <Text style={{marginBottom: 10}}>
                  Resumen: { element.resumen }
                </Text>
                <Text style={{marginBottom: 10}}>
                  Categoría: { element.categoria }
                </Text>
                <Text style={{marginBottom: 10}}>
                  Valor de Boleto: $ { element.valorBoleto }
                </Text>
              </Card>
              )
            }

            <Card title="Número de boletos">
              <TextInput 
                placeholder="Ingrese el número de boletos que desea"  
                underlineColorAndroid='transparent'  
                style={styles.TextInputStyle}  
                keyboardType={'numeric'}
                onChangeText={ this.handleNumeroBoletos }
              />
            <TouchableHighlight style={ styles.button } >
              <Link to="/send_tickets" onPress={ () => {this.asyncstorageSave(this.state.numero_boletos), this.saveData()} }>
                <Text>
                <Icon name="check-circle" size={20} color="#000" /> Confirmar</Text>
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
    padding: 10,
    marginVertical: 10,
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