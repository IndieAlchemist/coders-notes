const request = require('supertest');
const { connection } = require('mongoose');

const app = require('../../app');
const Note = require('./notes.model');
const { prePopulate } = require('../../helpers/testHelpers');

const ids = {
    invalid: 'invalid_id',
    nonexistent: 'aaaaaaaaaaaaaaaaa',
}

const title = "Demo Note";
const content = "Demo content";
const description = "Demo Description";
const doc = { title, description, content };

beforeAll(async () => {
    ids.valid = await prePopulate(Note, doc);
});

afterAll(async () => {
    await Note.deleteMany({});
    connection.close();
});

describe('GET /notes', () => {
    it('Should respond with a 200 status code', async done => {
        request(app)
            .get('/notes')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('Should respond with an array', async done => {
        const { body } = await request(app)
            .get('/notes')
            .expect(200);
        expect(body).toEqual(expect.any(Array));
        done();
    });
    it('Should respond with a non-empty array', async done => {
        const { body } = await request(app)
            .get('/notes')
            .expect(200);
        expect(body).toEqual(expect.any(Array));
        expect(body.length).toBeGreaterThan(0);
        done();
    });
})

describe('GET /notes/:id', () => {
    it('With an invalid id, should respond with an invalid id message', async done => {
        const { body: { message }, } = await request(app)
            .get(`/notes/${ids.invalid}`)
            .expect(404);
        expect(message).toBe('Invalid Note ID!');
        done();
    });
    it('With a non existent id, should respond with a non existent id message', async done => {
        const { body: { message }, } = await request(app)
            .get(`/notes/${ids.nonexistent}`)
            .expect(404);
        
        expect(message).toBe('The requested ID does not exist!');
        done();
    });
    it('With a valid id, should respond with a 200 status code', done =>
        request(app)
            .get(`/notes/${ids.valid}`)
            .expect(200, done));
});

describe('POST /notes', () => {
    it('Without a body, should respond with a 404 status code and error message', async done => {
        const { body: { message }, } = await request(app)
            .post('/notes')
            .expect(404);
        expect(message).toBe('Make sure the request contains the body');
        done();
    });
    it('With a valid body, should respond with a 200 status code', async done => {
        const { body: { message }, } = await request(app)
            .post('/notes')
            .send({ title: 'Test Note', description: 'Test Description', content: 'Test Content' })
            .expect(200);
        expect(message).toEqual(expect.stringMatching(/^Note with ID: ([a-f0-9]{24}) has been added successfully to the DB$/));
        done();
    });
});

describe('PUT /notes/:id', () => {
    it('With an invalid id, should respond with an invalid id message', async done => {
        const { body: { message }, } = await request(app)
            .put(`/notes/${ids.invalid}`)
            .expect(404);
        expect(message).toBe('Invalid Note ID!');
        done();
    });
    it('Without a body, should respond with a 404 status code and error message ', async done => {
        const { body: { message }, } = await request(app)
            .put(`/notes/${ids.nonexistent}`)
            .expect(404);
        expect(message).toBe('Make sure the request contains the body');
        done();
    });
    it('With a non existing id, but with a body, should respond with a non existent id message', async done => {
        const { body: { message }, } = await request(app)
            .put(`/notes/${ids.nonexistent}`)
            .send({ title: 'Test Note2', description: 'Test Description2', content: 'Test Content2' })
            .expect(404);
        expect(message).toBe('There is no Note to update with that ID.');
        done();
    });
    it('With a valid id and body, should respond with a 200 status code', async done => {
        const { body: { message }, } = await request(app)
            .put(`/notes/${ids.valid}`)
            .send({ title: 'Test Note2', description: 'Test Description2', content: 'Test Content2' })
            .expect(200);
        done();
    });
});

describe('DELETE /notes/:id', () => {
    it('With an invalid id, should respond with an invalid id message', async done => {
        const { body: { message }, } = await request(app)
            .delete(`/notes/${ids.invalid}`)
            .expect(404);
        expect(message).toBe('Invalid Note ID!');
        done();
    });
    it('With a non existent id, should respond with a non existent id message', async done => {
        const { body: { message }, } = await request(app)
            .delete(`/notes/${ids.nonexistent}`)
            .expect(404);
        expect(message).toBe('There is no Note to delete with that ID.');
        done();
    });
    it('With a valid id, should respond with a success message', async done => {
        const { body: { message }, } = await request(app)
            .delete(`/notes/${ids.valid}`)
            .expect(200);
        expect(message).toBe('Note removed successfully from DB.');
        done();
    });
});
