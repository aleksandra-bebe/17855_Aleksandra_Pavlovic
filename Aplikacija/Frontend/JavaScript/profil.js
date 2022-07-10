const ul = document.getElementById('users');
window.onload = function pageOnLoad() {AuthorizeUser();}
function LogOut() {
  let confirmAction = confirm("Da li zelite da se odjavite?");
  if (confirmAction) {
    Storage.removeUser();
    Storage.removeToken();
    window.location = "index.html";
  }
}


function prikaziSatove() {

  var user = Storage.getUser();
  var token = Storage.getToken();

  fetch("https://localhost:5001/Transakcija/GetTransakcija/" + user.korisnikId,
    {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": token,
      }
    }).then(p => {
      if (p.ok) {
        p.json().then(
          data => {
            if (data.length > 0) {
              var temp = "";
              data.forEach((itemData) => {
                var ukupnaCena = itemData.cenaPopust * itemData.kolicina;
                temp += "<tr>";
                temp += "<td>" + itemData.naziv + "</td>";
                // temp+="<td>"+   itemData.cena+   "</td>";
                temp += "<td>" + itemData.opis + "</td>";
                temp += "<td>" + itemData.kolicina + "</td>";
                temp += "<td>" + itemData.cenaPopust + "</td>";
                temp += "<td>" + ukupnaCena + "</td>"
                //  temp+="<td>"+  ar + "</td>";

              });
              document.getElementById('satovi').innerHTML = temp;
            }
          })
      }
      else if (p.status == 401) {
        alert("Niste autorizovani!");
        Storage.removeUser();
        Storage.removeToken();
        window.location = "../index.html";
      }
      else {
        p.text().then(errorText => { errorLabel.innerHTML = errorText });
        setTimeout(() => {
          errorLabel.innerHTML = ""
        }, 7000);
      }
    })
}

prikaziSatove();