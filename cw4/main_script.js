//at start:
const default_note = {
    title: "default",
    content: "default",
    color: "blue",
    pinned: true,
    creationDate: "17.05.2020",
    tag: "default"
}

//save default note:
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
    const n_title = note_container.children.title.value
    const n_content = note_container.children.content.value

    const new_note = {
        title: n_title,
        content: n_content,
        color: "blue",
        pinned: true,
        creationDate: "17.05.2020",
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
    titles_array.forEach(element => {
        retrieved_note = GetFromLocalStorage(element)
        title = retrieved_note.title
        console.log(title)
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