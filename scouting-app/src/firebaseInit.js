import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyC2L3udHyOoK6aRLWIx3ycpXXdeD3IdOyY",
    authDomain: "scoutingapp-ee2cf.firebaseapp.com",
    databaseURL: "https://scoutingapp-ee2cf-default-rtdb.firebaseio.com/",
    projectId: "scoutingapp-ee2cf",
    storageBucket: "scoutingapp-ee2cf.appspot.com",
    messagingSenderId: "688484437174",
    appId: "1:688484437174:web:bf6a51d804c716c995aa17",
    measurementId: "G-BF8DBLCVN1"
};

export default firebase.initializeApp(firebaseConfig);