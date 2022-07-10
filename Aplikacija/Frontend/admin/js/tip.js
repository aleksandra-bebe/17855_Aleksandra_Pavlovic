const token = localStorage.getItem("token");
function prikaziTip() {
  fetch("https://localhost:5001/Tip/GetTip", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": token,
    },
  }).then((p) => {
    if (p.ok) {
      p.json().then((data) => {
        console.log(data);
        if (data.length > 0) {
          var temp = "";
          data.forEach((itemData) => {
            temp += "<tr>";
            temp += "<td>" + itemData.tipId + "</td>";
            temp += "<td>" + itemData.naziv + "</td>";
            temp +=
              "<td><button data-toggle='tooltip' title='Trash' onclick='izbrisiTip(" +
              itemData.tipId +
              ")' class='pd-setting-ed'><i class='fa fa-trash-o' aria-hidden='true'></i> " +
              "</button></td></tr>";
          });
          var data = document.getElementById("data");
          if(!data) return;
          data.innerHTML = temp;
        }
      });
    } else if (p.status == 401) {
      Storage.removeUser();
      Storage.removeToken();
      window.location = "../index.html";
      return false;
      throw new Error();
    }
  });
}
prikaziTip();

function izbrisiTip(val) {
  fetch("https://localhost:5001/Tip/ObrisiTip/" + val, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": token,
    },
  }).then((p) => {
    if (p.ok) {
      window.alert("Uspesno ste obrisali tip");
      window.location = "tip-list.html";
    }
    else if (p.status == 401) {
      alert("Niste autorizovani!");
      Storage.removeUser();
      Storage.removeToken();
      window.location = "../index.html";
      throw new Error();
    } else {
      alert("Nije moguce obrisati tip!");
    }
  });
}


function dodajTip() {
  let naziv = document.getElementById("naziv").value;
  document.getElementById("naziv").value = "";

  if (!naziv) {
    alert("Morate uneti naziv proizvoda!");
    return;
  }

  fetch(
    "https://localhost:5001/Tip/DodajNoviTip/" + naziv,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      }
    }
  ).then((r) => {
    if (r.ok) {
      alert("Tip je uspesno dodat!");
      window.location.reload();
    } else if (r.status == 401) {
      alert("Niste autorizovani!");
      Storage.removeUser();
      Storage.removeToken();
      window.location = "../index.html";
      throw new Error();
    } else {
      alert("Nije moguce dodati tip!");
      r.text().then((errorText) => {
        alert(errorText);
      });
    }
  });
};

