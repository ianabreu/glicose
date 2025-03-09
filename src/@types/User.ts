import { UserSchema } from '@/database/schemas';

interface UserDTO extends Pick<UserSchema, 'uid' | 'name'> {}
type CreateUserDTO = Omit<UserDTO, 'uid'>;

export { UserDTO, CreateUserDTO };
