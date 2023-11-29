import { ADMIN_UID, MODERATOR_UID } from "./helper/env.js";
import { getAuth, updateProfile } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";


const auth = getAuth();


function initializeDashboard() {
    getUserData()
}

function getUserData() {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
        const userData = JSON.parse(userDataString);

        document.getElementById("displayName").textContent = userData.displayName;

        var userType = document.getElementById("userType");
        if (isAdmin(userData)) {
            userType.textContent += "Admin";
        } else if (isModerator(userdata)) {
            userType.textContent += "Moderator";
        } else {
            userType.textContent += "Basic User";
        }

        document.getElementById("email").textContent += userData.email;
        document.getElementById("emailVerified").textContent += userData.emailVerified;
        document.getElementById("joinDate").textContent += userData.createdAt;
        document.getElementById("lastSeen").textContent += userData.lastLoginAt;

    }
}


export function handleProfilePictureChange() {
    const profilePictureInput = document.getElementById("profilePictureInput");
    const file = profilePictureInput.files[0];

    if (file) {
        uploadProfilePictureToStorage(file)
    }
}

function uploadProfilePictureToStorage(file) {
    const reader = new FileReader();

    reader.onload = (event) => {
        const dataURL = event.target.result;
        console.log(dataURL);

        const fileType = file.type.split('/')[0];
        if (fileType === 'image') {
            updatePhotoURLInFirestore(dataURL);
        } else {
            console.error('Invalid file type. Please choose an image.');
        }
    };

    reader.readAsDataURL(file);
}

async function updatePhotoURLInFirestore(value) {
    await updateProfile(auth.currentUser, { photoURL: value }).catch(
        (err) => console.log(err)
    );
}



document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('nav ul li:nth-child(5) a').addEventListener('click', function() {
        initializeDashboard();
    });
});


function isAdmin(user) {
    return user && user.uid === ADMIN_UID;
}

function isModerator(user) {
    return user && user.uid === MODERATOR_UID;
}

document.getElementById('profilePictureInput').addEventListener('change', handleProfilePictureChange);