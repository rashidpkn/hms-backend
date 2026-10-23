import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  BloodGroup,
  documentSchemaOptions,
  Gender,
  PatientStatus,
} from './columns.helpers';
import type { AddressType, AllergySeverity } from './columns.helpers';

@Schema(documentSchemaOptions)
export class Patient {
  @Prop({ type: Number, required: true, unique: true })
  id!: number;
  @Prop({ required: true })
  firstName!: string;
  @Prop({ required: true })
  lastName!: string;
  @Prop({ type: Number, required: true })
  patientCode!: number;
  @Prop()
  email?: string;
  @Prop()
  phoneNumber?: string;
  @Prop({ type: Object })
  address?: AddressType;
  @Prop({ type: Number })
  primaryDoctorId?: number;
  @Prop({ type: Date })
  dateOfBirth?: Date;
  @Prop({ type: String, enum: Object.values(Gender), default: Gender.UNKNOWN })
  gender!: Gender;
  @Prop({ type: String, enum: Object.values(BloodGroup) })
  bloodGroup?: BloodGroup;
  @Prop({ type: [Object] })
  allergies?: {
    allergen: string;
    reaction: string;
    severity: AllergySeverity;
  }[];
  @Prop({ type: Object })
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  @Prop({ type: Object })
  insuranceDetails?: {
    providerName: string;
    policyNumber: string;
    coverageDetails?: string;
  };
  @Prop()
  notes?: string;
  @Prop({
    type: String,
    enum: Object.values(PatientStatus),
    default: PatientStatus.ACTIVE,
  })
  status!: PatientStatus;
  @Prop({ type: Number, required: true })
  createdBy!: number;
  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
PatientSchema.index({ patientCode: 1 }, { unique: true });
