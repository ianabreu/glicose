import { GlycemicRangeSchema } from '@/database/schemas';

interface GlycemicRangeDTO
  extends Pick<
    GlycemicRangeSchema,
    'id' | 'description' | 'glucose_min' | 'glucose_normal' | 'glucose_max' | 'userId'
  > {}

type CreateGlycemicRangeDTO = Omit<GlycemicRangeDTO, 'id'>;

export { GlycemicRangeDTO, CreateGlycemicRangeDTO };
