
//uzimanje vrednosti
const cartBtn = document.querySelector(".cart-btn");
const userBtn = document.querySelector(".user-btn");
const registrationBtn = document.querySelector(".registration-btn");
const closeCartBtn = document.querySelector(".close-cart");
const closeUserMenuBtn = document.querySelector(".close-user-menu");
const closeProfileBtn = document.querySelector(".close-profile-page");
const closeRegistrationMenuBtn = document.querySelector(".close-registration-menu");
const closeArticlePageBtn = document.querySelector(".close-article-page");
const clearCartBtn = document.querySelector(".clear-cart");
const loginBtn = document.querySelector(".login-btn");
const cartDOM = document.querySelector(".cart");
const userDOM = document.querySelector(".user");
const registrationDOM = document.querySelector(".registration");
const articleDOM = document.querySelector(".article");
const cartOverlay = document.querySelector(".cart-overlay");
const userOverlay = document.querySelector(".user-menu-overlay");
const registrationOverlay = document.querySelector(".registration-overlay");
const articleOverlay = document.querySelector(".article-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
const userMenuContent = document.querySelector(".user-menu-content");
const profileOverlay = document.querySelector(".profile-overlay");
const profileDOM = document.querySelector(".profile");

// meni togler
const selectElement = function (element) {
  return document.querySelector(element);
};

let menuToggler = selectElement(".menu-toggle");
let body = selectElement("body");

menuToggler.addEventListener("click", function () {
  body.classList.toggle("open");
});

// korpa
let cart = [];
// buttons
let buttonsDOM = [];

let user = [];

let ui_global;
// uzimanje proizvoda
class Products {
  async getProducts(ui) {
    try {
      fetch("https://localhost:5001/Artikal/GetNajprodavanije").then(p => {
        p.json().then(data => {
          Storage.saveProducts(data);
          ui.displayProducts(data, ui);
        });
      });
    }
    catch (error) {
      console.log(error);
    }
  }
}

function StarRating(host, prosecnaOcena) {
  for (let i = 1; i <= 5; i++) {
    var star = document.createElement("span");
    star.classList.add("fa");
    star.classList.add("fa-star");
    if (prosecnaOcena + 0.5 >= i) star.classList.add("checkedStar");
    host.appendChild(star);
  }
  host.innerHTML += " " + prosecnaOcena;
}

function RateProduct(host) {
  for (let i = 1; i <= 5; i++) {
    var star = document.createElement("li");
    var span = document.createElement("i");
    star.classList.add("fa");
    star.classList.add("fa-star");
    star.title = "Rate " + (6 - i);
    star.onclick = (e) => { alert("ocena: " + (6 - i)); };
    host.appendChild(star);
  }
}
// Prikazivanje svih komentara za dati artikal
function ShowArticleComments(host, articleId) {
  host.innerHTML = "";
  for (let index = 0; index < 5; index++) {
    var div = document.createElement("div");
    div.innerHTML = "komentar" + index;
    host.appendChild(div);
  }
}
var attempt = 3;
function login() {
  var username = document.getElementById("loginUsername").value;
  var password = document.getElementById("loginPassword").value;
  var errorLabel = document.getElementById("loginErrorText");
  if (!username || !password) {
    errorLabel.innerHTML = "Unesite korisničko ime i šifru";
    return;
  }
  if (username == "admin" && password == "admin") {
    alert("Uspesno ste se ulogovali kao admin");
    //window.location = "/admin/index.html";
    window.location = "./admin/index.html";
    return false;
  }
  else {
    try {
      fetch("https://localhost:5001/Korisnik/UlogujSe/" + username + "/" + password).then(p => {
        if (p.ok) {
          p.json().then(data => {
            if (data) {
              alert("Uspesno ste se ulogovali");
              Storage.saveUser(data);
              ProfilePage();
            }
          });
        }
        else {
          p.text().then(errorText => { errorLabel.innerHTML = errorText });
          setTimeout(() => {
            errorLabel.innerHTML = ""
          }, 7000);
        }
      });
    }
    catch (error) {
      console.log(error);
    }
  }
}

function ProfilePage() {
  userOverlay.classList.remove("transparentBcg");
  userDOM.classList.remove("showUser");
  registrationOverlay.classList.remove("transparentBcg");
  registrationOverlay.classList.remove("showUser");
  profileOverlay.classList.add("transparentBcg");
  profileDOM.classList.add("showUser");
  body.style.overflowY = "hidden";

  var user = Storage.getUser();

  profileInformation = document.querySelector(".profileInformation");
  profileInformation.innerHTML = "";
  var basicInormation = document.createElement("div");
  basicInormation.className = "basicInfor";
  profileInformation.appendChild(basicInormation);

  var header = document.createElement("h2");
  header.classList.add("user-menu-header");
  header.innerHTML = user.ime + " " + user.prezime;
  basicInormation.appendChild(header);

  const em = document.createElement("label");
  em.innerHTML = user.email;
  basicInormation.appendChild(em);

  let dugme = document.createElement("button");
  dugme.innerHTML = "Moj profil";
  dugme.className = "btnProfil";
  basicInormation.appendChild(dugme);
  dugme.onclick = (event) => {
    window.location = "profil.html";
  }
  let dugme2 = document.createElement("button");
  dugme2.innerHTML = "Podesavanja";
  dugme2.className = "btnPodesavanja";
  basicInormation.appendChild(dugme2);
  dugme2.onclick = (event) => {

    window.location = "podesavanja.html";
  }
  let dugme3 = document.createElement("button");
  dugme3.innerHTML = "Odjavi se";
  dugme3.className = "btnOdjavi";
  basicInormation.appendChild(dugme3);
  dugme3.onclick = (event) => {
    let confirmAction = confirm("Da li zelite da se odjavite?");
    if (confirmAction) {
      Storage.removeUser();
      window.location = "index.html";
    }
  }
}

// prikazivanje proizvoda
function showArticlePage(productId) {
  userOverlay.classList.remove("transparentBcg");
  userDOM.classList.remove("showUser");
  registrationOverlay.classList.remove("transparentBcg");
  registrationOverlay.classList.remove("showUser");
  articleOverlay.classList.add("transparentBcg");
  articleDOM.classList.add("showUser");
  body.style.overflowY = "hidden";

  articleInformation = document.querySelector(".articleInformation");
  var product = Storage.getProduct(productId);
  var basicInormation = document.createElement("div");
  articleInformation.appendChild(basicInormation);

  var header = document.createElement("h2");
  header.classList.add("user-menu-header");
  header.classList.add("article-header");
  header.innerHTML = product.naziv;
  basicInormation.appendChild(header);

  var articleImg = document.createElement("img");
  articleImg.classList.add("product-img");
  articleImg.classList.add("article-img");
  articleImg.src = product.image;
  basicInormation.appendChild(articleImg);

  var articleDescription = document.createElement("p");
  articleDescription.className = "articleDescription";
  articleDescription.innerHTML = "Opis proizvoda";
  basicInormation.appendChild(articleDescription);

  var articleRating = document.createElement("div");
  prosecnaOcena = 4.4;
  StarRating(articleRating, prosecnaOcena);
  articleRating.className = "articleRating";
  basicInormation.appendChild(articleRating);

  var articlePrice = document.createElement("div");
  articlePrice.className = "articlePrice";
  articlePrice.innerHTML = "$" + product.cena;
  basicInormation.appendChild(articlePrice);

  var articleRate = document.createElement("div");
  articleRate.className = "rate-article";
  RateProduct(articleRate);
  var h3 = document.createElement("h3");
  h3.innerHTML = "Ocenite proizvod";
  h3.style = "float:right;width:35%;margin-top:40px;";
  basicInormation.appendChild(h3);
  basicInormation.appendChild(articleRate);

  var newCommentDiv = document.createElement("div");
  newCommentDiv.className = "newCommentDiv";
  var newComment = document.createElement("input");
  newComment.placeholder = "Unesite vas komentar...";
  newComment.type = "text";
  newComment.className = "input";
  var unesiteKomentar = document.createElement("h3");
  unesiteKomentar.innerHTML = "Unesite komentar";
  newCommentDiv.appendChild(unesiteKomentar);
  newCommentDiv.appendChild(newComment);

  var commentSendBtn = document.createElement("button");
  commentSendBtn.classList.add("commentSendBtn");
  commentSendBtn.innerHTML = `POSALJI`;
  newCommentDiv.appendChild(commentSendBtn);
  basicInormation.appendChild(newCommentDiv);

  var articleAddToChart = document.createElement("button");
  articleAddToChart.classList.add("bag-btn");
  articleAddToChart.classList.add("articleAddToChart");
  articleAddToChart.setAttribute('data-id', productId);
  articleAddToChart.innerHTML = `<i class="fas fa-shopping-cart"></i> DODAJ U KORPU`;
  let inCart = cart.find((item) => item.artikalId == productId);
  if (inCart) {
    articleAddToChart.innerText = `Vec je u korpi`;
    articleAddToChart.disabled = true;
  }
  articleAddToChart.onclick = (event) => {
    event.stopPropagation();
    event.target.innerText = "Vec je u korpi";
    event.target.disabled = true;
    // uzmi proizvod od proizvoda
    let cartItem = { ...Storage.getProduct(productId), amount: 1 };
    // dodaj u korpu
    cart = [...cart, cartItem];
    // sacuvaj korpu u local storage
    Storage.saveCart(cart);
    // postavimo vrednost korpi
    ui_global.setCartValues(cart);
    // prikazi proizvod korpe
    ui_global.addCartItem(cartItem);
    // prikazi korpu
    ui_global.showCart();
  }

  basicInormation.appendChild(articleAddToChart);

  // Sekcija za komentare
  var commentInformation = document.createElement("div");
  var articleComments = document.createElement("div");
  articleComments.className = "articleComments";
  ShowArticleComments(articleComments, productId);
  var komentari = document.createElement("h3");
  komentari.style = "margin-top:25px;";
  komentari.innerHTML = "Komentari korisnika";
  commentInformation.appendChild(komentari);
  commentInformation.appendChild(articleComments);

  articleInformation.appendChild(commentInformation);
}

class UI {

  displayProducts(products) {
    let result = "";
    ui_global = this;
    products.forEach((product) => {
      result += `
           <!-- single product-->
        <article class="product" onclick="showArticlePage('${product.artikalId}')">
          <div class="img-container">
            <img
              src="${product.image}"
              alt="product"
              class="product-img"
            />
            <button class="bag-btn" data-id=${product.artikalId}>
              <i class="fas fa-shopping-cart"></i>
              Dodaj u korpu
            </button>
          </div>
          <h3>${product.naziv}</h3>
          <h4>$${product.cena}</h4>
        </article>
        <!-- end single product-->
          `;
    });
    productsDOM.innerHTML = result;
    this.getBagButtons();
    this.cartLogic();
  }

  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.cena * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }

  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<img src=${item.image} alt="product" />
            <div>
              <h4>${item.naziv}</h4>
              <h5>$${item.cena}</h5>
              <span class="remove-item" data-id=${item.artikalId}>Ukloni</span>
            </div>
            <div>
              <i class="fas fa-chevron-up" data-id=${item.artikalId}></i>
              <p class="item-amount">${item.amount}</p>
              <i class="fas fa-chevron-down" data-id=${item.artikalId}></i>
            </div>`;
    cartContent.appendChild(div);
  }

  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }

  showUserMenu() {
    var userLogged = Storage.getUser();
    if (userLogged) {
      ProfilePage();
    }
    else {
      userOverlay.classList.add("transparentBcg");
      userDOM.classList.add("showUser");
    }
  }

  showRegistrationPage() {
    userOverlay.classList.remove("transparentBcg");
    userDOM.classList.remove("showUser");
    registrationOverlay.classList.add("transparentBcg");
    registrationDOM.classList.add("showUser");
  }

  hideRegistrationPage() {
    registrationOverlay.classList.remove("transparentBcg");
    registrationDOM.classList.remove("showUser");
  }

  hideArticlePage() {
    articleOverlay.classList.remove("transparentBcg");
    articleDOM.classList.remove("showUser");
    body.style.overflowY = "scroll";

    var articleInformation = document.querySelector(".articleInformation");
    articleInformation.innerHTML = "";
    ui_global.getBagButtons();
  }

  showProfilePage() {
    profileOverlay.classList.add("transparentBcg");
    profileDOM.classList.add("showUser");

  }
  hideProfilePage() {
    profileOverlay.classList.remove("transparentBcg");
    profileDOM.classList.remove("showUser");
  }

  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    console.log("buttons:", buttons.length);
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.artikalId == id);
      if (inCart) {
        button.innerText = "Vec je u korpi";
        button.disabled = true;
      }
      else {
        if (button.getAttribute('listener') !== 'true') {
          button.setAttribute('listener', 'true');
          button.addEventListener("click", (event) => {
            event.stopPropagation();
            event.target.innerText = "Vec je u korpi";
            event.target.disabled = true;
            // uzmi proizvod od proizvoda
            let cartItem = { ...Storage.getProduct(id), amount: 1 };
            // dodaj u korpu
            cart = [...cart, cartItem];
            console.log("cart:", cart);
            // sacuvaj korpu u local storage
            Storage.saveCart(cart);
            // postavimo vrednost korpi
            this.setCartValues(cart);
            // prikazi proizvod korpe
            this.addCartItem(cartItem);
            // prikazi korpu
            this.showCart();
          });
        }
      }
      });
  }

  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);
    closeUserMenuBtn.addEventListener("click", this.hideUserMenu);
    userBtn.addEventListener("click", this.showUserMenu);
    registrationBtn.addEventListener("click", this.showRegistrationPage);
    closeRegistrationMenuBtn.addEventListener("click", this.hideRegistrationPage);
    closeArticlePageBtn.addEventListener("click", this.hideArticlePage);
    closeProfileBtn.addEventListener("click", this.hideProfilePage);
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }
  hideUserMenu() {
    userOverlay.classList.remove("transparentBcg");
    userDOM.classList.remove("showUser");
  }
  cartLogic() {
    // isprazni korpu
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });
    //funkcionalnost korpe
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.artikalId == id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.artikalId == id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
      }
    });
  }
  clearCart() {
    let cartItems = cart.map((item) => item.artikalId);
    cartItems.forEach((id) => this.removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart();
  }
  removeItem(id) {
    cart = cart.filter((item) => item.artikalId != id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>Dodaj u korpu`;
  }
  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id == id);
  }
}

