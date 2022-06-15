var username = document.getElementById("pUsername");
var email = document.getElementById("pUserEmail");
var ime = document.getElementById("inputIme");
var prezime = document.getElementById("inputPrezime");
var inputEmail = document.getElementById("inputEmail");
var inputUsername = document.getElementById("inputUsername");
var telefon = document.getElementById("inputTelefon");
var adresa = document.getElementById("inputAdresa");
var profilnaSlika = document.getElementById("imgUser");

window.onload = function pageOnLoad() {
    var user = Storage.getUser();

    if (!user) {
        window.location = "./index.html";
    }
    else {
        username.innerHTML = user.korisnickoIme;
        email.innerHTML = user.email;
        ime.value = user.ime;
        prezime.value = user.prezime;
        inputEmail.value = user.email;
        inputUsername.value = user.korisnickoIme;
        telefon.value = user.telefon;
        adresa.value = user.adresa;
        profilnaSlika.src = 'data:image/png;base64,' + user.slika;
    }
}

function logOut() {
    let confirmAction = confirm("Da li zelite da se odjavite?");
    if (confirmAction) {
        Storage.removeUser();
        window.location = "./index.html";
    }
}

function sacuvajIzmene() {
    var oldUser = Storage.getUser();

    let user = JSON.stringify({
        "korisnikId": oldUser.korisnikId,
        "korisnickoIme": inputUsername.value,
        "email": inputEmail.value,
        "ime": ime.value,
        "prezime": prezime.value,
        "telefon": telefon.value,
        "adresa": adresa.value,
    });

    var file = document.getElementById("profilePicture").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var codedFile = reader.result;
            var byteString = codedFile.split(',')[1];
            fetch("https://localhost:5001/Korisnik/PromenaFromBodyKorisnik", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: user
            }).then(r => {
                if (r.ok) {
                    // Izmeni sliku 
                    fetch("https://localhost:5001/Korisnik/PromeniSlikuKorisnika/" + oldUser.korisnikId, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(byteString)
                    }).then(r => {
                        if (r.ok) {
                            r.text().then(slika => {
                                Storage.removeUser();
                                console.log("slika:", slika);
                                user.slika = slika;
                                let userNew = JSON.stringify({
                                    "korisnikId": oldUser.korisnikId,
                                    "korisnickoIme": inputUsername.value,
                                    "email": inputEmail.value,
                                    "ime": ime.value,
                                    "prezime": prezime.value,
                                    "telefon": telefon.value,
                                    "adresa": adresa.value,
                                    "slika": slika
                                });
                                localStorage.setItem("user", userNew);
                                window.location.reload();
                            });
                        }
                        else {
                            r.text().then(errorText => { alert(errorText); });
                        }
                    });
                }
                else {
                    r.text().then(errorText => { alert(errorText); });
                }
            });
        };
    }
    else{
        fetch("https://localhost:5001/Korisnik/PromenaFromBodyKorisnik", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: user
        }).then(r => {
            if (r.ok) {
                r.text().then(slika => {
                    Storage.removeUser();
                    let userNew = JSON.stringify({
                        "korisnikId": oldUser.korisnikId,
                        "korisnickoIme": inputUsername.value,
                        "email": inputEmail.value,
                        "ime": ime.value,
                        "prezime": prezime.value,
                        "telefon": telefon.value,
                        "adresa": adresa.value,
                        "slika":oldUser.slika
                    });
                    localStorage.setItem("user", userNew);
                    alert("Uspesno ste promenili podatke!");
                    window.location.reload();
                });
            }
            else {
                r.text().then(errorText => { alert(errorText); });
            }
        });
    }
}

function promeniLozinku() {
    var trenutnaLozinka = inputTrenutnaLozinka.value;
    var novaLozinka = inputNovaLozinka.value;
    var potvrdaNovaLozinka = inputPotvrdaNovaLozinka.value;

    if (!novaLozinka || !trenutnaLozinka || !potvrdaNovaLozinka) {
        alert("Unesite lozinku!");
        return;
    }

    if (novaLozinka !== potvrdaNovaLozinka) {
        alert("Potvrdite novu lozinku!");
        return;
    }

    var user = Storage.getUser();
    console.log("user ", user);
    try {
        fetch("https://localhost:5001/Korisnik/PromeniLozinku/" + user.korisnikId + "/" + trenutnaLozinka + "/" + novaLozinka, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(r => {
            if (r.ok) {
                alert("Uspesno izmenjena lozinka!");
                window.location.reload();
            }
            else {
                r.text().then(errorText => { alert(errorText); });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}