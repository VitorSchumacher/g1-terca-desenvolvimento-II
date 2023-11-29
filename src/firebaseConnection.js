import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBkwN2NRVEt0RsdEhy8-5PUQ6doaT43Pig",
  authDomain: "vitor-o-foda.firebaseapp.com",
  databaseURL: "https://vitor-o-foda-default-rtdb.firebaseio.com",
  projectId: "vitor-o-foda",
  storageBucket: "vitor-o-foda.appspot.com",
  messagingSenderId: "301455766553",
  appId: "1:301455766553:web:821ad9f91b5610d1486688",
  measurementId: "G-99FG2WWXKE",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db, app };
