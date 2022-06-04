function prikaziSatove() {
    fetch("https://localhost:5001/Artikal/GetSat").then(
      res => {
        res.json().then(
          data => {
            // console.log(data);
            if (data.length > 0) {
    
              var temp = "";
              data.forEach((itemData) => {
                temp += "<tr>";
                temp += "<td>" + itemData.artikalId + "</td>";
                temp += "<td>" + itemData.naziv + "</td>";
                temp += "<td>" + itemData.cena + "</td>";
                temp += "<td>" + itemData.opis + "</td>";
                temp += "<td>" + itemData.naStanju + "</td>";
                temp += "<td>" + itemData.brojProdaja + "</td>";
                temp += "<td><a href='http://127.0.0.1:5500/Aplikacija/Frontend/admin/product-insert2.html?"+itemData.artikalId + "' data-toggle='tooltip' title='Edit' class='pd-setting-ed'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>" +  "</a></td>";
                temp += "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiArtikal("+ itemData.artikalId + ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " +  "</button></td></tr>";
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
                // console.log(data);
                if (data.length > 0) {
        
                  var temp = "";
                  data.forEach((itemData) => {
                    temp += "<tr>";
                    temp += "<td>" + itemData.artikalId + "</td>";
                    temp += "<td>" + itemData.naziv + "</td>";
                    temp += "<td>" + itemData.cena + "</td>";
                    temp += "<td>" + itemData.opis + "</td>";
                    temp += "<td>" + itemData.naStanju + "</td>";
                    temp += "<td>" + itemData.brojProdaja + "</td>";
                    temp += "<td><a href='http://127.0.0.1:5500/Aplikacija/Frontend/admin/product-insert2.html?"+itemData.artikalId + "' data-toggle='tooltip' title='Edit' class='pd-setting-ed'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>" +  "</a></td>";
                    temp += "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiArtikal("+ itemData.artikalId + ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " +  "</button></td></tr>";
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
                    // console.log(data);
                    if (data.length > 0) {
            
                      var temp = "";
                      data.forEach((itemData) => {
                        temp += "<tr>";
                        temp += "<td>" + itemData.artikalId + "</td>";
                        temp += "<td>" + itemData.naziv + "</td>";
                        temp += "<td>" + itemData.cena + "</td>";
                        temp += "<td>" + itemData.opis + "</td>";
                        temp += "<td>" + itemData.naStanju + "</td>";
                        temp += "<td>" + itemData.brojProdaja + "</td>";
                        temp += "<td><a href='http://127.0.0.1:5500/Aplikacija/Frontend/admin/product-insert2.html?"+itemData.artikalId + "' data-toggle='tooltip' title='Edit' class='pd-setting-ed'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>" +  "</a></td>";
                        temp += "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiArtikal("+ itemData.artikalId + ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " +  "</button></td></tr>";
                      });
                      document.getElementById('narukvice').innerHTML = temp;
                    }
                  }
                )
              }
            )
            }

            function artikalDetaljno() {
              // var url = window.location.href;
              // const strs = url.split('?');
              // const id = url.at()
              var url = window.location.href;
              var id = url.substring(url.lastIndexOf('?') + 1);              
              
              fetch("https://localhost:5001/Artikal/VratiArtikal/"+id).then(
                res => {
                  res.json().then(
                    data => {
                      // console.log("Podaci o proizvodu")
                      // console.log(data);
                      // document.getElementById("title1").innerHTML = data[0].naziv;

                      document.getElementById("artikalID").value = data[0].artikalID;

                      document.getElementById("title").value = data[0].naziv;

                      // document.getElementById("cena").innerHTML = data[0].cena + '$';
                      document.getElementById("cena").value = data[0].cena;

                      // document.getElementById("naStanju").innerHTML = data[0].naStanju;
                      document.getElementById("naStanju").value = data[0].naStanju;

                      // document.getElementById("opis").innerHTML = data[0].opis;
                      document.getElementById("opis").value = data[0].opis;

                      // document.getElementById("tip").value = data[0].tip;

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
              });
      }

      function izmeniArtikal()
      {
        let id = document.getElementById("artikalID").value;
        let naziv = document.getElementById("title").value;
        let cena = document.getElementById("cena").value;
        let opis = document.getElementById("opis").value;
        let naStanju = document.getElementById("naStanju").value;

        fetch("https://localhost:5001/Artikal/UpdateArtikal/" + id  +  "/"  + naziv + "/" + cena + "/" + opis + "/" + naStanju, { method: "PUT" }).then(p => {
              
            if (!p.ok) {
                window.alert("Nije moguce izmeniti artikal!");
            } else {
              history.go(0);
              window.alert("Uspesno ste izmenili proizvod");
            }
        });

      }

      function izbrisiArtikal(val){
        fetch("https://localhost:5001/Artikal/IzbrisiArtikal/" + val, { method: "DELETE" }).then(p => {
          if (!p.ok) {
              alert("Nije moguce obrisati artikal!");
          } else {
            history.go(0);
            window.alert("Uspesno ste obrisali proizvod");
          }
      });
      }
      // dodajArtikal();
    prikaziNarukvice();
    prikaziKaiseve();    
    prikaziSatove();
    artikalDetaljno();

    