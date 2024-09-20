
import { connectDB } from "../server"
import db from "../config/db"

/* describe('Get/api', () => {
    it('should return a welcome message', async () => {
        const response = await request(server).get('/api');
        expect(response.status).toBe(200);
        //console.log(response.status)
        expect(response.body.msg).toBe('Bienvenido a la API de productos');
        //expect(response.headers['content-type']).toMatch(/json/);

        expect(response.status).not.toBe(404);
        expect(response.body.msg).not.toBe('Bienvenido a la API de Servicios');
    })
}) */

    describe('connectDB', () => {
        it('should handle database connection error', async () => {
            jest.spyOn(db, 'authenticate')
            .mockRejectedValue(new Error('Database connection error'));
            const consoleSpy = jest.spyOn(console, 'log');
            await connectDB();

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Database connection error')
            )
        })
    })