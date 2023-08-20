import { jest } from "@jest/globals";
import { AdminController } from "../../../Controllers/Admin/adminController";
import app from "../../../server"
import request from 'supertest'

let server;
beforeEach(() => {
    const port = 3030;
    server = app.listen(port)
});

afterEach(() => {
    server.close();
});

describe('Testing routes userController', () => {
    it('Retur list user GET (/admin/:id)' , async () => {
        const returnAdmin = await request(app)
        .get('/admin/:id')
        .set('Acept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(201);

        expect(returnAdmin.body[0].email).toEqual('renan@test.com')
    })
});