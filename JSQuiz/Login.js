const registerBtnAnchor = document.getElementById('register-btn-anchor')
const loginBtnAnchor = document.getElementById('login-btn-anchor')
const registerForm = document.getElementById('register')
const login = document.getElementById('login')

registerBtnAnchor.addEventListener("click", () => {
    register.classList.add('hide');
    registerBtnAnchor.classList.add('hide');
    loginBtnAnchor.classList.remove('hide');
    login.classList.remove('hide');
})

loginBtnAnchor.addEventListener("click", () => {
    register.classList.remove('hide');
    registerBtnAnchor.classList.remove('hide');
    loginBtnAnchor.classList.add('hide');
    login.classList.add('hide');
})

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    registerFunction(e.target);
});

function registerFunction(form) {
    resetFormWarnings()
    const arrayOfValues = Object.values(Object.fromEntries(new FormData(form)));

    const valLogin = arrayOfValues[0];
    const valPassword = arrayOfValues[1];
    const valRePassword = arrayOfValues[2];

    if (valLogin.length < 8) {
        document.getElementById("loginWarningToShort").classList.remove("hide")
        registerForm.reset();
        return null;
    }
    if (valPassword.length >= 8) {
        if (valPassword !== valRePassword) {
            document.getElementById("passwordWarningNoMatch").classList.remove("hide")
            registerForm.reset();
            return null;
        }
        writeData(valLogin, valPassword)
    } else {
        document.getElementById("passwordWarningToShort").classList.remove("hide")
        registerForm.reset();
        return null;
    }

}

function resetFormWarnings() {
    document.getElementById("loginWarningToShort").classList.add("hide")
    document.getElementById("passwordWarningToShort").classList.add("hide")
    document.getElementById("passwordWarningNoMatch").classList.add("hide")

}

function hashCode(s) {
    return s.split("").reduce(function (a, b) {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
}

// const fs = require('fs')
import * as fs from './fs';
const writeData = (valLogin, valRePassword) => {
    let account = {
        login: valLogin,
        password: valRePassword
    }
    const finished = (error) => {
        if (error) {
            console.log(error)
            return;
        }
    }

    const jsonValues = JSON.stringify(account);
    fs.writeFile('logins.json',jsonValues,finished)
    console.log(jsonValues)
}

