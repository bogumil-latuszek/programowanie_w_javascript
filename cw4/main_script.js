const submit_note = document.getElementById("submit_button");
submit_note.addEventListener("click", ()=>{
    const default_note = {
        title: "title",
        content: "asfafdadsfdsafa",
        color: "blue",
        pinned: true,
        creationDate: "17.05.2020",
        tag: "asfas"
    }
    const stringified_note = JSON.stringify(default_note)
    localStorage.setItem("default", stringified_note);
})

const get_note = document.getElementById("get_button");
get_note.addEventListener("click", ()=>{
    const default_note = localStorage.getItem("default");
    const title = default_note.title;
})
const note = {
    title: "title",
    content: "asfafdadsfdsafa",
    color: "blue",
    pinned: true,
    creationDate: "17.05.2020",
    tag: "asfas"
}