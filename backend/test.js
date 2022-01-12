const app = require('./app');
const db = require('./configuration/db')
require('supertest')
const User = require('./models/users');
const request = require('supertest')

beforeAll(async () => {
    const url = `mongodb://root:example@localhost:27017`
    await db.connect(url);
})

afterEach(async () => {
    await User.deleteMany()
})

it('should create a new user', async () => {
    const res = await request(app)
        .post('/api/v1/signup')
        .send({
            first_name: 'test',
            last_name: 'test',
            email: 'argj@test.cs',
            password: 'secret'
        })
    expect(res.statusCode).toEqual(201);
    expect(res.body.first_name).toEqual('test');
    expect(res.body.last_name).toEqual('test');
    expect(res.body.email).toEqual('argj@test.cs');
})

it('should fail to create user with same email', async () => {
    const res = await request(app)
        .post('/api/v1/signup')
        .send({
            first_name: 'test',
            last_name: 'test',
            email: 'argj@test.cs',
            password: 'secret'
        });
    expect(res.statusCode).toEqual(201);

    const res2 = await request(app)
        .post('/api/v1/signup')
        .send({
            first_name: 'test',
            last_name: 'test',
            email: 'argj@test.cs',
            password: 'secret'
        })
    expect(res2.statusCode).toEqual(409);
});

it('should fail to create user without valid data', async () => {
    const res = await request(app)
        .post('/api/v1/signup')
        .send({
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        })
    expect(res.statusCode).toEqual(400);

})