import React, { useEffect, useState } from 'react';
import { View, Button, ActivityIndicator, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';

export default function LocationPicker() {
  // Criando um estado chamado 'localizacao' para armazenar os valores de latitude e longitude.
  // Inicialmente, ambos são definidos como 0.
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


  // Criando um estado 'isLoading' para controlar a exibição do indicador de carregamento.
  const [isLoading, setIsLoading] = useState(false);

  // Este useEffect não está descomentado. Se descomentado, carregará o mapa automaticamente ao iniciar o aplicativo.

  // Função para obter a localização atual do dispositivo.
  const handleGetLocation = async () => {
    try {
      setIsLoading(true);

      // Solicita permissão para acessar a localização do dispositivo.
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        alert('A permissão de localização é necessária para usar esta funcionalidade.');
        return;
      }

      // Obtém a posição atual do dispositivo com alta precisão.
      const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      // Atualiza o estado 'localizacao' com os novos valores de latitude e longitude.
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
      setIsLoading(false); // Finaliza a exibição do indicador de carregamento.
    }
  };

  // Se o estado 'isLoading' for verdadeiro, exibe um indicador de carregamento.
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Botão para iniciar a obtenção da localização */}
      <Button title="Obter Localização" onPress={handleGetLocation} />

      {/* Exibe a latitude e longitude atual */}
      <Text>Latitude: {localizacao.latitude}</Text>
      <Text>Longitude: {localizacao.longitude}</Text>

      {/* Renderiza o mapa somente se a latitude e longitude forem diferentes de 0 */}
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
          {/* Adiciona um marcador no mapa com a localização atual */}
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