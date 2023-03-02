import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC2L3udHyOoK6aRLWIx3ycpXXdeD3IdOyY",
    authDomain: "scoutingapp-ee2cf.firebaseapp.com",
    databaseURL: "https://scoutingapp-ee2cf-default-rtdb.firebaseio.com",
    projectId: "scoutingapp-ee2cf",
    storageBucket: "scoutingapp-ee2cf.appspot.com",
    messagingSenderId: "688484437174",
    appId: "1:688484437174:web:0aba4a099ae0b61895aa17",
    measurementId: "G-FW8NT71WTE"
  };

export default firebase.initializeApp(firebaseConfig);