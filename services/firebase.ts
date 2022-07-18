

import firebase from "firebase/app";
import 'firebase/database';



const firebaseConfig = {
    apiKey: "AIzaSyBd_9JTqMxk-zFFRYFbId1-H2eQg4axsbc",
    authDomain: "agenda-aula-next.firebaseapp.com",
    projectId: "agenda-aula-next",
    storageBucket: "agenda-aula-next.appspot.com",
    messagingSenderId: "467837003279",
    appId: "1:467837003279:web:a0e2dd89c20c9a50d5257a"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}else{
    firebase.app();
}


const database = firebase.database();



export {database, firebase};