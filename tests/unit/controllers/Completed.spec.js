const completedController = require('../../../controllers/completed')
const Complete = require('../../../models/Complete');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('completed controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('show', () => {
        test('it returns with status code 200', async () => {
            let testCompletion = {
                habit_id: 30,
                date: "01-01-01",
        
            }
            jest.spyOn(Complete, 'findByHabitId')
                .mockResolvedValue(new Complete(testCompletion));
                
            const mockReq = { params: { id: 30 } }
            await completedController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Complete(testCompletion));
        })
    });

    describe('create', () => {
        test('on completion creation returns a 201 status code', async () => {
            // let testCompletion = {
            //     date: "21_32_32",
            //     thisisalsouseless: 5
            // }
            jest.spyOn(Complete, 'create')
                .mockResolvedValue();

            const mockReq = 'this is useless'
            await completedController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            // expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })


    });

})
