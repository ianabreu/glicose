import Realm from 'realm';

class GlucoseSchema extends Realm.Object<GlucoseSchema> {
  id!: string;
  userId!: string;
  valueInMgDl!: number;
  date!: Date;
  notes?: string;
  glycemicRangeId!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Glucose',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      userId: 'string',
      glycemicRangeId: 'string',
      valueInMgDl: 'double',
      date: 'date',
      notes: { type: 'string', optional: true },
    },
  };
}

export { GlucoseSchema };
