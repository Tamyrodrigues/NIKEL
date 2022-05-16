const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checklogged();

//criar conta
document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const senha = document.getElementById("senha-input").value;

    if (email.length < 5) {
        alert("Preencha o campo com um e-mail válido.")
        return;
    };

    if (senha.length < 4) {
        alert("Preencha a senha com no mínimo 4 digitos.")
        return;
    };
    salvarConta({
        login: email,
        senha: senha,
        transactions: []

    });

    myModal.hide();

    alert("conta criada com susseco.");

})

function checklogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }
    if (logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function salvarConta(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data);

    }
    sessionStorage.setItem("logged", data)
}

function getAccount(key) {
    const account = localStorage.getItem(key);
    if (account) {
        return JSON.parse(account);
    }
    return "";
}

// login no sistema

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const session = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account) {
        alert("ops! Verifique o usuário ou a senha.");
        return;
    }

    if (account) {
        if (account.senha !== senha) {
            alert("ops! Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, session);

        window.location.href = "home.html";
    }


});