import * as firebase from 'firebase';
import {NotOurApiKey} from './sneaky_code.js'
export const firebaseConfig = {
    apiKey: NotOurApiKey,
    authDomain: "pomodoro-720d6.firebaseapp.com",
    databaseURL: "https://pomodoro-720d6.firebaseio.com",
    projectId: "pomodoro-720d6",
    storageBucket: "pomodoro-720d6.appspot.com"
};

export const pomodoro = firebase.initializeApp(firebaseConfig);