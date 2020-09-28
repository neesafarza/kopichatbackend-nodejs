import { mocked } from "ts-jest/dist/utils/testing";
import { User } from "../../src/domain/user";
import { mockUser, mockError } from "../mocks/mockDomainObjects";
import { getUserById, createUser } from "../../src/services/userService";


const  db = require('../../src/db/models/index.js')


jest.mock('../../src/db/models/index.js')
describe ('user service unit test cases', () => {

    let testUser: User;

    describe ('get user', () => {

        const mockedDependency  = mocked(db.user.findOne, true);

        beforeEach(() => {
            testUser = mockUser();
            mockedDependency.mockClear();
        })

        it ('will get user by id with valid id', async () => {
            mockedDependency.mockResolvedValueOnce(testUser);
            const result = await getUserById(1);
            expect(mockedDependency).toBeCalledTimes(1);
            expect(result).toEqual(testUser);
        })

        it('will throw error if no user found', async () => {
            mockedDependency.mockRejectedValueOnce(null);
            try {
                await getUserById(900);
                fail('exception should be thrown with no user found')
            } catch (e) {
                expect(mockedDependency).toBeCalledTimes(1);
                expect(e).toEqual('User not found')
            }

        })
    })
    
    describe ('create user', () => {
        
        const mockedDependency  = mocked(db.user.create, true);

        beforeEach(() => {
            testUser = mockUser();
            mockedDependency.mockClear();
        })


        it ('will create user with valid username', async () => {
            mockedDependency.mockResolvedValueOnce(testUser);
            const result = await createUser('testUser');
            expect(mockedDependency).toBeCalledTimes(1);
            expect(result).toEqual(testUser);
        })

        it('will throw error with no username', async () => {
            try{
                await createUser('');
                fail('no exception thrown')
            } catch (e) {
                expect(mockedDependency).toBeCalledTimes(0);
                expect(e).toEqual('Username cannot be empty');
            }

        })

        it('will throw error if username taken', async () => {
            mockedDependency.mockRejectedValueOnce('userNameTaken');
            try {
                await createUser('takenUserName')
                fail('no exception thrown')
            }catch(e) {
                expect(mockedDependency).toBeCalledTimes(1);
                expect(e).toEqual('userNameTaken')
            }
        })
    })
})