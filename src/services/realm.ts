import Realm from 'realm';

import { UserSchema } from './user.schema';

export const getRealm = async () => {
  return await Realm.open({
    schema: [UserSchema],
  });
};
