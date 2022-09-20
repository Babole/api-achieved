const User = require('../../../models/User');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('Author', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with users on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await User.all;
            expect(all).toHaveLength(3)
        })
    });

    describe('create', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { name: 'test_user', password: 'test_password' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ { id: 1, ...userData }] });
            const result = await User.create(userData);
            expect(result).toHaveProperty('id')
        })
    });
    
})
