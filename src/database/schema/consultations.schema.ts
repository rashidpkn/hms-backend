import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { documentSchemaOptions } from './columns.helpers';

@Schema(documentSchemaOptions)
export class Consultation {
  @Prop({ type: Number, required: true, unique: true })
  id!: number;
  @Prop({ type: Number, required: true })
  patientId!: number;
  @Prop({ type: Number, required: true })
  doctorId!: number;
  @Prop({ type: Number, required: true })
  companyId!: number;
  @Prop({ type: Number })
  appointmentId?: number;
  @Prop({ type: Number })
  prescriptionId?: number;
  @Prop({ type: Number })
  vitalId?: number;
  @Prop()
  chiefComplaint?: string;
  @Prop({ type: Number })
  painScore?: number;
  @Prop()
  examination?: string;
  @Prop()
  presentHistory?: string;
  @Prop()
  pastHistory?: string;
  @Prop()
  diagnosis?: string;
  @Prop({ type: [String] })
  treatment?: string[];
  @Prop({ type: [String] })
  labOrders?: string[];
  @Prop()
  notes?: string;
  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);
ConsultationSchema.index({ appointmentId: 1 }, { unique: true, sparse: true });
ConsultationSchema.index({ prescriptionId: 1 }, { unique: true, sparse: true });
ConsultationSchema.index({ vitalId: 1 }, { unique: true, sparse: true });
