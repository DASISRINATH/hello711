import  firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var  Config = {
    apiKey: "AIzaSyDEA0-c6yuZwkmkMy6ZzflWVT1MGSc5lHQ",
    authDomain: "propyaar.firebaseapp.com",
    databaseURL: "https://propyaar-default-rtdb.firebaseio.com",
    projectId: "propyaar",
    storageBucket: "propyaar.appspot.com",
    messagingSenderId: "349783240781",
    appId: "1:349783240781:web:36b7d46583c8516ae02c04",
    measurementId: "G-1YECQZYP7W"
}

firebase.initializeApp(Config);

export default firebase ;

export const database = firebase.database();

