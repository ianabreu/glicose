import { v4 as uuidv4 } from 'uuid';

import { UserSchema } from '../schemas';
import { seedGlycemicRanges } from './GlycemicRangeServices';

import { CreateUserDTO, UserDTO } from '@/@types/User';
import { getRealm } from '@/database/realm';

//------------------------- Usuarios --------------------------------------
export const UserServices = {
  async create({ name }: CreateUserDTO): Promise<UserDTO> {
    try {
      const realm = await getRealm();
      let user: UserDTO | undefined;
      realm.write(() => {
        const newUser = realm.create('User', {
          uid: uuidv4(),
          name,
        });
        user = { uid: newUser.uid, name: newUser.name };
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
    try {
      const realm = await getRealm();
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

// export async function getAllUsers(): Promise<UserDTO[]> {
//   try {
//     const userData: UserDTO[] = [];
//     const realm = await getRealm();
//     const response = realm.objects<UserSchema>('User').sorted('name', true);
//     response.forEach(({ uid, name }) => {
//       userData.push({ uid, name });
//     });
//     return userData;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// export async function getUserById(userId: string) {
//   const realm = await getRealm();
//   const response = realm.objectForPrimaryKey('User', userId);
//   console.log(response);
// }

//------------------------- Glicose --------------------------------------
