const API = 'http://localhost:8000/api/notes';

let selectedId = null; // stores which note user clicked
let allNotes = []; // store all notes for search

// LOAD NOTES
async function loadNotes() { 
    const res = await fetch(API); // fetch(API) - sends GET request to backend 
    allNotes = await res.json(); // store globally for search
    renderNotes(allNotes); // render notes
}

// RENDER NOTES (UI)
function renderNotes(notes) {
    const list = document.getElementById('notesList'); // access the list from the html 
    list.innerHTML = ''; // clears old notes before adding new ones 

    notes.forEach(note => { // loop through each note 

        const li = document.createElement('li'); // for each note created , create a list 
        li.innerHTML = `
            <span class="note-title">${note.title}</span>
            <span class="icons">
                <span class="edit-icon">✏️</span>
                <span class="delete-icon">🗑️</span>
            </span>
        `;

        // CLICK NOTE
        li.onclick = () => { // when clicked on the title in the side 
            selectedId = note._id; // save selected note id 

            document.getElementById('titleInput').value = note.title; // fill title input with selected note 
            document.getElementById('descInput').value = note.description; // fill description text area 

            document.querySelectorAll('.sidebar li').forEach(el => el.classList.remove('active')); // remove highlight from all notes 
            li.classList.add('active'); // highlight only the one selected 
        };

        // EDIT ICON CLICK → FOCUS INPUT
        const editIcon = li.querySelector('.edit-icon');

        editIcon.onclick = (e) => {
            e.stopPropagation(); // prevent li click

            selectedId = note._id; // set selected note

            document.getElementById('titleInput').value = note.title; // fill inputs
            document.getElementById('descInput').value = note.description;

            document.getElementById('titleInput').focus(); // focus for editing
        };

        // DELETE ICON CLICK
        const deleteIcon = li.querySelector('.delete-icon');

        deleteIcon.onclick = async (e) => {
            e.stopPropagation(); // prevent li click

            const confirmDelete = confirm("Delete this note?");
            if (!confirmDelete) return;

            await fetch(`${API}/${note._id}`, {
                method: 'DELETE'
            });

            // clear UI if deleted note was selected
            if (selectedId === note._id) {
                document.getElementById('titleInput').value = '';
                document.getElementById('descInput').value = '';
                selectedId = null;
            }

            loadNotes(); // refresh list
        };

        list.appendChild(li); // add it to the list 
    });
}

// SEARCH NOTES
function searchNotes() {
    const query = document.getElementById('searchInput').value.toLowerCase();

    const filtered = allNotes.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.description.toLowerCase().includes(query)
    );

    renderNotes(filtered); // re-render filtered notes
}

// ADD
async function addNote() {
    try {
        const title = document.getElementById('titleInput').value; // get title from input 
        const description = document.getElementById('descInput').value; // get description from input 

        let res;

        if(selectedId){
            res = await fetch(`${API}/${selectedId}`, { // call specific note 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description }) // send updated data 
            });
        }
        else{
            res = await fetch(API, { // send request to server 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // sending JSON data 
            body: JSON.stringify({ title, description }) // JS object -> JSON String 
        });

        }
        const data = await res.json();

        if(!res.ok){
            alert(data.message || "Something went wrong");
            return;
        }

        // clear inputs after adding
        document.getElementById('titleInput').value = '';
        document.getElementById('descInput').value = '';

        loadNotes(); // refresh UI 

    } catch (err) {
        console.error("Add failed:", err);
        alert("Network error , please try again");
    }
}

// UPDATE
async function updateNote() {
    if (!selectedId) return alert("Select a note"); // if no note selected stop 

    const title = document.getElementById('titleInput').value; // get title from input 
    const description = document.getElementById('descInput').value; // get description from description

    

    loadNotes(); // refresh UI 
}

// AUTO SAVE when user clicks outside description
document.getElementById('descInput').addEventListener('blur', () => {
    if (selectedId) updateNote();
});

// DELETE (optional button usage)
async function deleteNote() {
    if (!selectedId) return alert("Select a note"); // if no note selected stop 

    await fetch(`${API}/${selectedId}`, { // delete from backend 
        method: 'DELETE'
    });

    document.getElementById('titleInput').value = ''; // clear inputs 
    document.getElementById('descInput').value = '';

    selectedId = null; // reset selection 

    loadNotes(); // refresh UI 
}

// INITIAL LOAD 
loadNotes(); // runs when page opens