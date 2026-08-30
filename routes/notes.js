import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();


//GET all notes 
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        return res.json(notes);
    } catch (err) {
        return res.status(500).json({
            message: 'Error fetching notes from database'
        });
    }
});

//GET notes by id 
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

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

        if (!title || title.trim() === ''){
            return res.status(400).json({message: 'Title is required'});
        }
        const newNote = new Note({title,description});

        await newNote.save();

        res.status(201).json(newNote); // send saved note back

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error creating note'
        });
    }
});

//PUT method
router.put('/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        

        const updated = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true} //return updated note 
        );

        res.json(updated);
    }
    catch(err){
        res.status(500).json({message: 'Error updating note'});

    }
});

router.delete('/:id', async (req, res) => {
    try {
        let deleted = await Note.findByIdAndDelete(req.params.id);
        res.json({message:'Deleted'})

    } catch (err) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
});

export default router;

