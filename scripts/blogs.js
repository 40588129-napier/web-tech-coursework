window.addEventListener("DOMContentLoaded", (event) => {
    let form = document.getElementById("article_search");
    form.addEventListener('submit', submitForm);
})

function submitForm(e){
    e.preventDefault();
    let form = new FormData(e.target);
    let search = form.get("search");
    let url = window.location.href;
    let split = url.split("/");
    split.pop();
    url = split.join('/') + "/posts/" + search + ".html";
    let exists = false;
    urlExists(url).then((exists) => {
        console.log(exists)
        if(exists){
            window.location.assign(url);
        }   
    })
}

function urlExists(url){
    const client = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        client.open("GET", url);
        client.send();
        client.onreadystatechange = (e) => {
            if(client.readyState === 4){
                if(client.status == 200){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            }
        }
    })
}