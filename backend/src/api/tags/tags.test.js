const request = require('supertest');
const { connection } = require('mongoose');

const app = require('../../app');
const Tag = require('./tags.model');
const { prePopulate } = require('../../helpers/testHelpers');

const ids = {
    invalid: 'invalid_id',
    nonexistent: 'aaaaaaaaaaaaaaaaaaaaaaaa',
}

const tagName = "C++ Demo";
const doc = { tagName };

beforeAll(async () => {
    ids.valid = await prePopulate(Tag, doc);
});

afterAll(async () => {
    await Tag.deleteMany({});
    connection.close();
});

describe('GET /tags', () => {
    it('Should respond with a 200 status code', async done => {
        request(app)
            .get('/notes')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('Should respond with an array', async done => {
        const { body } = await request(app)
            .get('/tags')
            .expect(200);
        expect(body).toEqual(expect.any(Array));
        done();
    });
    it('Should respond with a non-empty array', async done => {
        const { body } = await request(app)
            .get('/tags')
            .expect(200);
        expect(body).toEqual(expect.any(Array));
        expect(body.length).toBeGreaterThan(0);
        done();
    });
})

describe('GET /tags/:id', () => {
    it('With an invalid id, should respond with an invalid id message', async done => {
        const { body: { message }, } = await request(app)
            .get(`/tags/${ids.invalid}`)
            .expect(404);
        expect(message).toBe('Invalid Tag ID!');
        done();
    });
    it('With a non existent id, should respond with a non existent id message', async done => {
        const { body: { message }, } = await request(app)
            .get(`/tags/${ids.nonexistent}`)
            .expect(404);
        
        expect(message).toBe('The requested ID does not exist!');
        done();
    });
    it('With a valid id, should respond with a 200 status code', done =>
        request(app)
            .get(`/tags/${ids.valid}`)
            .expect(200, done));
});

describe('POST /tags', () => {
    it('Without a body, should respond with a 404 status code and error message', async done => {
        const { body: { message }, } = await request(app)
            .post('/tags')
            .expect(404);
        expect(message).toBe('Make sure the request contains the tagName');
        done();
    });
    it('With a valid body, should respond with a 200 status code', async done => {
        const { body: { message }, } = await request(app)
            .post('/tags')
            .send({ tagName: 'Test Tag' })
            .expect(200);
        expect(message).toEqual(expect.stringMatching(/^Tag with ID: ([a-f0-9]{24}) has been added successfully to the DB$/));
        done();
    });
});

describe('PUT /tags/:id', () => {
    it('With an invalid id, should respond with an invalid id message', async done => {
        const { body: { message }, } = await request(app)
            .put(`/tags/${ids.invalid}`)
            .expect(404);
        expect(message).toBe('Invalid Tag ID!');
        done();
    });
    it('Without a body, should respond with a 404 status code and error message ', async done => {
        const { body: { message }, } = await request(app)
            .put(`/tags/${ids.nonexistent}`)
            .expect(404);
        expect(message).toBe('Make sure the request contains the tagName');
        done();
    });
    it('With a non existing id, but with a body, should respond with a non existent id message', async done => {
        const { body: { message }, } = await request(app)
            .put(`/tags/${ids.nonexistent}`)
            .send({ tagName: 'Test Tag PUT' })
            .expect(404);
        expect(message).toBe('There is no Tag to update with that ID.');
        done();
    });
    it('With a valid id and body, should respond with a 200 status code', async done => {
        const { body: { message }, } = await request(app)
            .put(`/tags/${ids.valid}`)
            .send({ tagName: 'Test Tag PUT' })
            .expect(200);
        done();
    });
});

describe('DELETE /tags/:id', () => {
    it('With an invalid id, should respond with an invalid id message', async done => {
        const { body: { message }, } = await request(app)
            .delete(`/tags/${ids.invalid}`)
            .expect(404);
        expect(message).toBe('Invalid Tag ID!');
        done();
    });
    it('With a non existent id, should respond with a non existent id message', async done => {
        const { body: { message }, } = await request(app)
            .delete(`/tags/${ids.nonexistent}`)
            .expect(404);
        expect(message).toBe('There is no Tag to delete with that ID.');
        done();
    });
    it('With a valid id, should respond with a success message', async done => {
        const { body: { message }, } = await request(app)
            .delete(`/tags/${ids.valid}`)
            .expect(200);
        expect(message).toBe('Tag removed successfully from DB.');
        done();
    });
});