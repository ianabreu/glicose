import { GlycemicRangeDTO } from './GlycemicRange';

import { GlucoseSchema } from '@/database/schemas';

interface GlucoseDTO
  extends Pick<
    GlucoseSchema,
    'id' | 'date' | 'notes' | 'userId' | 'valueInMgDl' | 'glycemicRangeId'
  > {}

type CreateGlucoseDTO = Omit<GlucoseDTO, 'id'>;

interface GlucoseWithGlycemicRangeDTO extends GlucoseDTO {
  glycemicRange: GlycemicRangeDTO | undefined;
}

export { GlucoseDTO, CreateGlucoseDTO, GlucoseWithGlycemicRangeDTO };
