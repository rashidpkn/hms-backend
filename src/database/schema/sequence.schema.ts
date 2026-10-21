import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Sequence {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ type: Number, required: true, default: 0 })
  value!: number;
}

export const SequenceSchema = SchemaFactory.createForClass(Sequence);
