window.addEventListener("DOMContentLoaded", (event) => {
    let form = document.getElementById("itinerary_form"); //retrieve HTML element by its ID
    form.addEventListener('submit', submitItinerary); //listen for submission of the search form
})

function submitItinerary(e) {
    e.preventDefault();
    let form = new FormData(e.target); //retrieve data from form
    let itinerary = form.get("itinerary"); //get value entered in input
    appendTable(itinerary);
}

function appendTable(itinerary) {
    let table;
    if(document.getElementById("itinerary_table").getElementsByTagName("tbody").length > 0){
        table = document.getElementById("itinerary_table").getElementsByTagName("tbody")[0];
    }
    else{
        let mainTable = document.getElementById("itinerary_table");
        let body = document.createElement("tbody");
        table = body;
        mainTable.appendChild(body);
    }
    
    let id = document.getElementById("itinerary_table").rows.length + 1;
    let row = table.insertRow();
    let removeButton = "<button onclick=\"removeRow(" + id + ")\" type=\"submit\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"2em\" height=\"2em\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512m-81-337c9.4-9.4 24.6-9.4 33.9 0l47 47l47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47l47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47l-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47l-47-47c-9.4-9.4-9.4-24.6 0-33.9\"/></svg></button>"
    let rowContent = {
        "id": id,
        "details": itinerary,
        "remove": removeButton
    }
    let rowKeys = Object.keys(rowContent);
    for(let i = 0; i < rowKeys.length; i++){
        let cell = row.insertCell();
        console.log(typeof(rowContent[rowKeys[i]]))
        if(typeof(rowContent[rowKeys[i]]) === "string" && rowContent[rowKeys[i]].includes("<button")){
            cell.innerHTML = removeButton;
        }
        else{
            let text = document.createTextNode(rowContent[rowKeys[i]]);
            cell.appendChild(text);
        }
        cell.classList.add("itinerary_" + rowKeys[i]);
    }
}

function removeRow(index) {
    let table = document.getElementById("itinerary_table")
    let rows = table.getElementsByTagName("tr")
    for(let i = 0; i < rows.length; i++) {
        let idCell = rows[i].getElementsByTagName("td")[0]
        console.log(idCell.innerHTML)
        console.log(index)
        if(idCell.innerHTML == index) {
            table.deleteRow(i)
        }
    }
}