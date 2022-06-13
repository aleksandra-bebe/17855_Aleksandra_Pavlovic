function changePicture() {
  var file = document.getElementById("profilePicture").files[0];
  var img = document.getElementById("imgProfilePicture");
  if (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      img.src = reader.result;
    }
  }
}
function prikaziSatove() {
  var satovi = document.getElementById('satovi')
  if (!satovi) return;
  fetch("https://localhost:5001/Artikal/GetSat").then(
    res => {
      res.json().then(
        data => {
          if (data.length > 0) {

            var temp = "";
            data.forEach((itemData) => {
              temp += "<tr>";
              temp += "<td><img src=data:image/png;base64,"+itemData.image +" alt='slikaProizvoda'/>"  + "</td>";
              temp += "<td>" + itemData.artikalId + "</td>";
              temp += "<td>" + itemData.naziv + "</td>";
              temp += "<td>" + itemData.cena + "</td>";
              temp += "<td>" + itemData.opis + "</td>";
              temp += "<td>" + itemData.naStanju + "</td>";
              temp += "<td>" + itemData.brojProdaja + "</td>";
              temp += "<td>" + itemData.prosecnaOcena + "</td>";
              temp += "<td><a href='product-insert2.html?" + itemData.artikalId + "' data-toggle='tooltip' title='Edit' class='pd-setting-ed'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>" + "</a></td>";
              temp += "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiArtikal(" + itemData.artikalId + ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " + "</button></td></tr>";
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
          if (data.length > 0) {

            var temp = "";
            data.forEach((itemData) => {
              temp += "<tr>";
              temp += "<td><img src=data:image/png;base64,"+itemData.image +" alt='slikaProizvoda'/>"  + "</td>";
              temp += "<td>" + itemData.artikalId + "</td>";
              temp += "<td>" + itemData.naziv + "</td>";
              temp += "<td>" + itemData.cena + "</td>";
              temp += "<td>" + itemData.opis + "</td>";
              temp += "<td>" + itemData.naStanju + "</td>";
              temp += "<td>" + itemData.brojProdaja + "</td>";
              temp += "<td>" + itemData.prosecnaOcena + "</td>";
              temp += "<td><a href='product-insert2.html?" + itemData.artikalId + "' data-toggle='tooltip' title='Edit' class='pd-setting-ed'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>" + "</a></td>";
              temp += "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiArtikal(" + itemData.artikalId + ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " + "</button></td></tr>";
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
          if (data.length > 0) {

            var temp = "";
            data.forEach((itemData) => {
              temp += "<tr>";
              temp += "<td><img src=data:image/png;base64,"+itemData.image +" alt='slikaProizvoda'/>"  + "</td>";
              temp += "<td>" + itemData.artikalId + "</td>";
              temp += "<td>" + itemData.naziv + "</td>";
              temp += "<td>" + itemData.cena + "</td>";
              temp += "<td>" + itemData.opis + "</td>";
              temp += "<td>" + itemData.naStanju + "</td>";
              temp += "<td>" + itemData.brojProdaja + "</td>";
              temp += "<td>" + itemData.prosecnaOcena + "</td>";
              temp += "<td><a href='product-insert2.html?" + itemData.artikalId + "' data-toggle='tooltip' title='Edit' class='pd-setting-ed'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>" + "</a></td>";
              temp += "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiArtikal(" + itemData.artikalId + ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " + "</button></td></tr>";
            });
            document.getElementById('narukvice').innerHTML = temp;
          }
        }
      )
    }
  )
}

function artikalDetaljno() {
  var url = window.location.href;
  var index = url.lastIndexOf('?');
  if(index == -1) return;
  var id = url.substring( index + 1);
  if(!id) return;
  fetch("https://localhost:5001/Artikal/VratiArtikal/" + id).then(
    res => {
      res.json().then(
        data => {

          document.getElementById("artikalID").value = data[0].artikalID;

          document.getElementById("title").value = data[0].naziv;

          document.getElementById("cena").value = data[0].cena;

          document.getElementById("naStanju").value = data[0].naStanju;

          document.getElementById("opis").value = data[0].opis;

          document.getElementById("tipId").value = data[0].tipId;

          document.getElementById("imgProfilePicture").src = 'data:image/png;base64,' + data[0].image;
        }
      )
    }
  )
}

function dodajArtikal() {
  let naziv = document.getElementById("naziv").value;
  let cena = document.getElementById("cena").value;
  let opis = document.getElementById("opis").value;
  let naStanju = document.getElementById("naStanju").value;
  let tipId = document.getElementById("selectTip").value;
  document.getElementById("naziv").value = "";
  document.getElementById("cena").value = "";
  document.getElementById("opis").value = "";
  document.getElementById("naStanju").value = "";
  document.getElementById("selectTip").value = "";

  if (!naziv) {
    alert("Morate uneti naziv proizvoda!");
    return;
  }
  if (!cena) {
    alert("Morate uneti cenu proizvoda!");
    return;
  }
  if (!naStanju) {
    alert("Morate uneti kolicinu proizvoda!");
    return;
  }
  if (!tipId) {
    alert("Morate uneti tip proizvoda!");
    return;
  }

  var file = document.getElementById("profilePicture").files[0];
  if (!file) {
    alert("Morate uneti sliku proizvoda!");
    return;
  }
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    var codedFile = reader.result;
    var byteString = codedFile.split(',')[1];
    fetch("https://localhost:5001/Artikal/DodajArtikal/" + naziv + "/" + cena + "/" + opis + "/" + naStanju + "/" + tipId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(byteString)
    }).then(r => {
      if (r.ok) {
        alert("Artikal je uspesno dodat!");
        window.location.reload();
      }
      else {
        alert("Nije moguce dodati artikal!");
        r.text().then(errorText => { alert(errorText); });
      }
    });
  }
}
function izmeniArtikal() {
  let id = document.getElementById("artikalID").value;
  let naziv = document.getElementById("title").value;
  let cena = document.getElementById("cena").value;
  let opis = document.getElementById("opis").value;
  let naStanju = document.getElementById("naStanju").value;
  let tipId = document.getElementById("tipId").value;


  var codedFile = document.getElementById("imgProfilePicture").src;
  var byteString = codedFile.split(',')[1];

  fetch("https://localhost:5001/Artikal/UpdateArtikal/" + id + "/" + naziv + "/" + cena + "/" + opis + "/" + naStanju + "/"+ tipId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(byteString)
  }).then(p => {
    if (!p.ok) {
      window.alert("Nije moguce izmeniti artikal!");
    } else {
      alert("Uspesno ste izmenili proizvod");
      window.location = "product-list.html";
    }
  });
}

function vratiNaListu() {
  window.location = "product-list.html";

}
function izbrisiArtikal(val) {
  fetch("https://localhost:5001/Artikal/ObrisiArtikal/" + val, { method: "PUT" }).then(p => {
    if (!p.ok) {
      alert("Nije moguce obrisati artikal!");
    } else {
      window.alert("Uspesno ste obrisali proizvod");
      window.location = "product-list.html";

    }
  });
}

function getTip() {
  fetch("https://localhost:5001/Tip/GetTip").then((res) => {
    res.json().then((data) => {
      if (data.length > 0) {

        var select = document.getElementById("selectTip");

        if(!select) return;
        for (var i = 0; i < data.length; i++) {
          var option = document.createElement("OPTION"),
            txt = document.createTextNode(data[i].naziv);
          option.appendChild(txt);
          option.setAttribute("value", data[i].tipId);
          select.insertBefore(option, select.lastChild);
        }
      }
    });
  });
}
getTip();
prikaziNarukvice();
prikaziKaiseve();
prikaziSatove();
artikalDetaljno();

