function brojKorisnika()
{
    fetch("https://localhost:5001/Korisnik/GetKorisnik").then(
  res => {
    res.json().then(
      data => {
        // console.log(data);
        document.getElementById("brojKorisnika").innerHTML = data.length;
      }
      )
    }
  )
}

brojKorisnika();

function brojTransakcija()
{
    fetch("https://localhost:5001/Transakcija/VratiTransakcije").then(
  res => {
    res.json().then(
      data => {
        // console.log(data);
        document.getElementById("brojTransakcija").innerHTML = data.length;
      }
      )
    }
  )
}

brojTransakcija();

function ukupnaZarada()
{
    fetch("https://localhost:5001/Transakcija/VratiZaradu").then(
  res => {
    res.json().then(
      data => {
        document.getElementById("zarada").innerHTML = data + " rsd";
      }
      )
    }
  )
}

ukupnaZarada();

function UkupanBrojAktivnihArtiala()
{
    fetch("https://localhost:5001/Artikal/UkupanBrojArtikala").then(
  res => {
    res.json().then(
      data => {
        document.getElementById("artikli").innerHTML = data;
      }
      )
    }
  )
}

UkupanBrojAktivnihArtiala();

