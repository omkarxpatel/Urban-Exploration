import {
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";


function initializeDashboard() {
    getUserData()
}

function getUserData() {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        document.getElementById("temp").textContent = userDataString;

        document.getElementById("displayName").textContent = userData.displayName;
        document.getElementById("email").textContent = userData.email;

        console.log("set the data to user data");
    }
}

// Other existing code

document.addEventListener("DOMContentLoaded", function () {
    console.log("dashboard clicked")
    document.querySelector('nav ul li:nth-child(5) a').addEventListener('click', function() {
        initializeDashboard();
        getUserData(); // Add this line to display user data when the dashboard is clicked
    });
});


function isAdmin(user) {
    return user && user.uid === process.env.ADMIN_UUID;
}


document.addEventListener("DOMContentLoaded", function () {
    console.log("dashboard clicked")
    document.querySelector('nav ul li:nth-child(5) a').addEventListener('click', initializeDashboard);
});