import { UserSchema } from '../services/user.schema';

interface UserDTO extends Pick<UserSchema, 'uid' | 'name'> {}
type CreateUserDTO = Omit<UserDTO, 'uid'>;

export { UserDTO, CreateUserDTO };
