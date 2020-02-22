import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Image, AsyncStorage, TextInput } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import { Card } from 'react-native-elements';
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const API = "http://192.168.100.6:5000/film/";

export default class SendTickets extends Component {
  constructor(props) {
      super(props);
      this.state = {
        correo: '',
        sala: '',
        pelicula: '',
        horario: '',
        boletos: ''
      };
  }

  handleCorreo = text => {
    this.setState({ correo: text });
  };

  saveData = () => {
    this.post = {
        datos: {
          correo: this.state.correo,
          sala: this.state.sala,
          pelicula: this.state.pelicula,
          horario: this.state.horario,
          boletos: this.state.boletos
        }
    }

    if (this.post.datos.correo === "" ||
        this.post.datos.sala === "" ||
        this.post.datos.pelicula === "" ||
        this.post.datos.horario === "" ||
        this.post.datos.boletos === ""
        ) {
      alert("Complete todos los datos para continuar...");
    } else {
      axios.post(API+"send_mail", this.post)
      .then(response => {
        if ( response.data.ok === true ) {
          alert("Correo Enviado!")
        }
      })
      .catch(error => {
        alert(error)
      })
    }
  };

  asyncstorageGet = async () => {
    try {
      const idpelicula_titulo = await AsyncStorage.getItem('idpelicula_titulo')
      this.setState({pelicula: idpelicula_titulo})
      const idhorario_hora = await AsyncStorage.getItem('idhorario_hora')
      this.setState({horario: idhorario_hora})
      const idsala_nombre = await AsyncStorage.getItem('idsala_nombre')
      this.setState({sala: idsala_nombre})
      const numero_boletos = await AsyncStorage.getItem('numero_boletos')
      this.setState({boletos: numero_boletos})
    } catch (e) {
      alert(e)
    }
  }

  asyncstorageClear = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      alert(e)
    }
  }

  componentDidMount() {
    this.asyncstorageGet();
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
                <Link to="/buy_tickets" >
                  <Icon style={styles.openButton} name="arrow-circle-left" size={30} color="#fff" />
                </Link>
              </TouchableHighlight>
        </View>
        <View style={styles.body}>
          <ScrollView vertical={true}>
          <Text style={styles.text}>Enviar Boletos</Text>
          <Card title="Dirección de Correo Electrónico">
            <TextInput 
              placeholder="user@gmail.com"  
              underlineColorAndroid='transparent'  
              style={styles.TextInputStyle}  
              keyboardType={'default'}
              onChangeText={ this.handleCorreo }
            />
            <TouchableHighlight>
              <Link to="/" style={ styles.button } onPress={ () => this.saveData() }>
                <Text>Enviar Comprobante</Text>
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