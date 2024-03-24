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
        urlExists(url).then((result) => {
            console.log(result)
        })
        //window.location.assign(url);
    }

    form.addEventListener('submit', submitForm);
})

function urlExists(url){
    const client = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        client.open("GET", url);
        client.send();
        client.onreadystatechange = (e) => {
            if(client.readyState === 4){
                console.log(client.status == 200)
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