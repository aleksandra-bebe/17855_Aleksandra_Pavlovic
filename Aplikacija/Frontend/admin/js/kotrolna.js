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

