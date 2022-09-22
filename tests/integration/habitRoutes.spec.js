describe('habits endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('should retrieve a habit based on user_id', async () => {
        const res = await request(api).get('/habits/user/1')
        expect(res.statusCode).toEqual(200)
        expect(res[0].description).toEqual('Test description')
    });


})
