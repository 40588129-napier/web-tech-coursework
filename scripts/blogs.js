const client = new XMLHttpRequest();
let ready = 0;
window.addEventListener("DOMContentLoaded", (event) => {
    let form = document.getElementById("article_search");

    function submitForm(e){
        e.preventDefault();
        let form = new FormData(e.target);
        let search = form.get("search");
        let url = window.location.href;
        let split = url.split("/");
        split.pop();
        url = split.join('/') + "/posts/" + search + ".html";
        console.log(urlExists(url));
        //window.location.assign(url);
    }

    form.addEventListener('submit', submitForm);
})

client.onreadystatechange = (e) => {
    ready = client.readyState;
}

function urlExists(url){
    let result = false;
    client.open("GET", url);
    client.send();
    while(client.readyState !== 4){
        console.log("awaiting request")
    }
    if(client.status === 200){
        result = true;
    }
    return result;
}