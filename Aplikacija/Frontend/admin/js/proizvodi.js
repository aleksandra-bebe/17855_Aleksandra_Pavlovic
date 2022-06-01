function prikaziSatove() {
    fetch("https://localhost:5001/Artikal/GetSat").then(
      res => {
        res.json().then(
          data => {
            console.log(data);
            if (data.length > 0) {
    
              var temp = "";
              data.forEach((itemData) => {
                temp += "<tr>";
                temp += "<td>" + itemData.artikalId + "</td>";
                temp += "<td>" + itemData.naziv + "</td>";
                temp += "<td>" + itemData.cena + "</td>";
                temp += "<td>" + itemData.opis + "</td>";
                temp += "<td>" + itemData.naStanju + "</td>";
                temp += "<td>" + itemData.brojProdaja + "</td></tr>";
              });
              document.getElementById('satovi').innerHTML = temp;
            }
          }
        )
      }
    )
    }

    function prikaziKaiseve() {
        fetch("https://localhost:5001/Artikal/GetKais").then(
          res => {
            res.json().then(
              data => {
                console.log(data);
                if (data.length > 0) {
        
                  var temp = "";
                  data.forEach((itemData) => {
                    temp += "<tr>";
                    temp += "<td>" + itemData.artikalId + "</td>";
                    temp += "<td>" + itemData.naziv + "</td>";
                    temp += "<td>" + itemData.cena + "</td>";
                    temp += "<td>" + itemData.opis + "</td>";
                    temp += "<td>" + itemData.naStanju + "</td>";
                    temp += "<td>" + itemData.brojProdaja + "</td></tr>";
                  });
                  document.getElementById('kaisevi').innerHTML = temp;
                }
              }
            )
          }
        )
        }

        function prikaziNarukvice() {
            fetch("https://localhost:5001/Artikal/GetNarukvica").then(
              res => {
                res.json().then(
                  data => {
                    console.log(data);
                    if (data.length > 0) {
            
                      var temp = "";
                      data.forEach((itemData) => {
                        temp += "<tr>";
                        temp += "<td>" + itemData.artikalId + "</td>";
                        temp += "<td>" + itemData.naziv + "</td>";
                        temp += "<td>" + itemData.cena + "</td>";
                        temp += "<td>" + itemData.opis + "</td>";
                        temp += "<td>" + itemData.naStanju + "</td>";
                        temp += "<td>" + itemData.brojProdaja + "</td></tr>";
                      });
                      document.getElementById('narukvice').innerHTML = temp;
                    }
                  }
                )
              }
            )
            }

            function dodajArtikal(){
              let naziv = document.getElementById("naziv").value;
              let cena = document.getElementById("cena").value;
              let opis = document.getElementById("opis").value;
              let naStanju = document.getElementById("naStanju").value;
              let tipId = document.getElementById("tipId").value;
              document.getElementById("naziv").value = "";
              document.getElementById("cena").value = "";
              document.getElementById("opis").value = "";
              document.getElementById("naStanju").value = "";
              document.getElementById("tipId").value = "";
           
      
              fetch("https://localhost:5001/Artikal/DodajArtikal/" + naziv + "/" + cena + "/" + opis + "/" + naStanju + "/" + tipId, { method: "POST" }).then(p => {
                  if (!p.ok) {
                      window.alert("Nije moguce dodati artikal!");
                  }
                  // this.vratiInstruktore();
              });
      }
      // dodajArtikal();
    prikaziNarukvice();
    prikaziKaiseve();    
    prikaziSatove();

    