import { v4 as uuidv4 } from 'uuid';

import { UserSchema } from '../schemas';
import { seedGlycemicRanges } from './GlycemicRangeServices';

import { CreateUserDTO, UserDTO } from '@/@types/User';
import { getRealm } from '@/database/realm';

export const UserServices = {
  async create({ name }: CreateUserDTO): Promise<UserDTO> {
    const realm = await getRealm();
    try {
      let user: UserDTO | undefined;
      realm.write(() => {
        const newUser = realm.create('User', {
          uid: uuidv4(),
          name,
          lastName: '',
        });
        user = { uid: newUser.uid, name: newUser.name, lastName: newUser.lastName };
      });
      if (!user) {
        throw new Error('Erro ao criar usuário');
      }
      await seedGlycemicRanges(user.uid);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async get(): Promise<UserDTO | null> {
    const realm = await getRealm();
    try {
      const arrayUsers = realm.objects<UserSchema>('User');
      if (arrayUsers.length === 0) {
        return null;
      } else {
        return arrayUsers[0] as UserDTO;
      }
    } catch (error) {
      console.error('getUser: ', error);
      return null;
    }
  },
};
