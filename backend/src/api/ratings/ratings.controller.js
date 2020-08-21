const Rating = require('./ratings.model');

const getRatings = async (req, res, next) => {
    try {
        let response;
        if ('id' in req.params) {
            if (!/^[a-fA-F0-9]{24}$/.test(req.params.id))
                throw new ReferenceError('Invalid Rating ID!');
            try {
                response = [await Rating.findById(req.params.id).exec()];
                if (response[0] === null)
                    throw new ReferenceError('The requested ID does not exist!');
            } catch ({ message }) {
                throw new ReferenceError(message);
            }
        } else {
            response = await Rating.find({}).exec();
        }
        res.json(response);
    } catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

const addRating = async (req, res, next) => {
    try {
        const { like, user, note } = req.body;
        if (!user || !note || !like)
            throw new ReferenceError('Make sure the request contains the user, note and like variables');
        const { _id } = await new Rating({ like, user, note }).save();
        res.json({
            status: 200,
            message: `Rating with ID: ${_id} has been added successfully to the DB`,
        });
    } catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

const removeRating = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        if (!/^[a-fA-F0-9]{24}$/.test(req.params.id))
            throw new ReferenceError('Invalid Rating ID!');

        const deletedRating = await Rating.deleteOne({ _id });
        if (deletedRating.deletedCount === 0)
            throw new ReferenceError('There is no Rating to delete with that ID.');
        res.json({
            status: 200,
            message: 'Rating removed from the DB.',
        });
    } catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

module.exports = {
    getRatings,
    addRating,
    removeRating
}