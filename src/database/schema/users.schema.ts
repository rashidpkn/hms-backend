import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  documentSchemaOptions,
  UserRoles,
  UserStatus,
} from './columns.helpers';

@Schema(documentSchemaOptions)
export class User {
  @Prop({ type: Number, required: true, unique: true })
  id!: number;
  @Prop({ required: true })
  firstName!: string;
  @Prop({ required: true })
  lastName!: string;
  @Prop({ required: true, unique: true })
  email!: string;
  @Prop({ required: true })
  password!: string;
  @Prop({ type: Date })
  lastLogin?: Date;
  @Prop({ type: Date })
  passwordChangedAt?: Date;
  @Prop({
    type: String,
    enum: Object.values(UserStatus),
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;
  @Prop({
    type: String,
    enum: Object.values(UserRoles),
    default: UserRoles.PHARMACIST,
  })
  role!: UserRoles;
  @Prop({ type: Number, required: true })
  companyId!: number;
  @Prop({ type: String, default: null })
  refreshToken?: string | null;
  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('company', {
  ref: 'Company',
  localField: 'companyId',
  foreignField: 'id',
  justOne: true,
});
UserSchema.virtual('profile', {
  ref: 'Profile',
  localField: 'id',
  foreignField: 'userId',
  justOne: true,
});
