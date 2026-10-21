import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { documentSchemaOptions, WorkingDays } from './columns.helpers';
import type { AddressType, WorkingDay } from './columns.helpers';

@Schema(documentSchemaOptions)
export class Profile {
  @Prop({ type: Number, required: true, unique: true })
  id!: number;
  @Prop({ type: Number, required: true, unique: true })
  userId!: number;
  @Prop({ type: Date })
  joinedAt?: Date;
  @Prop({ type: Date })
  endedAt?: Date;
  @Prop({ type: [String], enum: WorkingDays, default: [] })
  workingDays!: WorkingDay[];
  @Prop({ type: [Object], default: [] })
  leaveDates!: { date: string; reason?: string; approved?: boolean }[];
  @Prop()
  shiftStart?: string;
  @Prop()
  shiftEnd?: string;
  @Prop()
  phoneNumber?: string;
  @Prop({ type: Object })
  address?: AddressType;
  @Prop({ type: String, default: '0' })
  salary!: string;
  @Prop()
  profilePicture?: string;
  @Prop()
  signature?: string;
  @Prop()
  department?: string;
  @Prop()
  specialization?: string;
  @Prop()
  qualifications?: string;
  @Prop({ type: Number })
  yearsOfExperience?: number;
  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
