import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://crud-user-mftn.onrender.com/',
});

const setAuthorizationHeader = async () => {
  try {
    const token = await AsyncStorage.getItem('@authToken');
    if (token) {
      console.log("🚀 ~ file: api.js:12 ~ setAuthorizationHeader ~ token:", token)
      api.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    }
  } catch (error) {
    console.error('Erro ao configurar o cabeçalho de autorização:', error);
  }
};

setAuthorizationHeader();

export default api;
