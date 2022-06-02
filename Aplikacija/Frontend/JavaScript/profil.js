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

                 var ar=itemData.artikal;

                  temp += "<tr class=tbody>";
                  
                  // temp+="<td>"+ar.artikalId+"</td>";
                  temp+="<td class=tbody>"+ar.naziv+  "</td>";
                  temp+="<td class=tbody>"+ar.cena+  "</td>";
                  temp+="<td class=tbody>"+ar.opis+  "</td>";
                 
                  });
              document.getElementById('satovi').innerHTML = temp;
            }
          }
        )
      }
    )
    }

prikaziSatove();