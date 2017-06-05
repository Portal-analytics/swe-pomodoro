import * as firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyCkaAsacq8_zHAq6Nz4yVAJYgEmfumzQ10",
    authDomain: "pomodoro-720d6.firebaseapp.com",
    databaseURL: "https://pomodoro-720d6.firebaseio.com",
    projectId: "pomodoro-720d6",
    storageBucket: "pomodoro-720d6.appspot.com"
};

export const pomodoro = firebase.initializeApp(firebaseConfig);