const API = 'http://localhost:8000/api/notes';

let selectedId = null; //stores which note user clicked 

// LOAD NOTES
async function loadNotes() { 
    const res = await fetch(API); //fetch(API) - sends GET request to backend 
    const notes = await res.json(); //converts to json object 

    const list = document.getElementById('notesList'); //access the list from the html 
    list.innerHTML = ''; //clears old notes before adding new ones 

    notes.forEach(note => { //loop through each note 
        const li = document.createElement('li'); //for each note created , create a list 
        li.textContent = note.title; // text inside an element 

        li.onclick = () => { //when clicked on the title in the side 
            selectedId = note.id; //save selected note id 

            document.getElementById('titleInput').value = note.title; //fill title input with selected note 
            document.getElementById('descInput').value = note.description; //fill description text area 

            document.querySelectorAll('.sidebar li').forEach(el => el.classList.remove('active')); //remove highlight from all notes 
            li.classList.add('active'); //highlight only the one selected 
        };

        list.appendChild(li); //add it to the list 
    });
}

// ADD
async function addNote() {
    const title = document.getElementById('titleInput').value; //get title from input 
    const description = document.getElementById('descInput').value; //get description from input 

    await fetch(API, { //send request to server 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //sending JSON data 
        body: JSON.stringify({ title, description }) // JS object -> JSON String 
    });

    loadNotes(); //refresh UI 
}

// UPDATE
async function updateNote() {
    if (!selectedId) return alert("Select a note"); //if not note selected stop 

    const title = document.getElementById('titleInput').value; //get title from input 
    const description = document.getElementById('descInput').value; //get description from description

    await fetch(`${API}/${selectedId}`, { //call specific note 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }) //send updated data 
    });

    loadNotes(); //refresh UI 
}

// DELETE
async function deleteNote() {
    if (!selectedId) return alert("Select a note"); //if no note selected stop 

    await fetch(`${API}/${selectedId}`, { //delete from backend 
        method: 'DELETE'
    });

    document.getElementById('titleInput').value = ''; //clear inputs 
    document.getElementById('descInput').value = '';

    selectedId = null; //reset selection 

    loadNotes(); //refresh UI 
}

// INITIAL LOAD 
loadNotes(); //runs when page opens 