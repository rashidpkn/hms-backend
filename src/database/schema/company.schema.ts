import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CompanyStatus, documentSchemaOptions } from './columns.helpers';
import type { AddressType } from './columns.helpers';

@Schema(documentSchemaOptions)
export class Company {
  @Prop({ type: Number, required: true, unique: true })
  id!: number;
  @Prop({ required: true, unique: true })
  name!: string;
  @Prop({ required: true, unique: true })
  email!: string;
  @Prop({ required: true, unique: true })
  phoneNumber!: string;
  @Prop({ unique: true, sparse: true })
  email2?: string;
  @Prop({ unique: true, sparse: true })
  phoneNumber2?: string;
  @Prop({ type: Object })
  address?: AddressType;
  @Prop({ unique: true, sparse: true })
  licenseNumber?: string;
  @Prop({
    type: String,
    enum: Object.values(CompanyStatus),
    default: CompanyStatus.ACTIVE,
  })
  status!: CompanyStatus;
  @Prop({ type: String, default: '0' })
  yearlySubscriptionAmount!: string;
  @Prop({
    type: Date,
    default: () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      return date;
    },
  })
  expiredAt!: Date;
  @Prop()
  logo?: string;
  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
