const token = localStorage.getItem("token");
function prikaziTransakcije() {
  fetch("https://localhost:5001/Transakcija/VratiTransakcije", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  }).then((res) => {
    if (res.ok) {
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
    } 
    else if (res.status == 401) {
      Storage.removeUser();
      Storage.removeToken();
      window.location = "../index.html";
      throw new Error();
    }
    
  });
}

prikaziTransakcije();
