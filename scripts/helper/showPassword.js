document.getElementById('showSignupPassword').addEventListener('click', function() {
    showPassword('signup');
});

document.getElementById('showLoginPassword').addEventListener('click', function() {
    showPassword('login');
});

function showPassword(type) {
    var pass;
    if (type === "signup") {
        pass = document.getElementById("signupPassword");
        alterEye("showSignupPassword");

    } else {
        pass = document.getElementById("loginPassword");
        alterEye("showLoginPassword");
    }

    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

function alterEye(type) {
    classItem = document.getElementById(type)

    if (classItem.className == "bi bi-eye-slash") {
        classItem.classList.remove("bi-eye-slash");
        classItem.classList.add("bi-eye");
    }
    else {
        classItem.classList.remove("bi-eye");
        classItem.classList.add("bi-eye-slash");
    }
}