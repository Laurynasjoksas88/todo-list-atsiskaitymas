
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD3mMLST1Cx7ZUp_cC4m8PQDYQD7CQ1cic",
    authDomain: "todo-listas.firebaseapp.com",
    projectId: "todo-listas",
    storageBucket: "todo-listas.appspot.com",
    messagingSenderId: "338032228064",
    appId: "1:338032228064:web:8636e9b8bfd1dfd68a0285"
};

const anyFirebase = firebase as any;

if (!anyFirebase.apps.length) {
  anyFirebase.initializeApp(firebaseConfig);
}

export const firestore = anyFirebase.firestore();






