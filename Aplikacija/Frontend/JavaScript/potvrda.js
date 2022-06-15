var username = document.getElementById("pUsername");
var email = document.getElementById("pUserEmail");
var ime = document.getElementById("pIme");
var prezime = document.getElementById("pPrezime");
var brojKupovina = document.getElementById("pBrojKupovina");
var naziv = document.getElementById("Naziv");
var cena = document.getElementById("Cena");
var opis = document.getElementById("Opis");
var kolicina = document.getElementById("Kolicina");
let list = document.getElementById("proizvodi");
var popustDOM = document.querySelector(".popust");

window.onload = function pageOnLoad() {
  var user = Storage.getUser();
  console.log("user", user);
  var cart = Storage.getCart();
  console.log("cart", cart);
  if (!user) {
    window.location = "./index.html";
  }
  else {

    ime.innerHTML = user.ime;
    prezime.innerHTML = user.prezime;
    email.innerHTML = user.email;
    brojKupovina.innerHTML = user.brojOnlineKupovina;
  }
  cart.forEach((item) => {
    var kupovina = user.brojOnlineKupovina;
    console.log(kupovina);
    var cenaPr = item.cena;
    console.log(cenaPr);
    if (kupovina >= 5 && kupovina < 7) {
      var posto = 5;
      var popust = (posto / 100) * cenaPr;
      var novaCena = cenaPr - popust;
      item.cena = novaCena;
      var p = document.getElementById("popust");
      p.innerHTML = "BRONSE!";
      var p1 = document.getElementById("popust1");
      p1.innerHTML = "Ostvarili ste popust od  " + posto + " %  na svaki artikal!";
    }
    else if (kupovina >= 7 && kupovina < 10) {
      var posto = 7;
      var popust = (posto / 100) * cenaPr;
      var novaCena = cenaPr - popust;
      item.cena = novaCena;
      var p = document.getElementById("popust");
      p.innerHTML = "SILVER!";
      var p1 = document.getElementById("popust1");
      p1.innerHTML = "Ostvarili ste popust od  " + posto + " % na svaki artikal !";
    }
    else if (kupovina >= 10) {
      var posto = 10;
      var popust = (posto / 100) * cenaPr;
      var novaCena = cenaPr - popust;
      item.cena = novaCena;
      var p = document.getElementById("popust");
      p.innerHTML = "  GOLD!";
      var p1 = document.getElementById("popust1");
      p1.innerHTML = "Ostvarili ste popust od  " + posto + " % na svaki artikal !";

    }
  })


  if (cart.length > 0) {
    var temp = "";
    var ukupnaCena;
    cart.forEach((itemData) => {
      ukupnaCena=itemData.cena * itemData.amount;
      temp += "<tr>";
      temp += "<td>" + itemData.naziv + "</td>";
      temp += "<td>" + itemData.opis + "</td>";
      temp += "<td>" + itemData.amount + "</td>";
      temp += "<td>" + itemData.cena + "</td>";
      temp+="<td>" +  ukupnaCena+"</td>";
    });
    document.getElementById('proizvodi').innerHTML = temp;
  }
}

function poruci() {
  var errorLabel = document.getElementById("ErrorText");
  var user = Storage.getUser();
  console.log("user", user);
  var cart = Storage.getCart();
  console.log("cart", cart);
  var adresa = document.getElementById("adresaDostave").value;
  var kupovina = user.brojOnlineKupovina;
  if (adresa != "") {
    cart.forEach((product) => {
      var kol = product.amount;
      var cenaPr = product.cena;
      var novaCena = cenaPr;
      if (kupovina >= 5 && kupovina < 7) {
        var posto = 5;
        var popust = (posto / 100) * cenaPr;
        novaCena = cenaPr - popust;
      }
      else if (kupovina >= 7 && kupovina < 10) {
        var posto = 10;
        var popust = (posto / 100) * cenaPr;
        novaCena = cenaPr - popust;
      }
      else if (kupovina >= 10) {
        var posto = 15;
        var popust = (posto / 100) * cenaPr;
        novaCena = cenaPr - popust;
      }
      fetch("https://localhost:5001/Transakcija/PostTransakcija/" + user.korisnikId + "/" + product.artikalID + "/" + kol + "/" + adresa + "/" + novaCena,
        {
          method: 'POST',
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(p => {
          if (!p.ok) {
            p.text().then(errorText => { errorLabel.innerHTML = errorText });
            setTimeout(() => {
              errorLabel.innerHTML = ""
            }, 7000);
          }
          else {
            p.json().then(
              data => {
                Storage.removeCart();
                Storage.removeUser();
                Storage.saveUser(data);
                window.location = './profil.html';
                alert("Proizvod je porucen!");
              })
          }
        })
    });
  }
  else {
    alert("Morate uneti adresu dostave!");
  }

}
