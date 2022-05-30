function prikaziKorisnike() {
fetch("https://localhost:5001/Korisnik/GetKorisnik").then(
  res => {
    res.json().then(
      data => {
        console.log(data);
        if (data.length > 0) {

          var temp = "";
          data.forEach((itemData) => {
            temp += "<tr>";
            temp += "<td>" + itemData.ime + "</td>";
            temp += "<td>" + itemData.prezime + "</td>";
            temp += "<td>" + itemData.korisnickoIme + "</td>";
            temp += "<td>" + itemData.adresa + "</td>";
            temp += "<td>" + itemData.telefon + "</td></tr>";
          });
          document.getElementById('data').innerHTML = temp;
        }
      }
    )
  }
)
}

prikaziKorisnike();



function dodajKorisnika(){
        let ime = document.getElementById("ime").value;
        let prezime = document.getElementById("prezime").value;
        document.getElementById("ime").value = "";
        document.getElementById("prezime").value = "";

        fetch("https://localhost:5001/Korisnik/PostKorisnik" + ime + "/" + prezime, { method: "POST" }).then(p => {
            if (!p.ok) {
                window.alert("Nije moguce dodati instruktora!");
            }
            this.vratiInstruktore();
        });
}
