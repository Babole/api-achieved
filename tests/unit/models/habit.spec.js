const Habit = require('../../../models/Habit')
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('findById', () => {
        test('it resolves with author on successful db query', async () => {
            let habitData = { id: 10, description:"test description", frequency: "daily"}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await Habit.findById(10);
            console.log(result)
            expect(result).toBeInstanceOf(Habit)
        })
    });

    
    describe('findByUserId', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = { id: 20, description: "test description", user_id:20}

            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await Habit.findByUserId(20);
            expect(result).toBeInstanceOf(Array)
        })
    });

    describe('create', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = { description: 'test description', user_id: '3' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{ id: 3, ...habitData }] });
            const result = await Habit.create(habitData);
            expect(result).toHaveProperty('id')
        })
    });

    describe('destroy', () => {
        test('it resolves with message on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ id: 40 });

            let testHabit = new Habit({ id: 40, description: 'test description', frequency: 'daily'})
            const result = await testHabit.destroy();
            expect(result).toBe('Habit 40 was deleted')
        })
    });
    
    

    
})

