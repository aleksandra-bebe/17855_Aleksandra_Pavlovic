const token = localStorage.getItem("token");
function prikaziKorisnike() {
  fetch("https://localhost:5001/Korisnik/GetKorisnik",
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
            console.log(data);
            if (data.length > 0) {
              var temp = "";
              data.forEach((itemData) => {
                var admin = itemData.tipKorisnika === "Admin";
                console.log(admin);
                temp += "<tr>";
                temp += "<td>" + itemData.ime + "</td>";
                temp += "<td>" + itemData.prezime + "</td>";
                temp += "<td>" + itemData.korisnickoIme + "</td>";
                temp += "<td>" + itemData.adresa + "</td>";
                temp += "<td>" + itemData.telefon + "</td>";
                // temp += "<td>" + itemData.obrisan + "</td>";
                if(admin) temp += "<td> <input type='checkbox' checked onclick='changeAdmin(" + itemData.korisnikId + ", this);' </td>";
                else{temp += "<td> <input type='checkbox' onclick='changeAdmin(" + itemData.korisnikId + ", this);' </td>";}
                temp += "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiKorisnika(" + itemData.korisnikId + ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " + "</button></td></tr>";
              });
              document.getElementById('data').innerHTML = temp;
            }
          })
      }
      else if (p.status == 401) {
        Storage.removeUser();
        Storage.removeToken();
        window.location = "../index.html";
        return false;
        throw new Error();
      }
    })
}
prikaziKorisnike();

function dodajKorisnika() {
  let ime = document.getElementById("ime").value;
  let prezime = document.getElementById("prezime").value;
  document.getElementById("ime").value = "";
  document.getElementById("prezime").value = "";

  fetch("https://localhost:5001/Korisnik/PostKorisnik" + ime + "/" + prezime,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": token,
      }
    }).then(p => {
      if (p.status == 401) {
        alert("Niste autorizovani!");
        Storage.removeUser();
        Storage.removeToken();
        window.location = "../index.html";
         throw new Error();
      }
      else {
        window.alert("Nije moguce dodati korisnika!");
      }
    });
}


function izbrisiKorisnika(val) {
  fetch("https://localhost:5001/Korisnik/ObrisiKorisnika/" + val,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": token,
      }
    }).then(p => {
      if(p.ok){
        window.alert("Uspesno ste obrisali korisnika");
        window.location = "workers.html";
      }
      else if (p.status == 401) {
        alert("Niste autorizovani!");
        Storage.removeUser();
        Storage.removeToken();
        window.location = "../index.html";
        throw new Error();
      } 
      else {
        alert("Nije moguce obrisati korisnika!");
      }
    });
}

function changeAdmin(id,val) {
  var role = "";
  if(val.checked) role = "Admin";
  else{role = "User"}
  fetch("https://localhost:5001/Korisnik/SetTipKorisnika/" + id + "/" + role,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": token,
      }
    }).then(p => {
      if(p.ok){
        window.alert("Uspesno ste promenili tip korisnika");
        window.location = "workers.html";
      }
      else if (p.status == 401) {
        alert("Niste autorizovani!");
        Storage.removeUser();
        Storage.removeToken();
        window.location = "../index.html";
        throw new Error();
      } 
      else {
        alert("Nije moguce obrisati korisnika!");
      }
    });
}
