import express from 'express';
import fs from 'fs/promises';

const router = express.Router();


const getNote = async () => {
    try {
        const data = await fs.readFile('./data/notes.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return []; // fallback if file empty or not found
    }
};

//GET all notes 
router.get('/', async (req, res) => {
    try {
        const notes = await getNote();
        return res.json(notes);
    } catch (err) {
        return res.status(500).json({
            message: 'Error reading file'
        });
    }
});

//GET notes by id 
router.get('/:id', async (req, res) => {
    try {
        const notes = await getNote();
        const id = parseInt(req.params.id);

        const note = notes.find((n) => n.id === id);

        if (!note) {
            return res.status(404).json({
                message: 'Not found'
            });
        }

        return res.json(note);

    } catch (err) {
        return res.status(500).json({
            message: 'Server Error'
        });
    }
});

//POST api/notes
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;

        // validation
        if (!title || !description) {
            return res.status(400).json({
                message: 'Title and description required'
            });
        }

        const notes = await getNote();

        const newId = notes.length
            ? notes[notes.length - 1].id + 1
            : 1;

        const newNote = {
            id: newId,
            title,
            description
        };

        notes.push(newNote);

        await fs.writeFile('./data/notes.json', JSON.stringify(notes));

        return res.status(201).json({
            message: 'successful',
            data: newNote
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
});

//PUT method
router.put('/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const id = parseInt(req.params.id);

        const notes = await getNote();

        const index = notes.findIndex(n => n.id === id);

        if (index === -1) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }

        // update note
        notes[index] = {
            ...notes[index],
            title: title || notes[index].title,
            description: description || notes[index].description
        };

        await fs.writeFile('./data/notes.json', JSON.stringify(notes, null, 2));

        return res.json(notes[index]);

    } catch (err) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let notes = await getNote();

        const exists = notes.some(n => n.id === id); //,some() method checks if any note exists. Faster execution. 

        if (!exists) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }

        notes = notes.filter(n => n.id !== id);

        await fs.writeFile('./data/notes.json', JSON.stringify(notes));

        return res.json({
            message: 'Note deleted successfully'
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
});

export default router;

