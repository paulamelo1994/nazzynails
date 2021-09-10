const request = require("supertest");

describe('Test rutas de usuario', () => {
    let app;
    beforeEach(() => {
        app = require("../src/index.js")
    })
    afterAll(async() => await app.close())
    test('Verificar ruta usuario', async() => {
        const response = await request(app).get('/api/user')
        expect(response.statusCode).toBe(200)
    });
});