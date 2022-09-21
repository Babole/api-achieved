const habitsController = require('../../../controllers/habits')
const Habit = require('../../../models/Habit');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('habits controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('showById', () => {
        test('it returns a habit with status code 200', async () => {
            let testHabit = {
                id: 10,
                description: "showing description habit",
                user_id: 10

            }
            jest.spyOn(Habit, 'findById')
                .mockResolvedValue(new Habit(testHabit));

            const mockReq = { params: { id: 10 } }
            await habitsController.showById(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

    describe('showByUserId', () => {
        test('it returns a habit with status code 200', async () => {
            let testHabit = {
                id: 10,
                description: "showing description habit",
                user_id: 10

            }
            jest.spyOn(Habit, 'findById')
                .mockResolvedValue(new Habit(testHabit));

            const mockReq = { params: { id: 10 } }
            await habitsController.showById(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

    describe('create', () => {
        test('it returns a new Habit with a 201 status code', async () => {
            let testHabit = {
                id: 5,
                description: "creating description habit",
                user_id: 5
            }
            jest.spyOn(Habit, 'create')
                .mockResolvedValue(new Habit(testHabit));

            const mockReq = { body: testHabit }
            await habitsController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })


    });

    // describe('destroy', () => {
    //     test('it returns a 204 status code on successful deletion', async () => {
    //         jest.spyOn(Habit.prototype, 'destroy')
    //             .mockResolvedValue('Deleted');

    //         const mockReq = { params: { id: 1 } }
    //         await habitsController.destroy(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(204);
    //     })
    // });

})
