function prikaziTipove() {
  fetch("https://localhost:5001/Tip/GetTip").then(
    res => {
      res.json().then(
        data => {
          console.log(data);
          if (data.length > 0) {
  
            var temp = "";
            data.forEach((itemData) => {
              temp += "<tr>";
              temp += "<td>" + itemData.tipId + "</td>";
              temp += "<td>" + itemData.naziv + "</td></tr>";
            });
            document.getElementById('tip').innerHTML = temp;
          }
        }
      )
    }
  )
  }

  prikaziTipove();

  function dodajTip() {
    let naziv = document.getElementById("naziv").value;
    document.getElementById("naziv").value = "";

    if (!naziv) {
      alert("Morate uneti naziv tipa!");
      return;
    }
    
    fetch("https://localhost:5001/Tip/DodajNoviTip/" + naziv, { method: "POST" }).then(p => {
        if (!p.ok) {
            window.alert("Nije moguce dodati tip!");
        }
    });
}
