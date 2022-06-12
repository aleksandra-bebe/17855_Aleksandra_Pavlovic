function posaljiMail(){
    var user = Storage.getUser();
    if(!user){
        alert("Morate biti ulogovani da bi ste poslali poruku");
        return;
    }
    var subject = document.getElementById("contactSubject").value;
    var body = document.getElementById("contactBody").value;
    window.location.href = "mailto:epelivanovic@gmail.com?subject=" + subject + "&body=" + body;
}