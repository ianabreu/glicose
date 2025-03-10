import Realm from 'realm';

import { GlycemicRangeSchema, GlucoseSchema, UserSchema } from './schemas';

export const getRealm = async () => {
  return await Realm.open({
    schema: [UserSchema, GlucoseSchema, GlycemicRangeSchema],
    deleteRealmIfMigrationNeeded: true,
  });
};
