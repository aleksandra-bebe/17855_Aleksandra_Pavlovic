const token = localStorage.getItem("token");

function brojKorisnika()
{
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
              document.getElementById("brojKorisnika").innerHTML = data.length;
          })
      }
      else if (p.status == 401) {
        Storage.removeUser();
        Storage.removeToken();
        window.location = "../../index.html";
        return false;
      }
    })
}

brojKorisnika();

function brojTransakcija()
{
  fetch("https://localhost:5001/Transakcija/VratiTransakcije",
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
            document.getElementById("brojTransakcija").innerHTML = data.length;
          })
      }
      else if (p.status == 401) {
        Storage.removeUser();
        Storage.removeToken();
        window.location = "../../index.html";
        throw new Error();
        return false;
      }
    })
}

brojTransakcija();

function ukupnaZarada()
{
  fetch("https://localhost:5001/Transakcija/VratiZaradu",
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
            document.getElementById("zarada").innerHTML = data + " rsd";
          })
      }
      else if (p.status == 401) {
        Storage.removeUser();
        Storage.removeToken();
        window.location = "../../index.html";
        throw new Error();
        return false;
      }
    })
}

ukupnaZarada();

function UkupanBrojAktivnihArtiala()
{
  fetch("https://localhost:5001/Artikal/UkupanBrojArtikala",
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
            document.getElementById("artikli").innerHTML = data;
          })
      }
      else if (p.status == 401) {
        Storage.removeUser();
        Storage.removeToken();
        window.location = "../../index.html";
        throw new Error();
        return false;
      }
    })
}

UkupanBrojAktivnihArtiala();

