//uzimanje vrednosti
const cartBtn = document.querySelector(".cart-btn");
const userBtn = document.querySelector(".user-btn");
const registrationBtn = document.querySelector(".registration-btn");
const closeCartBtn = document.querySelector(".close-cart");
const closeUserMenuBtn = document.querySelector(".close-user-menu");
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

// uzimanje proizvoda
class Products {
  async getProducts(ui) {
    try {
      fetch("https://localhost:5001/Artikal/GetNajprodavanije").then(p => {
        p.json().then(data => {
          Storage.saveProducts(data);
          ui.displayProducts(data);
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
  if (username == "admin" && password == "admin") {
    alert("Uspesno ste se ulogovali");
    window.location = "/admin/index.html";
    return false;
  }
  else {
    attempt--;
    alert("Imate jos " + attempt + " pokusaja;");
    if (attempt == 0) {
      document.getElementById("username").disabled = true;
      document.getElementById("password").disabled = true;
      document.getElementById("submit").disabled = true;
      return false;
    }
  }
}
// prikazivanje proizvoda
class UI {

  displayProducts(products) {
    products.forEach((product) => {
      productsDOM.innerHTML += "<!-- single product-->"
      var article = document.createElement("div");
      article.className = "product";
      var divImg = document.createElement("div");
      divImg.className = "img-container";
      article.appendChild(divImg);
      var img = document.createElement("img");
      img.src = "images/sat1.png";
      img.alt = "product";
      img.className = "product-img";
      divImg.appendChild(img);
      var button = document.createElement("button");
      button.className = "bag-btn";
      button.setAttribute("data-id",product.artikalId);
      var icon = document.createElement("i");
      icon.classList.add("fas");
      icon.classList.add("fa-shopping-cart");
      button.appendChild(icon)
      button.innerHTML += "Dodaj u korpu";
      divImg.appendChild(button);
      var h3 = document.createElement("h3");
      h3.innerHTML = product.naziv;
      article.appendChild(h3);
      var h4 = document.createElement("h4");
      h4.innerHTML = "$"+product.cena;
      article.appendChild(h4);
      productsDOM.appendChild(article);
      productsDOM.innerHTML += "<!-- end single product-->"
      //Ovo nece da radi!!!
      article.onclick = (event) => {alert("click")};
    });
    this.getBagButtons();
    this.cartLogic();
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "Vec je u korpi";
        button.disabled = true;
      }
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        event.target.innerText = "Vec je u korpi";
        event.target.disabled = true;
        // uzmi proizvod od proizvoda
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        // dodaj u korpu
        cart = [...cart, cartItem];
        // sacuvaj korpu u local storage
        Storage.saveCart(cart);
        // postavimo vrednost korpi
        this.setCartValues(cart);
        // prikazi proizvod korpe
        this.addCartItem(cartItem);
        // prikazi korpu
        this.showCart();
      });
    });
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
    userOverlay.classList.add("transparentBcg");
    userDOM.classList.add("showUser");
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

  showArticlePage(productId) {
    console.log("show article");
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
    console.log(ui);
    ui.getBagButtons();
    articleAddToChart.innerHTML = `<i class="fas fa-shopping-cart"></i> DODAJ U KORPU`;
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
}

// localno skladiste
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find(product => product.artikalId === Number(id));
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

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

