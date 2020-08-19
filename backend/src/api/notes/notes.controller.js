const Note = require('./notes.model');

const getNotes = async (req, res, next) => {
    try {
        let response;
        if ('id' in req.params) {
            if (!/^[a-fA-F0-9]{24}$/.test(req.params.id))
                throw new ReferenceError('Invalid Note ID!');
            try {
                response = [await Note.findById(req.params.id).exec()];
                if (response[0] === null)
                    throw new ReferenceError('The requested ID does not exist!');
            } catch ({ message }) {
                throw new ReferenceError(message);
            }
        } else {
            response = await Note.find({}).exec();
        }
        res.json(response);
    } catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

const addNote = async (req, res, next) => {
    try {
        const { title, description, content, author } = req.body;
        console.log(description);
        if (!title || !description || !content)
            throw new ReferenceError('Make sure the request contains title description and content');
        const { _id } = await new Note({ title, description, content, author }).save();
        res.json({
            status: 200,
            message: `Note with ID: ${_id} has been added successfully to the DB`,
        });
    } catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

const removeNote = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        if (!/^[a-fA-F0-9]{24}$/.test(req.params.id))
            throw new ReferenceError('Invalid Note ID!');

        const deletedNote = await Note.deleteOne({ _id });
        if (deletedNote.deletedCount === 0)
            throw new ReferenceError('There is no Note to delete with that ID.');
        res.json({
            status: 200,
            message: 'Note removed from the DB.',
        });
    } catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote
}