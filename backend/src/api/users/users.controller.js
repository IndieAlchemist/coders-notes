const User = require('./users.model');

const getUsers = async (req, res, next) => {
    try {
        let response;
        if ('id' in req.params) {
            if (!/^[a-fA-F0-9]{24}$/.test(req.params.id))
                throw new ReferenceError('Invalid User ID!');
            try {
                response = [await User.findById(req.params.id).exec()];
                if (response[0] === null)
                    throw new ReferenceError('The requested ID does not exist!');
            } catch ({ message }) {
                throw new ReferenceError(message);
            }
        } else {
            response = await User.find({}).exec();
        }
        res.json(response);
    } catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

const addUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            throw new ReferenceError('Make sure the request contains the name, email and password');
        const { _id } = await new User({ like, author, note }).save();
        res.json({
            status: 200,
            message: `User with ID: ${_id} has been added successfully to the DB`,
        });
    } catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

const removeUser = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        if (!/^[a-fA-F0-9]{24}$/.test(req.params.id))
            throw new ReferenceError('Invalid User ID!');

        const deletedUser = await User.deleteOne({ _id });
        if (deletedUser.deletedCount === 0)
            throw new ReferenceError('There is no User to delete with that ID.');
        res.json({
            status: 200,
            message: 'User removed from the DB.',
        });
    } catch (error) {
        if (error instanceof ReferenceError) res.status(404);
        next(error);
    }
}

module.exports = {
    getUsers,
    addUser,
    removeUser
}