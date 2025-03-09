import Realm from 'realm';

class GlycemicRangeSchema extends Realm.Object<GlycemicRangeSchema> {
  id!: string;
  userId!: string;
  description!: string;
  glucose_min!: number;
  glucose_normal!: number;
  glucose_max!: number;

  static schema: Realm.ObjectSchema = {
    name: 'GlycemicRange',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      userId: 'string',
      description: 'string',
      glucose_min: 'double',
      glucose_normal: 'double',
      glucose_max: 'double',
    },
  };
}

export { GlycemicRangeSchema };
