import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import pueblosMagicos from './components/Pueblitos';

const App = () => {
  // Coordenadas de UT Cancún 21.092009, -86.842053
  const initialRegion = {
    latitude: 21.092119,
    longitude: -86.842068,
    latitudeDelta: 0.01, // valor para el zoom
    longitudeDelta: 0.01,
  };

  const [region, setRegion] = useState(initialRegion);

  const handlePressPueblo = (coordenadas) => {
    setRegion({
      latitude: coordenadas[1],
      longitude: coordenadas[0],
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{ latitude: 21.092009, longitude: -86.842053 }}
          title="UT Cancún"
          description="Universidad Tecnológica de Cancún"
        />
        {pueblosMagicos.map((pueblo) => (
          <Marker
            key={pueblo.id}
            coordinate={{ latitude: pueblo.coordenadas[1], longitude: pueblo.coordenadas[0] }}
            title={pueblo.nombre}
            description={pueblo.descripcion}
          />
        ))}
      </MapView>

      <ScrollView horizontal style={styles.lista}>
        {pueblosMagicos.map((pueblo) => (
          <TouchableOpacity
            key={pueblo.id}
            style={styles.tarjeta}
            onPress={() => handlePressPueblo(pueblo.coordenadas)}
          >
            <Image source={pueblo.imagen} style={styles.imagen} />
            <Text style={styles.titulo}>{pueblo.nombre}</Text>
            <Text style={styles.descripcion}>{pueblo.descripcion}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  lista: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
  },
  tarjeta: {
    width: 200,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  imagen: {
    width: '100%',
    height: 150,
    borderRadius: 3,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  descripcion: {
    fontSize: 14,
    color: '#383838',
  },
});

export default App;