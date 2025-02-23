import Realm from 'realm';

class SettingsSchema extends Realm.Object {
  hasSeenOnboarding!: boolean;

  static schema: Realm.ObjectSchema = {
    name: 'Settings',
    properties: {
      hasSeenOnboarding: { type: 'bool', default: false },
    },
  };
}

export { SettingsSchema };
