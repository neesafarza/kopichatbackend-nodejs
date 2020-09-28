import { User } from "../../src/domain/user";
import { mockUser, mockError } from "../mocks/mockDomainObjects";
import { app  } from "../../src/app";
import request from 'supertest';
import { getUserById, createUser } from "../../src/services/userService";
import { mocked } from "ts-jest/dist/utils/testing";

jest.mock('../../src/services/userService');
describe ('user controller unit test cases', () => {

    let testUser: User;


    describe('GET /user', () => {

        const mockedDependency  = mocked(getUserById, true);

        beforeEach(() => {
            testUser = mockUser();
            mockedDependency.mockClear();
        })

        it('return expected with valid id', async () => {
            mockedDependency.mockResolvedValueOnce(testUser);
            const result = await request(app).get('/user/1');
            expect(mockedDependency.mock.calls).toHaveLength(1);
            expect(result.status).toEqual(200);
            expect(result.body.id).toEqual(testUser.id);
            return expect(result.body.userName).toEqual(testUser.userName);
        });

        it('returns error with invalid id', async () => {
            mockedDependency.mockRejectedValueOnce('User not found');
            const result = await request(app).get('/user/666');
            expect(mockedDependency.mock.calls).toHaveLength(1);
            expect(result.status).toEqual(400);
            expect(result.body).toEqual(mockError('User not found'))
        });

    })

    describe('POST /user', () => {

        const mockedDependency  = mocked(createUser, true);

        beforeEach(() => {
            testUser = mockUser();
            mockedDependency.mockClear();
        })

        it('creates user with valid  username', async () => {
            mockedDependency.mockResolvedValueOnce(testUser);
            const body = {
                userName: 'testUserName'
            }
            const result = await request(app).post('/user').send(body);
            expect(mockedDependency.mock.calls).toHaveLength(1);
            expect(result.status).toEqual(200);
            expect(result.body.id).toEqual(testUser.id);
            return expect(result.body.userName).toEqual(testUser.userName);
        })

        it ('return error with invalid username', async () => {
            mockedDependency.mockRejectedValueOnce('Username taken');
            const body = {
                userName: 'takenUserName'
            }
            const result = await request(app).post('/user').send(body);
            expect(mockedDependency.mock.calls).toHaveLength(1);
            expect(result.status).toEqual(400);
            expect(result.body).toEqual(mockError('Username taken'))
        })
    })
})
