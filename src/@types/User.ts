import { UserSchema } from '@/database/schemas';

interface UserDTO extends Pick<UserSchema, 'uid' | 'name' | 'lastName'> {}
type CreateUserDTO = Omit<UserDTO, 'uid' | 'lastName'>;

export { UserDTO, CreateUserDTO };
