import { GlucoseSchema } from '@/database/schemas';

interface GlucoseDTO
  extends Pick<
    GlucoseSchema,
    'id' | 'date' | 'notes' | 'userId' | 'valueInMgDl' | 'glycemicRangeId'
  > {}

type CreateGlucoseDTO = Omit<GlucoseDTO, 'id'>;

export { GlucoseDTO, CreateGlucoseDTO };
