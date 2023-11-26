function attemptLogin() {
    loggedInOrNot = localStorage.getItem("loggedIn")
    if (loggedInOrNot) {
    
    }
}

function login(event) {
    event.preventDefault();

    var enteredUsername = document.getElementById("username").value;
    var enteredPassword = document.getElementById("password").value;

    fetch('../database/users.json')
        .then(response => response.json())
        .then(data => {
            // Check if there is a matching user
            var matchedUser = data.find(user => user.username === enteredUsername && user.password === enteredPassword);
            if (matchedUser) {

                showAlert('Login successful!', 'success');

                localStorage.loggedIn = true;
                localStorage.uuid = matchedUser.uuid;
                window.location.href = '/../index.html';
            } 
            else {
                showAlert('Invalid username or password.', 'error');
            }
        })
        .catch(error => console.error('Error:', error));
}

function showAlert(message, type) {
    var popup = document.getElementById('message');
    popup.innerHTML = '<br>' + message;;

    setTimeout(function () {
        popup.textContent = '';
    }, 3000);
}

function logOut() {
    localStorage.loggedIn = false;
}