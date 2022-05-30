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
    prikaziNarukvice();
    prikaziKaiseve();    
    prikaziSatove();

    