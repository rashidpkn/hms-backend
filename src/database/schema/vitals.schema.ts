import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { documentSchemaOptions } from './columns.helpers';

@Schema(documentSchemaOptions)
export class Vital {
  @Prop({ type: Number, required: true, unique: true })
  id!: number;
  @Prop({ type: Number, required: true })
  patientId!: number;
  @Prop({ type: String })
  height?: string;
  @Prop({ type: String })
  weight?: string;
  @Prop({ type: Number })
  temperature?: number;
  @Prop()
  temperature_unit?: string;
  @Prop({ type: Number })
  pulse?: number;
  @Prop({ type: Number })
  spo2?: number;
  @Prop({ type: Number })
  respiratory_rate?: number;
  @Prop()
  blood_pressure?: string;
  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;
}

export const VitalSchema = SchemaFactory.createForClass(Vital);
