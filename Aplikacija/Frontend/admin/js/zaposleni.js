function vratiNaListuZaposlenih() {
    window.location = "zaposleni.html";
  }

const token = localStorage.getItem("token");
function prikaziZaposlene() {
  fetch("https://localhost:5001/Zaposlen/GetZaposlen",
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
                temp += "<tr>";
                temp += "<td>" + itemData.ime + "</td>";
                temp += "<td>" + itemData.prezime + "</td>";
                temp += "<td>" + itemData.email + "</td>";
                temp += "<td>" + itemData.prosecnaOcena + "</td>";
                temp += "<td>" + itemData.obrisan + "</td>";
                temp += "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiZaposlenog(" + itemData.zaposleniId + ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " + "</button></td></tr>";
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
prikaziZaposlene();

function dodajZaposlenog() {
  let ime = document.getElementById("ime").value;
  let prezime = document.getElementById("prezime").value;
  let email = document.getElementById("email").value;

  document.getElementById("ime").value = "";
  document.getElementById("prezime").value = "";

  fetch("https://localhost:5001/Zaposlen/DodajZaposlenogRadnika/" + ime + "/" + prezime + "/" + email,
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
        window.alert("Nije moguce dodati zaposlenog!");
      }
    });
}

//treba da se doda metoda u kontroleru
function izbrisiZaposlenog(val) {
//   fetch("https://localhost:5001/Korisnik/ObrisiKorisnika/" + val,
//     {
//       method: "PUT",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         "Authorization": token,
//       }
//     }).then(p => {
//       if(p.ok){
//         window.alert("Uspesno ste obrisali korisnika");
//         window.location = "workers.html";
//       }
//       else if (p.status == 401) {
//         alert("Niste autorizovani!");
//         Storage.removeUser();
//         Storage.removeToken();
//         window.location = "../index.html";
//         throw new Error();
//       } 
//       else {
//         alert("Nije moguce obrisati korisnika!");
//       }
//     });
}
  
