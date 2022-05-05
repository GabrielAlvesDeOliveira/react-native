import firebase from "firebase/app";
import "firebase/database";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyByxKmr-AIzaSyDobCGnwHHQTW8YL6KPptBRjJW70MZnviQ",
  authDomain: "meuapp-92068.firebaseapp.com",
  databaseURL: "https://meuapp-92068-default-rtdb.firebaseio.com",
  projectId: "meuapp-92068",
  storageBucket: "meuapp-92068.appspot.com",
  messagingSenderId: "960035228558",
  appId: "1:960035228558:web:e63ed1a63364fbe5cb32df"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export default firebase
