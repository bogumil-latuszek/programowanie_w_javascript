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

function AddNote(title, content, background_color, pinned, creation_date){
    const new_note = {
        title: title,
        content: content,
        color: background_color,
        pinned: pinned,
        creationDate: creation_date,
        tag: "asfas"
    }
    
    let notes_content = GetFromLocalStorage("saved_notes_content")
    if (notes_content == null) {
        notes_content = []
    }
    notes_content.push(new_note)
    SaveToLocalStorage("saved_notes_content", notes_content)
}
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

    AddNote(n_title, n_content, n_color, n_pinned, new Date())
})

const get_notes = document.getElementById("get_button");

function GetAllNotes(){

    let notes = GetFromLocalStorage("saved_notes_content")
    if (notes == null) {
        return;
    }
    ClearRenderSpace()
    notes_unpinned_array =[]
    notes.forEach(note => {
        if(note.pinned == true){
            RenderNote(note)
        }
        else{
            notes_unpinned_array.push(note)
        }
    });
    notes_unpinned_array.forEach(note => {
        RenderNote(note)
    });
    
}
get_notes.addEventListener("click", ()=>{
   GetAllNotes()
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
function ClearRenderSpace(){
    saved_notes.innerHTML = ""
}
function RenderNote(object){

    let saved_note = document.createElement("div")
    saved_note.className = "saved_note"

    let edit_button = document.createElement("button");
    edit_button.setAttribute("class","ge_edit");
    edit_button.setAttribute("title", object.title);
    edit_button.setAttribute("creationdate", object.creationDate);
    edit_button.innerText = "Change";
    edit_button.addEventListener("click", EditItem);

    let delete_button = document.createElement("button");
    delete_button.setAttribute("class","ge_delete");
    delete_button.setAttribute("title", object.title);
    delete_button.setAttribute("creationdate", object.creationDate);
    delete_button.innerText = "X";
    delete_button.addEventListener("click", removeItemFromMemory);

    let title_box = document.createElement("Textarea")
    title_box.setAttribute("class", "ge_title")
    title_box.innerText = object.title
    
    let date_box = document.createElement("Textarea")
    date_box.setAttribute("class", "ge_date")
    date_box.innerText = object.creationDate

    grid_cont = document.createElement("div")
    grid_cont.setAttribute("class", "grid_container")
    grid_cont.appendChild(delete_button)
    grid_cont.appendChild(edit_button)
    grid_cont.appendChild(title_box)
    grid_cont.appendChild(date_box)

    saved_note.setAttribute("pinned", object.pinned)
    saved_note.setAttribute("color_value", object.color)
    saved_note.setAttribute("style", `background-color: ${object.color}`)
    
    content_box = document.createElement("Textarea")
    content_box.setAttribute("class", "content_box")
    content_box.innerText = object.content
    //content_box.setAttribute("style", `height: ${content_box.scrollHeight}px`)

    saved_note.appendChild(grid_cont);
    saved_note.appendChild(content_box);
    saved_notes.appendChild(saved_note)
    
}

function removeItemFromMemory(){
    DeleteNote(this.attributes.creationdate.value)
    this.parentNode.parentNode.remove();
}

async function DeleteNote(note_date){
    let saved_notes = GetFromLocalStorage("saved_notes_content");
    if(saved_notes == null){
        return 0;
    }
    let new_saved_notes = [];
    for (let i = 0; i < saved_notes.length; i++) {
        const date = saved_notes[i].creationDate;
        if (date != note_date) {
            new_saved_notes.push(saved_notes[i]);
        }
    }
    SaveToLocalStorage("saved_notes_content", new_saved_notes);
}

function EditItem(){
    let title = this.attributes.title.value
    console.log(title)
    let grid_cont =  this.parentElement
    console.log(grid_cont)
    let properties = grid_cont.children
    let new_title = properties[2].value
    let new_date = properties[3].value
    console.log(new_title + new_date)
    let note = grid_cont.parentElement
    let content = note.children[1].value
    console.log(content)
    let bcgr_color = note.attributes.color_value.value
    let pinned = note.attributes.pinned.value
    if (pinned == "true") {
        pinned = true;
    }
    else{
        pinned = false;
    }
    DeleteNote(this.attributes.creationdate.value)
    AddNote(new_title, content, bcgr_color, pinned, new_date )
    GetAllNotes()
}