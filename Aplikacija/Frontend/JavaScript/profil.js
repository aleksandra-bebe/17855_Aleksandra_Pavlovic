const ul=document.getElementById('users');

function LogOut(){
    let confirmAction = confirm("Da li zelite da se odjavite?");
    if (confirmAction) {
        Storage.removeUser();
        window.location = "index.html";
    }
}


function prikaziSatove() {

    var user=Storage.getUser();
    console.log("user ",user);
    

    fetch("https://localhost:5001/Transakcija/GetTransakcija/"+user.korisnikId).then(
      res => {
        res.json().then(
          data => {
            console.log(data);
            if (data.length > 0) {
              var temp = "";
              data.forEach((itemData) => {
                var ukupnaCena=itemData.cenaPopust*itemData.kolicina;
                temp += "<tr>";
                  temp+="<td>"+   itemData.naziv+  "</td>";
                  // temp+="<td>"+   itemData.cena+   "</td>";
                  temp+="<td>"+   itemData.opis+   "</td>";
                  temp+="<td>"+   itemData.kolicina+ "</td>";
                  temp+="<td>"+ itemData.cenaPopust+ "</td>";
                  temp+="<td>"+ ukupnaCena+"</td>"
                  //  temp+="<td>"+  ar + "</td>";
                 
                  });
              document.getElementById('satovi').innerHTML = temp;
            }
          }
        )
      }
    )
    }

prikaziSatove();