const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../server/models/User');
const Task = require('../server/models/Task');

// Random user for testing to avoid duplicates
const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'password123'
};

let token;
let taskId;

describe('API Integration Tests', () => {

    // Helper: Wait for DB Connection if needed
    beforeAll(async () => {
        // Wait a bit for server to connect
        await new Promise(resolve => setTimeout(resolve, 2000));
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('GET / should return API running message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('API is running...');
    });

    describe('Auth Endpoints', () => {
        it('POST /api/auth/register should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(testUser);

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body).toHaveProperty('_id');
            expect(res.body.name).toBe(testUser.name);
            token = res.body.token; // Save token for next tests
        });

        it('POST /api/auth/login should login the user', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
    });

    describe('Task Endpoints', () => {
        it('POST /api/tasks should create a new task', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`) // Auth Header
                .send({
                    title: 'Test Task',
                    description: 'This is a test task',
                    status: 'pending'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body.title).toBe('Test Task');
            taskId = res.body._id;
        });

        it('GET /api/tasks should return user tasks', async () => {
            const res = await request(app)
                .get('/api/tasks')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('PUT /api/tasks/:id should update a task', async () => {
            const res = await request(app)
                .put(`/api/tasks/${taskId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    status: 'completed'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toBe('completed');
        });

        it('DELETE /api/tasks/:id should delete a task', async () => {
            const res = await request(app)
                .delete(`/api/tasks/${taskId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe('Task removed');
        });
    });
});
