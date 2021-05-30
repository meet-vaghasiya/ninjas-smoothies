import firebase from "firebase";
import firestore from "firebase/fireStore";

const firebaseConfig = {
  apiKey: "AIzaSyDguaylAzZ2xUA3bz0GxuEsx4idcBeivmo",
  authDomain: "ninja-smoothies-5d78e.firebaseapp.com",
  projectId: "ninja-smoothies-5d78e",
  storageBucket: "ninja-smoothies-5d78e.appspot.com",
  messagingSenderId: "141380199425",
  appId: "1:141380199425:web:b9c2d356e68169c53b4c00"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

// export firebase database
export default firebaseApp.firestore();
