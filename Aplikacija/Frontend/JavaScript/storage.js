class Storage {
    static saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
      return localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
    }
    static saveUser(user){
      localStorage.setItem("user",JSON.stringify(user));
    }
    static getUser(){
      return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      :null;
    }
    static removeUser(){
      localStorage.removeItem("user");
    }
    static removeCart(){
      localStorage.removeItem("cart");
    }
    static getTip(){
      return localStorage.getItem("tip")
      ? JSON.parse(localStorage.getItem("tip"))
      : [];
    }
    static saveTip(tip){
      localStorage.setItem("tip", JSON.stringify(tip));
    }
    static getZaposleni(){
      return localStorage.getItem("zap")
      ? JSON.parse(localStorage.getItem("zap"))
      : [];
    }
    static saveZaposleni(zap){
      localStorage.setItem("zap", JSON.stringify(zap));
    }
  }