const Complete = require('../../../models/Complete')
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('compelte controllers', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('findByHabitId', () => {
        test('it resolves with completion dates on successful db query', async () => {
            let completionDates = { habit_id: 30, date: "23-02-01"}

            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ completionDates] });
            const result = await Complete.findByHabitId(30);
            expect(result).toBeInstanceOf(Array)
        })
    })

    describe('create', () => {
        test('it resolves with date on successful db query', async () => {
            let completionDateData = { habit_id:40, date:"01-01-01" }

            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ completionDateData] });
            const result = await Complete.create(completionDateData);
            expect(result).toBeInstanceOf(Complete)
        })
    });

    
})
