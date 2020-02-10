import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from "react-router-native";

import Login from "./pages/Login";
import Cartelera from "./pages/cartelera";
import Reserve from "./pages/reserve";
import Conexion from "./pages/conexionAPI";


export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path="/login" component={ Login } />
            <Route exact path="/login" component={ Cartelera } />
            <Route path="/reserva" component={ Reserve } /> 
            <Route path="/" component={ Conexion } /> 
          </Switch>
        </View>
      </NativeRouter>
    )
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
