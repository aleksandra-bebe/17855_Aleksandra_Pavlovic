function prikaziTipove() {
  fetch("https://localhost:5001/Tip/GetTip").then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (data.length > 0) {
        var temp = "";
        data.forEach((itemData) => {
          temp += "<tr>";
          temp += "<td>" + itemData.tipId + "</td>";
          temp += "<td>" + itemData.naziv + "</td></tr>";
        });
        document.getElementById("tip").innerHTML = temp;
      }
    });
  });
}

function getTip() {
  fetch("https://localhost:5001/Tip/GetTip").then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (data.length > 0) {
        // var select = document.getElementById("selectTip");
        // for (index in data) {
        //   select.options[select.options.length] = new Option(
        //     data[index],
        //     naziv
        //   );
        // }

        var select = document.getElementById("selectTip");
         

        for (var i = 0; i < data.length; i++) {
          var option = document.createElement("OPTION"),
            txt = document.createTextNode(data[i].naziv);
          option.appendChild(txt);
          option.setAttribute("value", data[i].tipId);
          select.insertBefore(option, select.lastChild);
        }

        // var temp = "";
        // data.forEach((itemData) => {
        //   // temp += "<select ";
        //   temp += "value='" + itemData.tipId + "'>"+ itemData.naziv;
        // });
        // document.getElementById('selectTip').innerHTML = temp;
      }
    });
  });
}
getTip();
prikaziTipove();

// function dodajTip() {
//   let naziv = document.getElementById("naziv").value;
//   document.getElementById("naziv").value = "";

//   if (!naziv) {
//     alert("Morate uneti naziv tipa!");
//     return;
//   }

//   fetch("https://localhost:5001/Tip/DodajNoviTip/" + naziv, {
//     method: "POST",
//   }).then((p) => {
//     if (!p.ok) {
//       window.alert("Nije moguce dodati tip!");
//     }
//   });
//}
