const token = localStorage.getItem("token");
function changePicture() {
  var file = document.getElementById("profilePicture").files[0];
  var img = document.getElementById("imgProfilePicture");
  if (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      img.src = reader.result;
    };
  }
}
//prikazi tipove
function Show() {
  fetch("https://localhost:5001/Tip/GetTip", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    res.json().then((data) => {
      if (data) {
        var temp = "";
        data.forEach((itemData) => {
          temp +=
            "<li style='display:inline; padding:15px; text-transform: capitalize; justify-content:space-around; font-size:40px'><a style='color:white;' href='./product-list.html?" +
            itemData.naziv +
            "' >" +
            itemData.naziv +
            "</a></li>";
        });
        document.getElementById("nazivi").innerHTML = temp;
      }
    });
  });
}
// crtanje tabele sa proizvodom
function tabovi() {
  let queryString = window.location.search;
  queryString = queryString.substring(1);
  var satovi = document.getElementById("proizvod");
  if (!satovi) return;
  fetch("https://localhost:5001/Artikal/GetOstale/" + queryString + "").then(
    (res) => {
      res.json().then((data) => {
        if (data.length > 0) {
          var temp = "";
            temp += "<div>";
            temp += "<br>";
            temp += "<h3 style='color: #ffffff; text-transform: capitalize;'>Vrsta artikla - " + queryString + "</h3>";
            temp += "<br>";
            temp += "<table>";
            temp += "<thead>";
            temp += "<tr>";
            temp += "<th>Slika</th>";
            temp += "<th>ID</th>";
            temp += "<th>Naziv</th>";
            temp += "<th>Cena</th>";
            temp += "<th>Opis</th>";
            temp += "<th>Na stanju</th>";
            temp += "<th>Broj prodaja</th>";
            temp += "<th>Prosecna ocena</th>";
            temp += "<th>Izmeni</th>";
            temp += "<th>Obrisi</th>";
            temp += "</tr>";
            temp += "</thead>";
            data.forEach((itemData) => {
            temp += "<tbody>";
            temp += "<tr>";
            temp +="<td><img src=data:image/png;base64," + itemData.image +" alt='slikaProizvoda'/>" +"</td>";
            temp += "<td>" + itemData.artikalId + "</td>";
            temp += "<td>" + itemData.naziv + "</td>";
            temp += "<td>" + itemData.cena + "</td>";
            temp += "<td>" + itemData.opis + "</td>";
            temp += "<td>" + itemData.naStanju + "</td>";
            temp += "<td>" + itemData.brojProdaja + "</td>";
            temp += "<td>" + itemData.prosecnaOcena + "</td>";
            temp +="<td><a href='product-insert2.html?" +itemData.artikalId +"' data-toggle='tooltip' title='Edit' class='pd-setting-ed'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>" +"</a></td>";
            temp +="<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiArtikal(" +itemData.artikalId + ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " +"</button></td></tr>";
          });
            temp += "</tbody>";
            temp += "</table>";
            temp += "</div>";
          
          document.getElementById("proizvod").innerHTML = temp;
        }
      });
    }
  );
}
function prikaziSatove() {
  var satovi = document.getElementById("satovi");
  if (!satovi) return;
  fetch("https://localhost:5001/Artikal/GetSat").then((res) => {
    res.json().then((data) => {
      if (data.length > 0) {
        var temp = "";
        data.forEach((itemData) => {
          temp += "<tr>";
          temp +=
            "<td><img src=data:image/png;base64," +
            itemData.image +
            " alt='slikaProizvoda'/>" +
            "</td>";
          temp += "<td>" + itemData.artikalId + "</td>";
          temp += "<td>" + itemData.naziv + "</td>";
          temp += "<td>" + itemData.cena + "</td>";
          temp += "<td>" + itemData.opis + "</td>";
          temp += "<td>" + itemData.naStanju + "</td>";
          temp += "<td>" + itemData.brojProdaja + "</td>";
          temp += "<td>" + itemData.prosecnaOcena + "</td>";
          temp +=
            "<td><a href='product-insert2.html?" +
            itemData.artikalId +
            "' data-toggle='tooltip' title='Edit' class='pd-setting-ed'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>" +
            "</a></td>";
          temp +=
            "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiArtikal(" +
            itemData.artikalId +
            ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " +
            "</button></td></tr>";
        });
        document.getElementById("satovi1").innerHTML = temp;
      }
    });
  });
}

function prikaziKaiseve() {
  fetch("https://localhost:5001/Artikal/GetKais").then((res) => {
    res.json().then((data) => {
      if (data.length > 0) {
        var temp = "";
        data.forEach((itemData) => {
          temp += "<tr>";
          temp +=
            "<td><img src=data:image/png;base64," +
            itemData.image +
            " alt='slikaProizvoda'/>" +
            "</td>";
          temp += "<td>" + itemData.artikalId + "</td>";
          temp += "<td>" + itemData.naziv + "</td>";
          temp += "<td>" + itemData.cena + "</td>";
          temp += "<td>" + itemData.opis + "</td>";
          temp += "<td>" + itemData.naStanju + "</td>";
          temp += "<td>" + itemData.brojProdaja + "</td>";
          temp += "<td>" + itemData.prosecnaOcena + "</td>";
          temp +=
            "<td><a href='product-insert2.html?" +
            itemData.artikalId +
            "' data-toggle='tooltip' title='Edit' class='pd-setting-ed'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>" +
            "</a></td>";
          temp +=
            "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiArtikal(" +
            itemData.artikalId +
            ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " +
            "</button></td></tr>";
        });
        document.getElementById("kaisevi1").innerHTML = temp;
      }
    });
  });
}

