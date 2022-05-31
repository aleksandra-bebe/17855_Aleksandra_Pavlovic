function LogOut(){
    let confirmAction = confirm("Da li zelite da se odjavite?");
    if (confirmAction) {
        Storage.removeUser();
        window.location = "index.html";
    }
}

