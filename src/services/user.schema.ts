import Realm from 'realm';

class UserSchema extends Realm.Object<UserSchema> {
  uid!: string;
  name!: string;

  static schema: Realm.ObjectSchema = {
    name: 'User',
    primaryKey: 'uid',
    properties: {
      uid: { type: 'string', indexed: true },
      name: 'string',
    },
  };
}

export { UserSchema };
