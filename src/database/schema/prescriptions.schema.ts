import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { documentSchemaOptions } from './columns.helpers';

export type PrescriptionItem = {
  name: string;
  dosage: string;
  frequency: string;
  foodRelation: string;
  duration: string;
};

@Schema(documentSchemaOptions)
export class Prescription {
  @Prop({ type: Number, required: true, unique: true })
  id!: number;
  @Prop({ type: Number, required: true })
  patientId!: number;
  @Prop({ type: [Object], required: true })
  items!: PrescriptionItem[];
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
