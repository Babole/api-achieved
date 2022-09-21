const Habit = require('../../../models/Habit')
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('create', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = { description: '2l a day', user_id: '1' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{ id: 1, ...habitData }] });
            const result = await Habit.create(habitData);
            expect(result).toHaveProperty('id')
        })
    });

    describe('findByUserId', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = { id: 30, description: "test description", user_id:30}

            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await Habit.findByUserId(30);
            console.log(result)
            expect(result).toBeInstanceOf(Array)
        })
    });

    
    // describe('destroy', () => {
    //     test('it resolves with message on successful db query', async () => {
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({ id: 2 });

    //         let testHabit = new Habit({id:2,description: "test description", user_id:2 })
    //         // console.log(testHabit)
    //         const result = await testHabit.destroy();
    //         expect(result).toBe('Habit 2 was deleted')
    //     })
    // });

    
})

