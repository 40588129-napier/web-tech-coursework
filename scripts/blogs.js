const existingArticles = [
    "Chichen Itza",
    "Colosseum",
    "Great Wall of China",
    "Machu Picchu",
    "Petra",
    "Taj Mahal"
]

window.addEventListener("DOMContentLoaded", (event) => {
    let form = document.getElementById("search_form");
    let input = document.getElementById("search_input");
    form.addEventListener('submit', submitForm);
    input.addEventListener('keyup', changeSearch);
})

function changeSearch(e) {
    e.preventDefault();
    populateRecommendations(e.target.value);
}

function submitForm(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    let search = form.get("search"); //get value entered in input
    pageSearch(search);
}

function clickRecommended(list) {
    pageSearch(list.innerHTML);
}

function pageSearch(search) {
    search = search.toLowerCase(); //set search value to lowercase
    search = search.replaceAll(" ","_"); //replace spaces with underline
    let url = window.location.href; //get current url
    let split = url.split("/"); //split url
    split.pop(); //remove last index, i.e. the file name
    url = split.join('/') + "/posts/" + search + ".html"; //rejoin url and add new file name
    if(url.includes("https://")){ //allow local testing by only checking url if https
        urlExists(url).then((exists) => {
            console.log(exists)
            if(exists) { //redirect user if url exists
                window.location.assign(url);
            }   
        })
    }
    else{
        window.location.assign(url);
    }
}

function populateRecommendations(search) {
    let recommendationsBox = document.getElementById("recommended_search");
    let content = [];
    let recommendationsHTML = "";
    if(search !== ""){
        let result = existingArticles.filter((value) => {
            value = value.toLowerCase();
            search = search.toLowerCase();
            search = search.replace(/^the\s/, "");
            return value.includes(search);
        });
        for(let i = 0; i < result.length; i++) {
            content.push("<li onclick=clickRecommended(this)>" + result[i] + "</li>");
        }
        recommendationsHTML =  "<ul>" + content.join("") + "</ul>";
    }
    recommendationsBox.innerHTML = recommendationsHTML;
}

function urlExists(url) {
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