const request = require("supertest");

describe('Test rutas de cliente', () => {
    let app;
    beforeEach(() => {
        app = require("../src/index.js")
    })
    afterAll(async() => await app.close())

    test('Obtener la lista de los clientes', async() => {
        const data = {
            telefono: '3126846268',
            nombre: 'Juan',
            apellido: 'Ballesteros'
        }
        const response = await request(app)
            .post('/api/cliente')
            .send(data)
        expect(response.statusCode).toBe(200)
        expect(response.data.length).toGreaterThan(0)
    });
});