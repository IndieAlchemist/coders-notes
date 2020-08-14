const request = require('supertest');
const { connection } = require('mongoose');

const app = require('../../app');
const User = require('../users/users.model');
const Note = require('../notes/notes.model');
const Rating = require('./ratings.model');
const { prePopulate } = require('../../helpers/testHelpers');

const ids = {
    invalid: 'invalid_id',
    nonexistent: 'aaaaaaaaaaaaaaaaa',
}

const name = "user";
const email = "user@gmail.com";
const password = "password";
const author = { name, email, password };

const title = "Demo Note";
const content = "Demo content";
const note = { title, content };

const like = true;
const rating = { like };

beforeAll(async () => {
    idUser = await prePopulate(User, author);
    note.author = idUser;
    idNote = await prePopulate(Note, note);
    rating.note = idNote;
    rating.user = idUser
    ids.valid = await prePopulate(Rating, rating);
});

afterAll(async () => {
    await Rating.deleteMany({});
    await Note.deleteMany({});
    await User.deleteMany({});
    connection.close();
});

describe('GET /ratings', () => {
    it('Should respond with a 200 status code', async done => {
        request(app)
            .get('/ratings')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('Should respond with an array', async done => {
        const { body } = await request(app)
            .get('/ratings')
            .expect(200);
        expect(body).toEqual(expect.any(Array));
        done();
    });
    it('Should respond with a non-empty array', async done => {
        const { body } = await request(app)
            .get('/ratings')
            .expect(200);
        expect(body).toEqual(expect.any(Array));
        expect(body.length).toBeGreaterThan(0);
        done();
    });
})
