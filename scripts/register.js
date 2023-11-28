import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    isSignInWithEmailLink, 
    signInWithEmailLink,
    sendSignInLinkToEmail,
    updateProfile,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

import { 
        doc, 
        setDoc, 
        getDoc, 
        collection, 
        getFirestore 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";

export const firebaseConfig = {
    apiKey: "AIzaSyApjyyEsck64qPg3OmyV5pmwgHYB_9Rs9E",
    authDomain: "urban-exploration-ca75a.firebaseapp.com",
    projectId: "urban-exploration-ca75a",
    storageBucket: "urban-exploration-ca75a.appspot.com",
    messagingSenderId: "367666261239",
    appId: "1:367666261239:web:80c735cbb42721ad2477f2",
    measurementId: "G-XJ7TBNLDGG",
    experimentalForceLongPolling: true
};

const actionCodeSettings = {
    url: 'https://snazzy-horse-e17448.netlify.app',
    handleCodeInApp: true,
    iOS: {
        bundleId: 'com.example.ios'
    },
    android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
};

const app = initializeApp(firebaseConfig)
const auth = getAuth();
const db = getFirestore(app);

export async function signup(event) {
    event.preventDefault();

    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const username = document.getElementById('signupUsername').value;
    document.getElementById('signupEmail').textContent = ""
    document.getElementById('signupUsername').textContent = ""
    document.getElementById('signupPassword').textContent = ""


    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const uuid = user.uid;

        await updateProfile(auth.currentUser, { displayName: username }).catch(
                (err) => console.log(err)
            );
        saveToLocalStorage("uuid", uuid);
        document.getElementById("homePageTitle").textContent += (", " + user.displayName);
        await sendEmailVerification(email)
        

    } catch (error) {
        handleAuthError(error, "signup", email, password);
    }
}

async function sendEmailVerification(email) {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            console.log("Verification email sent");
            window.localStorage.setItem('emailForSignIn', email);
        })
        .catch((error) => {
            console.error("Error sending verification email:", error.code, error.message);
        });


    if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            email = window.prompt('Please provide your email for confirmation');
        }
        signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
                window.localStorage.removeItem('emailForSignIn');
                console.log(result.user)
            })
            .catch((error) => {
                console.log(error.code, error.message)
            });
    }
}

export async function login(event) {
    event.preventDefault();

    const uuid = localStorage.getItem('uuid');

    if (uuid) {
        try {
            await signInWithEmailAndPassword(auth, "", "", uuid);
            return;
        } catch (error) {
            console.error("Error during login with UUID:", error.message);
        }
    }

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    document.getElementById('loginEmail').textContent = ""
    document.getElementById('loginEmail').textContent = ""


    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log(user.uid, "is now logged in with credentials");
        saveToLocalStorage("uuid", user.uid);
    } catch (error) {
        handleAuthError(error, "login", email, password);
    }
}

export function logout() {
    try {
        signOut(auth);
        clearLocalStorage("uuid");
        console.log("User is signed out");
        document.getElementById("homePageTitle").textContent = "Welcome to Urban Explorer";
        registerButton.innerHTML = '<a href="#" onclick="return showPage(\'Registration\');">Registration</a>';

        document.getElementById('signupEmail').textContent = ""
        document.getElementById('signupUsername').textContent = ""
        document.getElementById('signupPassword').textContent = ""
        showPage('Registration');


    } catch (error) {
        console.error("Error during logout:", error.message);
    }
}

function handleAuthError(error, operation, email, password) {
    switch (error.code) {
        case "auth/invalid-email":
            var code = "Invalid email address";
            console.error(code);
            showError("signup", code);
            break;

        case "auth/weak-password":
            var code = "Password must be at least 6 characters"
            console.error(code);
            showError("signup", code);
            break;

        case "auth/email-already-in-use":
            var code = "Email is already in use";
            console.error(code);
            showError("signup", code);
            break;

        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-login-credentials":
            var code = "Invalid email or password";
            console.error(code);
            showError("login", code);
            break;

        default:
            var error = `Error during ${operation}: ${error.message}`
            console.error(error);
            showError("signup", error);
            break;
    }
}

async function showError(type, error) {
    if (type == "signup") {
        var button = document.getElementById("signupButton");
        var originalContent = button.textContent;
    } else {
        var button = document.getElementById("loginButton");
        var originalContent = button.textContent;
    }

    if (button.classList.contains("error-button")) {
        return;
    }

    button.classList.add("error-button");
    button.textContent = error;
    button.disabled = true;

    await sleep(3);

    button.classList.remove("error-button");
    button.disabled = false;
    button.textContent = originalContent;
}


function sleep(s = 0) {
    return new Promise(resolve => setTimeout(resolve, s*1000));
}


function saveToLocalStorage(name, value) {
    localStorage.setItem(name, value);
}

function clearLocalStorage(name) {
    localStorage.removeItem(name);
}

onAuthStateChanged(auth, (user) => {
    var pageTitle = document.getElementById("homePageTitle");
    if (user) {
        console.log("User is signed in:", user.uid, user.displayName, user);
        if (user.displayName) {
            pageTitle.textContent += (", " + user.displayName);
        }
        saveToLocalStorage("user", JSON.stringify(user));

        registerButton.innerHTML = '<a href="#" id="logoutButtonUl">Logout</a>'
        document.getElementById('logoutButtonUl').addEventListener('click', logout);
        showPage('Home')

    } else {
        console.log("User is signed out");
        pageTitle.textContent = "Welcome to Urban Explorer";
        registerButton.innerHTML = '<a href="#" onclick="return showPage(\'Registration\');">Registration</a>';
    }
});

// async function getUserDataByUUID(uuid) {
//     try {
//         const userDocRef = doc(collection(db, 'users'), uuid);
//         const userDocSnapshot = await getDoc(userDocRef);

//         if (userDocSnapshot.exists()) {
//             const userData = userDocSnapshot.data();
//             console.log('User Data:', userData.username);
            
//             return userData;
//         } else {
//             console.log('User not found.');
//             return null;
//         }

//     } catch (error) {
//         console.error('Error getting user data:', error);
//         return null;
//     }
// }


// ...

// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         try {
//             const userDocRef = doc(collection(db, 'users'), user.uid);
//             const userDoc = await getDoc(userDocRef);

//             if (userDoc.exists()) {
//                 const userData = userDoc.data();
//                 console.log("User is signed in:", user.uid, userData.username);
//             } else {
//                 console.warn("User data not found in Firestore for UID:", user.uid);
//             }
//         } catch (error) {
//             console.error("Error fetching user data from Firestore:", error.message);
//         }
//     } else {
//         console.log("User is signed out");
//     }
// });

// ...


document.getElementById('signupForm').addEventListener('submit', signup);
document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('logout').addEventListener('click', logout);