function prikaziNarukvice() {
  fetch("https://localhost:5001/Artikal/GetNarukvica").then((res) => {
    res.json().then((data) => {
      if (data.length > 0) {
        var temp = "";
        data.forEach((itemData) => {
          temp += "<tr>";
          temp +=
            "<td><img src=data:image/png;base64," +
            itemData.image +
            " alt='slikaProizvoda'/>" +
            "</td>";
          temp += "<td>" + itemData.artikalId + "</td>";
          temp += "<td>" + itemData.naziv + "</td>";
          temp += "<td>" + itemData.cena + "</td>";
          temp += "<td>" + itemData.opis + "</td>";
          temp += "<td>" + itemData.naStanju + "</td>";
          temp += "<td>" + itemData.brojProdaja + "</td>";
          temp += "<td>" + itemData.prosecnaOcena + "</td>";
          temp +=
            "<td><a href='product-insert2.html?" +
            itemData.artikalId +
            "' data-toggle='tooltip' title='Edit' class='pd-setting-ed'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>" +
            "</a></td>";
          temp +=
            "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiArtikal(" +
            itemData.artikalId +
            ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " +
            "</button></td></tr>";
        });
        document.getElementById("narukvice1").innerHTML = temp;
      }
    });
  });
}

function artikalDetaljno() {
  var url = window.location.href;
  var index = url.lastIndexOf("?");
  if (index == -1) return;
  var id = url.substring(index + 1);
  if (!id) return;
  fetch("https://localhost:5001/Artikal/VratiArtikal/" + id).then((res) => {
    res.json().then((data) => {
      document.getElementById("artikalID").value = data[0].artikalID;

      document.getElementById("title").value = data[0].naziv;

      document.getElementById("cena").value = data[0].cena;

      document.getElementById("naStanju").value = data[0].naStanju;

      document.getElementById("opis").value = data[0].opis;

      // document.getElementById("tipId").value = data[0].tipId;
      document.getElementById("selectTip").value = data[0].tipId;

      document.getElementById("imgProfilePicture").src =
        "data:image/png;base64," + data[0].image;
    });
  });
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
    var byteString = codedFile.split(",")[1];
    fetch(
      "https://localhost:5001/Artikal/DodajArtikal/" +
        naziv +
        "/" +
        cena +
        "/" +
        opis +
        "/" +
        naStanju +
        "/" +
        tipId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(byteString),
      }
    ).then((r) => {
      if (r.ok) {
        alert("Artikal je uspesno dodat!");
        window.location.reload();
      } else if (r.status == 401) {
        alert("Niste autorizovani!");
        Storage.removeUser();
        Storage.removeToken();
        window.location = "../index.html";
        throw new Error();
      } else {
        alert("Nije moguce dodati artikal!");
        r.text().then((errorText) => {
          alert(errorText);
        });
      }
    });
  };
}
function izmeniArtikal() {
  let id = document.getElementById("artikalID").value;
  let naziv = document.getElementById("title").value;
  let cena = document.getElementById("cena").value;
  let opis = document.getElementById("opis").value;
  let naStanju = document.getElementById("naStanju").value;
  // let tipId = document.getElementById("tipId").value;
  let tipId = document.getElementById("selectTip").value;

  if (!naziv) {
    alert("Morate uneti naziv artikla!");
    return;
  }
  if (!cena) {
    alert("Morate uneti cenu artikla!");
    return;
  }
  if (!naStanju) {
    alert("Morate uneti broj artikala na stanju!");
    return;
  }

  var codedFile = document.getElementById("imgProfilePicture").src;
  var byteString = codedFile.split(",")[1];

  fetch(
    "https://localhost:5001/Artikal/UpdateArtikal/" +
      id +
      "/" +
      naziv +
      "/" +
      cena +
      "/" +
      opis +
      "/" +
      naStanju +
      "/" +
      tipId,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(byteString),
    }
  ).then((p) => {
    if (p.ok) {
      alert("Uspesno ste izmenili proizvod");
      window.location = "product-list.html";
    } else if (p.status == 401) {
      alert("Niste autorizovani!");
      Storage.removeUser();
      Storage.removeToken();
      window.location = "../index.html";
      throw new Error();
    } else {
      window.alert("Nije moguce izmeniti artikal!");
    }
  });
}

function vratiNaListu() {
  window.location = "product-list.html";
}
function izbrisiArtikal(val) {
  fetch("https://localhost:5001/Artikal/ObrisiArtikal/" + val, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then((p) => {
    if (p.ok) {
      window.alert("Uspesno ste obrisali proizvod");
      window.location = "product-list.html";
    } else if (p.status == 401) {
      alert("Niste autorizovani!");
      Storage.removeUser();
      Storage.removeToken();
      window.location = "../index.html";
      throw new Error();
    } else {
      alert("Nije moguce obrisati artikal!");
    }
  });
}

function getTip() {
  fetch("https://localhost:5001/Tip/GetTip").then((res) => {
    res.json().then((data) => {
      if (data.length > 0) {
        var select = document.getElementById("selectTip");

        if (!select) return;
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
tabovi();
Show();
getTip();
prikaziNarukvice();
prikaziKaiseve();
prikaziSatove();
artikalDetaljno();
