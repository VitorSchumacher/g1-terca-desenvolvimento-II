import React, { useEffect, useState } from 'react';
import { View, Button, ActivityIndicator, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';

export default function LocationPicker() {
  const [localizacao, setLocalizacao] = useState({
    latitude: -29.698638657622553,
    longitude: -53.51801818953788,
  });

  const [mapRegion, setMapRegion] = useState({
    latitude: -29.698638657622553,
    longitude: -53.51801818953788,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
});


  const [isLoading, setIsLoading] = useState(false);
  const handleGetLocation = async () => {
    try {
      setIsLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        alert('A permissão de localização é necessária para usar esta funcionalidade.');
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      setLocalizacao({
        latitude,
        longitude
      });

      setMapRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    } catch (error) {
      console.error('Erro ao obter a localização:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Button title="Obter Localização" onPress={handleGetLocation} />

      <Text>Latitude: {localizacao.latitude}</Text>
      <Text>Longitude: {localizacao.longitude}</Text>

      {localizacao.latitude !== 0 && localizacao.longitude !== 0 && (
        <MapView
          style={{ width: '90%', height: 300, marginTop: 12 }}
          initialRegion={{
            latitude: localizacao.latitude,
            longitude: localizacao.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={mapRegion}
        >
          <Marker
            coordinate={{
              latitude: localizacao.latitude,
              longitude: localizacao.longitude,
            }}
            title="Minha Localização"
            description="Estou aqui!"
          />
        </MapView>
      )}
    </View>
  );
}