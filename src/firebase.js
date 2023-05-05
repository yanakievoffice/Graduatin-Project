import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyByh3Lccc0c5yXPMI1R7njP_aM2YRIF-Xg",
    authDomain: "softunichatfinal.firebaseapp.com",
    projectId: "softunichatfinal",
    storageBucket: "softunichatfinal.appspot.com",
    messagingSenderId: "984804128567",
    appId: "1:984804128567:web:90ac83d2381fea4afaccb2"
  }).auth();