import Realm from 'realm';

class ProfileSchema extends Realm.Object {
  hasSeenOnboarding!: boolean;

  static schema: Realm.ObjectSchema = {
    name: 'Profile',
    properties: {
      hasSeenOnboarding: { type: 'bool', default: false },
    },
  };
}

export { ProfileSchema };
