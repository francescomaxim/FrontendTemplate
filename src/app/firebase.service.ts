// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBjwGowWcFVA1S7h_NNALPLxGbRAvNa1DU',
  authDomain: 'frontendtemplate-a87c0.firebaseapp.com',
  projectId: 'frontendtemplate-a87c0',
  storageBucket: 'frontendtemplate-a87c0.firebasestorage.app',
  messagingSenderId: '1016725415207',
  appId: '1:1016725415207:web:998420b68a8a031eef3502',
  measurementId: 'G-HZTR7B5R67',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
