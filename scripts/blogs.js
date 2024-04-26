const existingArticles = [
    "Chichen Itza",
    "Colosseum",
    "Great Wall of China",
    "Machu Picchu",
    "Petra",
    "Taj Mahal"
]

window.addEventListener("DOMContentLoaded", (event) => {
    let form = document.getElementById("search_form"); //retrieve HTML element by its ID
    let input = document.getElementById("search_input");
    form.addEventListener('submit', submitForm); //listen for submission of the search form
    input.addEventListener('keyup', changeSearch); //listen for any input in the search bar
})

function changeSearch(e) {
    e.preventDefault();
    populateRecommendations(e.target.value);
}

function submitForm(e) {
    e.preventDefault();
    let form = new FormData(e.target); //retrieve data from form
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
        urlExists(url).then((exists) => { //carries out once promise is resolved
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
    if(search !== ""){ //Removes recommendation content when search is empty
        let result = existingArticles.filter((value) => { //returns articles that include the search term
            value = value.toLowerCase();
            search = search.toLowerCase();
            search = search.replace(/^the\s/, ""); //allows searches such as "the great wall of china" to still return the page "great wall of china"
            return value.includes(search);
        });
        for(let i = 0; i < result.length; i++) {
            content.push("<li onclick=clickRecommended(this)>" + result[i] + "</li>"); //generate list element for each returned page name
        }
        recommendationsHTML =  "<ul>" + content.join("") + "</ul>";
    }
    recommendationsBox.innerHTML = recommendationsHTML;
}

function urlExists(url) {
    const client = new XMLHttpRequest();
    return new Promise((resolve, reject) => { //as logic is asynchronous, return promise until request is resolved
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