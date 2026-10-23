import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AppointmentMedium,
  AppointmentStatus,
  AppointmentType,
  documentSchemaOptions,
} from './columns.helpers';

@Schema(documentSchemaOptions)
export class Appointment {
  @Prop({ type: Number, required: true, unique: true })
  id!: number;
  @Prop({ type: Number, required: true })
  patientId!: number;
  @Prop({ type: Number, required: true })
  doctorId!: number;
  @Prop({ type: Number, required: true })
  createdBy!: number;
  @Prop({ required: true })
  date!: string;
  @Prop({ required: true })
  time!: string;
  @Prop({
    type: String,
    enum: Object.values(AppointmentMedium),
    default: AppointmentMedium.OFFLINE,
  })
  medium!: AppointmentMedium;
  @Prop()
  note?: string;
  @Prop({
    type: String,
    enum: Object.values(AppointmentType),
    default: AppointmentType.GENERAL,
  })
  type!: AppointmentType;
  @Prop({
    type: String,
    enum: Object.values(AppointmentStatus),
    default: AppointmentStatus.PENDING,
  })
  status!: AppointmentStatus;
  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
