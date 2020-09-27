import { User } from '../../src/domain/user';
import { ApiError } from '../../src/domain/apiError';


export const mockUser = (): User => {
    return {
        id: 1,
        userName: 'testUser',
        created_at: new Date(),
        updated_at: new Date(),
    }
}

export const mockError = (message: string): ApiError => {
    return {
        message
    }
}