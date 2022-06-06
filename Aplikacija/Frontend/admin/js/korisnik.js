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
            temp += "<td>" + itemData.telefon + "</td>";
            temp += "<td>" + itemData.obrisan + "</td>";
            temp += "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiKorisnika("+ itemData.korisnikId + ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " +  "</button></td></tr>";
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


function izbrisiKorisnika(val){
  // console.log(val);
  fetch("https://localhost:5001/Korisnik/ObrisiKorisnika/" + val, { method: "PUT" }).then(p => {
    if (!p.ok) {
        alert("Nije moguce obrisati korisnika!");
    } else {
      window.alert("Uspesno ste obrisali korisnika");
      window.location = "http://127.0.0.1:5500/Aplikacija/Frontend/admin/workers.html";
    }
});
}
