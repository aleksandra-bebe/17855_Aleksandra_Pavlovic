function AuthorizeUser() {
    var token = localStorage.getItem("token");
    fetch("https://localhost:5001/Authorization/AuthorizeUser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
    }).then(r => {
        if (r.status == 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location = "../../index.html";
        }
    });
}