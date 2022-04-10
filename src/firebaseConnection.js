import firebase from "firebase/app";
import "firebase/database";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyByxKmr-Bi5AtirwdAFJEXst_8w6SgCFsU",
  authDomain: "meuapp-7e8e3.firebaseapp.com",
  databaseURL: "https://meuapp-7e8e3-default-rtdb.firebaseio.com",
  projectId: "meuapp-7e8e3",
  storageBucket: "meuapp-7e8e3.appspot.com",
  messagingSenderId: "646905605683",
  appId: "1:646905605683:web:18c1e58797b207773b7d46",
  measurementId: "G-B2NC2MF5K1"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export default firebase
