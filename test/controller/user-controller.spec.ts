import { User } from "../../src/domain/user";
import { mockUser, mockError } from "../mocks/mockDomainObjects";
import { app  } from "../../src/app";
import request from 'supertest';
import { getUserById } from "../../src/services/userService";
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
            mockedDependency.mockReturnValueOnce(testUser);
            const result = await request(app).get('/user/1');
            expect(mockedDependency.mock.calls).toHaveLength(1);
            expect(result.status).toEqual(200);
            expect(result.body.id).toEqual(testUser.id);
            return expect(result.body.userName).toEqual(testUser.userName);
        });

        it('returns error with invalid id', async () => {

            const result = await request(app).get('/user/666');
            mockedDependency.mockReturnValueOnce(null);
            expect(mockedDependency.mock.calls).toHaveLength(1);
            expect(result.status).toEqual(400);
            expect(result.body).toEqual(mockError('User not found'))
        });

    })
})