//at start:
const default_note = {
    title: "default",
    content: "default",
    color: "lightblue",
    pinned: false,
    creationDate: "17.05.2020",
    tag: "default"
}

//save default note: 
/*
let saved_default_note = GetFromLocalStorage(default_note.title)
if(saved_default_note == undefined){
    SaveToLocalStorage( default_note.title, default_note)
    //save key to find it later:
    let notes_titles = GetFromLocalStorage("saved_notes_titles")
    if(notes_titles == undefined){
        notes_titles = [default_note.title]
    }
    else{
        notes_titles.push(default_note.title)
    }
    SaveToLocalStorage("saved_notes_titles", notes_titles)
}
*/

function SaveToLocalStorage(key, item){
    const item_stringified = JSON.stringify(item)
    localStorage.setItem(key,  item_stringified );
}

function GetFromLocalStorage(key){
    const item_stringified = localStorage.getItem(key)
    const item = JSON.parse(item_stringified)
    return item
}

const submit_note = document.getElementById("submit_button");

submit_note.addEventListener("click", ()=>{

    const note_container = document.getElementById("note_container")
    const n_title = document.getElementById("title").value
    const n_content = document.getElementById("content").value
    const n_color = document.getElementById("color").value
    const pinned_checkbox = document.getElementById("pinned")
    let n_pinned = false
    if(pinned_checkbox.checked){
         n_pinned = true
    }

    const new_note = {
        title: n_title,
        content: n_content,
        color: n_color,
        pinned: n_pinned,
        creationDate: new Date(),
        tag: "asfas"
    }
    
    SaveToLocalStorage(n_title, new_note)

    let notes_titles = GetFromLocalStorage("saved_notes_titles")
    let titles_array = notes_titles
    titles_array.push(n_title)
    SaveToLocalStorage("saved_notes_titles", titles_array)
})

const get_note = document.getElementById("get_button");

get_note.addEventListener("click", ()=>{
    let notes_titles = GetFromLocalStorage("saved_notes_titles")
    let titles_array = notes_titles
    CleanRenderSpace()
    titles_unpinned_array =[]
    titles_array.forEach(title => {
        retrieved_note = GetFromLocalStorage(title)
        if(retrieved_note.pinned == true){
            RenderNote(retrieved_note)
        }
        else{
            titles_unpinned_array.push(title)
        }
    });
    titles_unpinned_array.forEach(title => {
        retrieved_note = GetFromLocalStorage(title)
        RenderNote(retrieved_note)
    });
})

const note = {
    title: "title",
    content: "asfafdadsfdsafa",
    color: "blue",
    pinned: true,
    creationDate: "17.05.2020",
    tag: "asfas"
}

let saved_notes = document.getElementById("saved_notes")
function CleanRenderSpace(){
    saved_notes.innerHTML = ""
}
function RenderNote(object){
    var saved_note = document.createElement("div")
    saved_note.className = "saved_note"
    saved_note.innerHTML += `<div class="note" style="background-color: ${object.color};" > <h>${object.title}</h> <br> ${object.content} <br> ${object.creationDate}</div>`

    var delete_button = document.createElement("button");
    delete_button.setAttribute("class","delete_button");
    delete_button.setAttribute("title", object.title);
    delete_button.innerText = "X";
    delete_button.addEventListener("click", removeItemFromMemory);
    
    saved_note.appendChild(delete_button);

    saved_notes.appendChild(saved_note)
}

function removeItemFromMemory(){
    DeleteNote(this.attributes.title.value)
    this.parentNode.remove();
}

async function DeleteNote(note_title){
    let saved_titles = GetFromLocalStorage("saved_notes_titles");
    if(saved_titles == null){
        return 0;
    }
    let new_saved_titles = [];
    for (let i = 0; i < saved_titles.length; i++) {
        const title = saved_titles[i];
        if (title != note_title) {
            new_saved_titles.push(title);
        }
    }
    SaveToLocalStorage("saved_notes_titles", new_saved_titles);
    localStorage.removeItem(note_title);
}