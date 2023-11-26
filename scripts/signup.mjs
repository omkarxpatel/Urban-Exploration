import { initializeApp } from "/../node_modules/firebase/app/dist/app";

const firebaseConfig = {
    apiKey: "AIzaSyApjyyEsck64qPg3OmyV5pmwgHYB_9Rs9E",
    authDomain: "urban-exploration-ca75a.firebaseapp.com",
    projectId: "urban-exploration-ca75a",
    storageBucket: "urban-exploration-ca75a.appspot.com",
    messagingSenderId: "367666261239",
    appId: "1:367666261239:web:80c735cbb42721ad2477f2",
    measurementId: "G-XJ7TBNLDGG"
};

// const app = initializeApp(firebaseConfig);

async function signup(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    console.log(username, password, generateUUID())
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
