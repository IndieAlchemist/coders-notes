const Tag = require('./tags.model');

const getTags = async (req, res, next) => {
    try {
        let response;
        if ('id' in req.params) {
            if (!/^[a-fA-F0-9]{24}$/.test(req.params.id)){
                throw new ReferenceError('Invalid Tag ID!');
            }
            try {
                response = [await Tag.findById(req.params.id).exec()];
                if (response[0] === null)
                    throw new ReferenceError('The requested ID does not exist!');
            } catch ({ message }) {
                throw new ReferenceError(message);
            }
        } else {
            response = await Tag.find({}).exec();
        }
        res.json(response);
    } catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

const addTag = async (req, res, next) => {
    try {
        const { tagName } = req.body;
        if (!tagName)
            throw new ReferenceError('Make sure the request contains the tagName');
        const { _id } = await new Tag({ tagName }).save();
        res.json({
            status: 200,
            message: `Tag with ID: ${_id} has been added successfully to the DB`,
        });
    } catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

const updateTag = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        if (!/^[a-fA-F0-9]{24}$/.test(req.params.id))
            throw new ReferenceError('Invalid Tag ID!');

        const { tagName } = req.body;
        if (!tagName)
            throw new ReferenceError('Make sure the request contains the tagName');

        const updateTag = await Tag.findByIdAndUpdate(_id, { tagName }, { new: true }).exec();

        if (!updateTag) {
            throw new ReferenceError('There is no Tag to update with that ID.');
        }
        res.json(updateTag);
    }
    catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

const removeTag = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        if (!/^[a-fA-F0-9]{24}$/.test(req.params.id))
            throw new ReferenceError('Invalid Tag ID!');

        const deletedNote = await Tag.deleteOne({ _id });
        if (deletedNote.deletedCount === 0)
            throw new ReferenceError('There is no Tag to delete with that ID.');
        res.json({
            status: 200,
            message: 'Tag removed successfully from DB.',
        });
    } catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

module.exports = {
    getTags,
    addTag,
    updateTag,
    removeTag
}