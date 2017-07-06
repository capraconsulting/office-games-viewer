import React from 'react';
import ReactDOM from 'react-dom';
import Rebase from 're-base';
import firebase from 'firebase/app';
import database from 'firebase/database';
import './index.css';
import App from './App';

const app = firebase.initializeApp({
  apiKey: "AIzaSyCBww2YLzI5jScmJarlxKCQguo2-DDtxNI",
  authDomain: "capra-office-games.firebaseapp.com",
  databaseURL: "https://capra-office-games.firebaseio.com",
  storageBucket: "capra-office-games.appspot.com",
  // messagingSenderId: "webapp",
});
const db = database(app);
const rebase = Rebase.createClass(db);



ReactDOM.render(<App rebase={rebase} />, document.getElementById('root'));
