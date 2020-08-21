const request = require('supertest');
const { connection } = require('mongoose');

const app = require('../../app');
const User = require('./users.model');
const { prePopulate } = require('../../helpers/testHelpers');

const ids = {
    invalid: 'invalid_id',
    nonexistent: 'aaaaaaaaaaaaaaaaa',
}

const name = "user";
const email = "user@gmail.com";
const password = "password";
const doc = { name, email, password };

beforeAll(async () => {
    ids.valid = await prePopulate(User, doc);
});

afterAll(async () => {
    await User.deleteMany({});
    connection.close();
});

describe('GET /users', () => {
    it('Should respond with a 200 status code', async done => {
        request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('Should respond with an array', async done => {
        const { body } = await request(app)
            .get('/users')
            .expect(200);
        expect(body).toEqual(expect.any(Array));
        done();
    });
    it('Should respond with a non-empty array', async done => {
        const { body } = await request(app)
            .get('/users')
            .expect(200);
        expect(body).toEqual(expect.any(Array));
        expect(body.length).toBeGreaterThan(0);
        done();
    });
})
