var username = document.getElementById("pUsername");
var email = document.getElementById("pUserEmail");
var ime=document.getElementById("pIme");
var prezime=document.getElementById("pPrezime");
var brojKupovina=document.getElementById("pBrojKupovina");
var naziv=document.getElementById("Naziv");
var cena = document.getElementById("Cena");
var opis= document.getElementById("Opis");
var kolicina= document.getElementById("Kolicina");
 let list=document.getElementById("proizvodi");


window.onload=function pageOnLoad(){
    var user=Storage.getUser();
    console.log("user", user);
    var cart= Storage.getCart();
    console.log("cart",cart);
    if(!user){
        window.location="./index.html";
    }
    else{

        ime.innerHTML=user.ime;
        prezime.innerHTML=user.prezime;
        email.innerHTML=user.email;
        brojKupovina.innerHTML=user.brojOnlineKupovina;
    }
   
      if(cart.length>0){
          var temp="";
     cart.forEach((itemData) => {
        var ar=itemData.artikal;
        temp += "<tr>";
          temp+="<td>"+   itemData.naziv+  "</td>";
          temp+="<td>"+   itemData.cena+   "</td>";
          temp+="<td>"+   itemData.opis+   "</td>";
          temp+="<td>" + itemData.amount+ "</td>";
            
        });
        document.getElementById('proizvodi').innerHTML= temp;
    }  
}

function poruci(){
    var user = Storage.getUser();
    console.log("user", user);
    let cart = Storage.getCart();
    console.log("cart", cart);
    var adresa=document.getElementById("adresaDostave").value;
    cart.forEach((product) => {
        var kol=product.amount;
      fetch("https://localhost:5001/Transakcija/PostTransakcija/" + user.korisnikId + "/" + product.artikalId + "/" + kol + "/" + adresa, {method: 'POST'}).then(p => {
        if (!p.ok) {
          p.json().then(data => {
            if (data) {
             Storage.getUser();
          }
         });
        }
        else
        {
          Storage.removeCart();
          window.location='./profil.html';
        }
        });
      });
      alert("Proizvod je porucen!");
}