// localno skladiste


document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  // setup app
  ui.setupAPP();
  // uzmi sve proizvode
  products
    .getProducts(ui)
    .then(() => {

    });
});

function PROVERA() {
  alert("Forma je uspesno poslata");
}
// // //validacija formew
// function PROVERA() {
//   let name = document.forms["RegForm"]["name"];
//   let prezime = document.forms["RegForm"]["prezime"];
//   let telefon = document.forms["RegForm"]["telefon"];
//   let naslov = document.forms["RegForm"]["naslov"];
//   let subject = document.forms["RegForm"]["subject"];
//   let nijeBroj = /^\d+$/;
//   let space = /\W+/g;
//   let nameproba = /^\S*$/u;
//   let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   let telefon = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
//   if (name.value.match(nameproba)) {
//     window.alert("Polje ime ne sme da sazdrzi razmak izmedju slova");
//     name.focus();
//     return false;
//   }

//   if (prezime.value.match(space)) {
//     window.alert("Polje prezime ne sme da sazdrzi razmak izmedju slova.");
//     prezime.focus();
//     return false;
//   }

//   if (!telefon.value.match(telefon)) {
//     window.alert("Molimo vas unesite broj telefona.");
//     telefon.focus();
//     return false;
//   }

//   if (naslov.value == "") {
//     window.alert("Molimo vas unesite naslov poruke.");
//     naslov.focus();
//     return false;
//   }

//   if (subject.value == "") {
//     window.alert("Morate uneti poruku");
//     subject.focus();
//     return false;
//   }
//   return window.alert("Uspesno ste poslali poruku, bice vam odgovoreno u najkracem roku");;
// }

