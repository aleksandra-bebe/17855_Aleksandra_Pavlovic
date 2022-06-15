function prikaziTransakcije() {
  fetch("https://localhost:5001/Transakcija/VratiTransakcije", {
    method: "GET",
  }).then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (data.length > 0) {
        var temp = "";
        data.forEach((itemData) => {
          temp += "<tr>";
          temp += "<td>" + itemData.transakcijaId + "</td>";
          temp += "<td>" + itemData.kolicina + "</td>";
          temp += "<td>" + itemData.adresa + "</td>";
          temp += "<td>" + itemData.naziv + "</td>";
          temp += "<td>" + itemData.korisnickoIme + "</td></tr>";
        });
        document.getElementById("data").innerHTML = temp;
      }
    });
  });
}

prikaziTransakcije();
