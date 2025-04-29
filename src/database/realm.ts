import Realm from 'realm';

import { GlycemicRangeSchema, GlucoseSchema, UserSchema } from './schemas';

export const getRealm = async () => {
  // Deleta o banco antes de abrir, para desenvolvimento
  // const realmPath = Realm.defaultPath;
  // await Realm.deleteFile({ path: realmPath });

  return await Realm.open({
    schema: [UserSchema, GlucoseSchema, GlycemicRangeSchema],
    deleteRealmIfMigrationNeeded: true,
  });
};
